"use client";
import {
  ChangeEvent,
  FocusEvent,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { Container } from "react-bootstrap";
import { IAddressForm } from "../../../components/AddressForm";
import { IChangePasswordForm } from "../../../components/ChangePassword";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ISelectOption } from "../../../layouts/FormGeneratorLayout/FormGeneratorSelect";
import { useAccountInfoContext } from "../../AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../Auth/Context";
import { ICountryDetail } from "../../Common/CommonTypes";
import {
  DSProvider,
  DSReducer,
  FormSubmitProvider,
  FormSubmitSuccessProvider,
  IFSFormConfiguration,
} from "./FSBehaviors";
import {
  ERROR_ACTIONS,
  FORM_ACTIONS,
  FORM_CONFIG_ACTIONS,
  FORM_STATE_ACTIONS,
  IFormContextState,
  ORIGINAL_DATA_ACTIONS,
  REFERENCE_TYPES,
  formContextStateReducer,
} from "./FSReducers";
import { deepCopy } from "./FSUtils";
import {
  FormError,
  FormField,
  VALIDATION_TYPES,
  ValidationProp,
} from "./FormSupportTypes";
import { formatYear } from "../FormatUtils";

export interface IErrorResponse {
  Message?: string;
  ExceptionMessage?: string;
  ExceptionType?: string;
  StackTrace?: any;
}

export interface FieldReference {
  name?: string;
  value?: any;
}

export interface IFSContextInitializer {
  // children: ReactNode;
  defaultForm: any;
  formConfiguration: IFSFormConfiguration;
  dataSourceProvider?: DSProvider;
  dataSourceReducer?: DSReducer;
}

interface FormSupportContextData {
  errors: any;
  form: any;
  originalData: any;
  state: IFormContextState;
  dispatch: Function;
  // config: FormConfiguration | undefined;
  initializeContext: (
    defaultForm: any,
    formConfiguration: IFSFormConfiguration,
    dataSourceProvider?: DSProvider,
    dataSourceReducer?: DSReducer
  ) => void;

  handleSubmit: (
    submitProvider: FormSubmitProvider,
    successProvider: FormSubmitSuccessProvider
  ) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, form?: any) => void;
  handleInputBlur: (e: FocusEvent<HTMLInputElement>, form?: any) => void;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>, form?: any) => void;
  handleSelectBlur: (e: FocusEvent<HTMLSelectElement>, form?: any) => void;
  validateLocally: () => boolean;
  resetForm: () => void;

  initForm: (newData: any) => void;
  executeCommand: (
    commandName: string,
    settings?: FormField,
    callbackFunction?: Function
  ) => void;

  getReferenceValues: (type: REFERENCE_TYPES) => ISelectOption[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const FormSupportContext = createContext<FormSupportContextData>(
  {} as FormSupportContextData
);

interface FormSupportProviderProps {
  children: ReactNode;

  // config?: FormConfiguration;
  // defaultForm?: any;
}

export function FormSupportProvider({
  children,
}: // defaultForm,
FormSupportProviderProps) {
  const { countries } = useAccountInfoContext();
  const { fetchAPI } = useAuth();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [state, dispatch] = useReducer(formContextStateReducer, {
    form: {},
    errors: {},
    remoteErrorMessage: undefined,
    isLoading: false,
    originalData: {},
    fieldRefs: [],
    formSubmissionProps: {},
    formConfiguration: {
      formFields: new Map(),
      validateFormEndpoint: undefined,
    },
  } as IFormContextState);
  const {
    errors,
    form,
    originalData,
    fieldRefs,
    isLoading,
    formConfiguration: config,
  } = state;

  function getReferenceValues(type: REFERENCE_TYPES): ISelectOption[] {
    switch (type) {
      case REFERENCE_TYPES.COUNTRIES:
        const ret: ISelectOption[] = countries.reduce(
          (a: ISelectOption[], c: ICountryDetail) => {
            a.push({ name: c.Name, value: c.Iso3Code });
            return a;
          },
          []
        );
        return ret;
        break;
      default:
      //do nothing
    }
    return [];
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, form?: any) => {
    const newValue: any =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setField(e.currentTarget.name, newValue);
    const fieldError: FormError | undefined = getFieldError(
      e.currentTarget.name,
      newValue
    );
    if (fieldError) {
      addError(fieldError);
    }
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>, form?: any) => {
    setField(e.currentTarget.name, e.target.value);

    const fieldError: FormError | undefined = getFieldError(
      e.currentTarget.name,
      e.currentTarget.value
    );
    if (fieldError) {
      addError(fieldError);
    }
  };

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>, form?: any) {
    setField(e.target.name, e.target.value);
  }

  function handleSelectBlur(e: FocusEvent<HTMLSelectElement>, form?: any) {
    setField(e.currentTarget.name, e.target.value);
  }

  function replaceOrInsertFormError(formError: FormError) {
    dispatch({
      type: ERROR_ACTIONS.UPDATE_PROPERTY,
      fieldName: formError.name,
      payload: formError,
    });
  }

  function replaceOrInsertFormValue(fieldName: string, value: string) {
    dispatch({
      type: FORM_ACTIONS.UPDATE_PROPERTY,
      fieldName: fieldName,
      payload: value,
    });
  }

  const validateLocally = (): boolean => {
    let localErrors: any = {};
    let hasErrors: boolean = false;

    const formCopy: any = deepCopy(state.form);

    formCopy &&
      Object.entries(formCopy).forEach(([name, value]: [string, any]) => {
        const fieldError: FormError | undefined = getFieldError(name, value);
        if (fieldError) {
          if (fieldError.message && fieldError.message.length > 0) {
            localErrors[fieldError.name] = fieldError;
            hasErrors = true;
          } else {
            delete localErrors[fieldError.name];
          }
        }
      });

    if (hasErrors) {
      dispatch({
        type: ERROR_ACTIONS.SET_STATE,
        payload: localErrors,
      });
    } else {
      dispatch({ type: ERROR_ACTIONS.SET_STATE, payload: {} });
    }

    return !hasErrors;
  };

  const resetForm = () => {
    dispatch({
      type: FORM_ACTIONS.SET_STATE,
      payload: JSON.parse(JSON.stringify(state.originalData)),
    });
    dispatch({ type: ERROR_ACTIONS.SET_STATE, payload: {} });
  };

  const initForm = (newData: any) => {
    dispatch({ type: ORIGINAL_DATA_ACTIONS.SET_STATE, payload: newData });
    dispatch({ type: FORM_ACTIONS.SET_STATE, payload: newData });
  };

  //   INTERNAL FUNCTIONS

  function addError(newError: FormError) {
    if (newError) {
      replaceOrInsertFormError(newError);
    }
  }

  function setField(fieldName: string, value: string) {
    replaceOrInsertFormValue(fieldName, value);
  }

  function getValidationPropsByFormFieldName(
    formFieldName: string
  ): ValidationProp[] {
    return (
      (config &&
        config.formFields &&
        config.formFields.get(formFieldName)?.validationProps) ||
      []
    );
  }

  function getFieldError(
    fieldName: string,
    value: string
  ): FormError | undefined {
    const validationProps: ValidationProp[] =
      getValidationPropsByFormFieldName(fieldName);
    let newError: FormError = { name: fieldName };
    validationProps &&
      validationProps.map((prop: ValidationProp) => {
        switch (prop.validationType) {
          case VALIDATION_TYPES.REQUIRED:
            if (!value || value === "") {
              newError = {
                name: fieldName,
                message: prop.message,
              };
            }
            break;
          case VALIDATION_TYPES.ADDRESS_FIRST_NAME:
            const addressForm_fn = state.form as IAddressForm;
            if (
              (!value || value === "") &&
              !addressForm_fn.isPrimary &&
              !addressForm_fn.isDefaultBilling &&
              !addressForm_fn.isDefaultShipping
            ) {
              newError = {
                name: fieldName,
                message: prop.message,

                // [fieldName]: prop.message || "Field is Required",
              };
            }
            break;
          case VALIDATION_TYPES.ADDRESS_LAST_NAME:
            const addressForm_ln = state.form as IAddressForm;
            if (
              (!value || value === "") &&
              !addressForm_ln.isPrimary &&
              !addressForm_ln.isDefaultBilling &&
              !addressForm_ln.isDefaultShipping
            ) {
              newError = {
                name: fieldName,
                message: prop.message,

                // [fieldName]: prop.message || "Field is Required",
              };
            }
            break;
          case VALIDATION_TYPES.MAX_LENGTH:
            if (
              value &&
              prop.validationParams &&
              value.length > parseInt(prop.validationParams)
            ) {
              newError = {
                name: fieldName,
                message: prop.message,
                // [fieldName]: prop.message || "Field is Required",
              };
            }
            break;

          case VALIDATION_TYPES.BANK_ROUTING_NUMBER:
            //NO RULES YET- CHECKED ON BACKEND
            break;
          case VALIDATION_TYPES.BANK_ACCT_NUMBER:
            //NO RULES YET- CHECKED ON BACKEND
            break;

          case VALIDATION_TYPES.CREDIT_CARD_NUMBER:
            //NO RULES YET- CHECKED ON BACKEND
            break;
          case VALIDATION_TYPES.CREDIT_CARD_SEC_CODE:
            if (value && value.length !== 3) {
              newError = {
                name: fieldName,
                message: prop.message,
                // [fieldName]: prop.message || "Field is Required",
              };
            }
            //NO RULES YET- CHECKED ON BACKEND
            break;
          case VALIDATION_TYPES.PW_CONFIRM:
            //TODO check that PW matches
            const pwForm = state.form as IChangePasswordForm;
            if (value !== pwForm.newPassword) {
              newError = {
                name: fieldName,
                message: prop.message,
                // [fieldName]: prop.message || "Field is Required",
              };
            }
            break;
          case VALIDATION_TYPES.ACO_DONATION_OTHER_AMOUNT:
            const parsedValue: number = parseInt(state.form.otherAmount);
            if (
              (!value || value === "" || isNaN(parsedValue)) &&
              state.form.donationAmount === "OTHER"
            ) {
              newError = {
                name: fieldName,
                message: prop.message,
              };
            }
            break;
          case VALIDATION_TYPES.PW_STRENGTH:
            let strength: number = 1;
            let cargo: any = {
              strength: 1,
              dangerMin: 1,
              warningMin: 3,
              strongMin: 4,
              longEnough: false,
              hasLowerAndUppercaseLetters: false,
              hasNumbersAndCharacters: false,
              hasOneSpecialCharacter: false,
              hasTwoSpecialCharacters: false,
            };

            if (value.length < 8) {
              cargo.longEnough = false;
            }

            if (value.length > 7) {
              strength += 1;
              cargo.longEnough = true;
            }
            // If password contains both lower and uppercase characters, increase strength value.
            if (value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
              strength += 1;
              cargo.hasLowerAndUppercaseLetters = true;
            }

            // If it has numbers and characters, increase strength value.
            if (value.match(/([a-zA-Z])/) && value.match(/([0-9])/)) {
              strength += 1;
              cargo.hasNumbersAndCharacters = true;
            }

            // If it has one special character, increase strength value.
            if (value.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
              strength += 1;
              cargo.hasOneSpecialCharacter = true;
            }
            // If it has two special characters, increase strength value.
            if (
              value.match(
                /(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/
              )
            ) {
              strength += 1;
              cargo.hasTwoSpecialCharacters = true;
            }

            cargo.strength = strength;
            if (strength <= 5) {
              newError = {
                name: fieldName,
                message: prop.message,
                cargo: cargo,
                // [fieldName]: prop.message || "Field is Required",
              };
            }

            break;
          case VALIDATION_TYPES.EMAIL_ADDRESS:
            function isValidEmailAddress(value: string): boolean {
              return true;
            }
            if (!value || value === "" || !isValidEmailAddress(value)) {
              newError = {
                name: fieldName,
                message: prop.message,
              };
            }
            break;
          case VALIDATION_TYPES.PHONE_NUMBER:
            function isValidPhoneNumber(value: string): boolean {
              // var re = new RegExp(
              //   `1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?`
              // );
              //var re = /^\(?(\d{1})[- ]?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
              var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
              //var re = \d{3}-\d{3}-\d{4};
              return re.test(value);
            }
            if (!isValidPhoneNumber(value)) {
              newError = {
                name: fieldName,
                message: prop.message,
              };
            }
            break;
          case VALIDATION_TYPES.VALID_YEAR:
            function isValidYear(value: string): boolean {
              if (!value || value.trim() == "") return true; //if nothing provided, then do not validated
              return !!value && "Invalid Date" !== formatYear(value);
            }
            if (value.length !== 4 || !isValidYear(value)) {
              newError = {
                name: fieldName,
                message: prop.message,
              };
            }

            break;

          default:
        }
        return null;
      });

    return newError;
  }

  // function doPost(props: IPostProps) {
  //   let returnData: any;
  //   if (props && props.endpoint) {
  //     async function postIt() {
  //       if (props && props.endpoint) {
  //         try {
  //           await fetchAPI(props.endpoint, props.payload, "POST")
  //             .then((response) => response.json())
  //             .then((response) => {
  //               if (!response) {
  //                 props?.callbacks?.failureCallback &&
  //                   props.callbacks.failureCallback({ ...response });
  //               } else {
  //                 props?.callbacks?.successCallback &&
  //                   props.callbacks?.successCallback({ ...response });
  //               }
  //             });
  //         } catch (error) {
  //           console.error("ERROR POSTING", props.endpoint, error);
  //         } finally {
  //           //console.error("anyhting");
  //           //DO nothing
  //         }
  //       }
  //     }
  //     postIt();
  //   } else if (props.callbacks) {
  //     props?.callbacks?.successCallback &&
  //       props.callbacks?.successCallback({ ...props.payload });
  //   }
  // }

  // function doRemoteValidation(props: IPostProps) {
  //   doPost(props);
  // }

  // async function doThePost(endPoint: string, data: any) {
  //   // const dataSource = fetchAPI(endPoint, data, "POST")
  //   if (endPoint) {
  //     async function postIt() {
  //       if (endPoint) {
  //         try {
  //           const response = await fetchAPI(endPoint, data, "POST");
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //           }
  //           const returnedData = await response.json();
  //           if (returnedData) {
  //             onAfterSubmitSuccess(returnedData);
  //           }
  //         } catch (error) {
  //           console.error(
  //             "There was a problem with your fetch operation: ",
  //             error
  //           );
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       }
  //     }
  //     postIt();
  //   } else {
  //     console.error("NO END POINT PROVIDED when posting form", endPoint, data);
  //   }
  // }

  async function handlePost(
    formSubmitProvider: FormSubmitProvider,
    formSubmitSuccessProvider: FormSubmitSuccessProvider
  ) {
    if (formSubmitProvider) {
      setIsLoading(true);
      try {
        const response: Response = await formSubmitProvider();

        if (!response.ok) {
          const errorData = await response.json();
          console.debug("Error from formSubmitProvider:", errorData);
          throw new Error(
            "formSubmitProvider ERROR--",
            errorData.ExceptionMessage ||
              `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        if (formSubmitSuccessProvider) {
          formSubmitSuccessProvider(data);
        }
      } catch (e) {
        let result = "";
        if (typeof e === "string") {
          result = e.toUpperCase(); // works, `e` narrowed to string
        } else if (e instanceof Error) {
          result = e.message; // works, `e` narrowed to Error
        }
        dispatch({
          type: ERROR_ACTIONS.SET_REMOTE_ERROR_MESSAGE,
          payload: result,
        });
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  function handleSubmit(
    submitProvider: FormSubmitProvider,
    successProvider: FormSubmitSuccessProvider
  ) {
    if (!validateLocally()) {
      return;
    }
    handlePost(submitProvider, successProvider);

    // if (true) {
    //   setIsLoading(true);
    //   const endPoint: string | undefined = (config as IFSFormConfiguration)
    //     ?.postFormEndpoint;
    //   if (endPoint) {
    //     const transformedData: any = { Email: form.Email }; ///TODO: check for provider to convert the form to a valid post body format
    //     //doThePost(endPoint, form);
    //   } else {
    //     console.error("NO ENDPOINT PROVIDED");
    //   }
    // }
  }

  // function onAfterSubmitSuccess(data: any) {
  //   //TODO : update the UI with the data returned
  //   if (data) {
  //     alert("got back " + JSON.stringify(data));
  //   }
  // }

  // function validateForm(
  //   successCallback?: Function,
  //   failureCallback?: Function
  // ) {
  //   if (!validateLocally()) {
  //     return;
  //   }
  //   //alert("use handleSubmit instead");
  //   // setIsLoading(true);
  //   //SIMULATE REMOTE REPSONSE
  //   // setTimeout(() => {
  //   const errResponse: APIResponse = {
  //     hasErrors: false,
  //   };

  //   if (errResponse && !!errResponse.hasErrors && !!errResponse.errors) {
  //     dispatch({
  //       type: ERROR_ACTIONS.SET_STATE,
  //       payload: errResponse.errors,
  //     });
  //     setIsLoading(false);
  //     return failureCallback && failureCallback.apply(null);
  //   } else {
  //     setIsLoading(false);
  //     return successCallback && successCallback.apply(null);
  //   }
  //   // }, 3000);
  // }

  function setIsLoading(isLoading: boolean) {
    dispatch({ type: FORM_STATE_ACTIONS.IS_LOADING, payload: isLoading });
  }

  async function getDSAndConvertToForm(
    dataSourceProvider: DSProvider,
    dataSourceReducer?: DSReducer
  ) {
    if (dataSourceProvider) {
      try {
        const dspResponse: Response = await dataSourceProvider();

        if (!dspResponse.ok) {
          throw new Error(`HTTP error! status: ${dspResponse.status}`);
        }

        const data = await dspResponse.json();
        //setDataSourceData(data);
        if (!!dataSourceReducer) {
          const newForm: any = dataSourceReducer(data);
          initForm(newForm);
        } else {
          initForm(data);
        }
        setIsInitialized(true);
      } catch (e) {
        console.error(
          "error getting datasource.  please check your dataSourceProvider",
          e
        );
      } finally {
      }
    }
  }
  const initializeContext = (
    defaultForm: any,
    formConfig: IFSFormConfiguration,
    dataSourceProvider?: DSProvider,
    dataSourceReducer?: DSReducer
  ) => {
    if (!!isInitialized) {
      return;
    }
    // const formConfig: form;
    dispatch({ type: FORM_CONFIG_ACTIONS.SET_STATE, payload: formConfig });
    if (!!dataSourceProvider) {
      getDSAndConvertToForm(dataSourceProvider, dataSourceReducer);
    } else {
      initForm(defaultForm);
    }
    setIsInitialized(true);
  };

  function executeCommand(
    commandName: string,
    settings?: FormField,
    callbackFunction?: Function
  ) {
    return;
    const cmd = eval("commands['" + commandName + "']");
    if (cmd && cmd.func) {
      cmd.func.apply(null, [commandName, settings, callbackFunction]);
    }
  }

  return (
    <FormSupportContext.Provider
      value={{
        initializeContext,
        state,
        dispatch,
        errors,
        form,
        originalData,
        isLoading,
        setIsLoading,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleSelectBlur,
        validateLocally,
        resetForm,
        initForm,
        executeCommand,
        getReferenceValues,
        handleSubmit,
      }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container fluid className="full-width">
          <Container fluid className="full-width">
            {!isInitialized && (
              <div>
                {/* <h2 className="text-warning">
                  NOT SEEING YOUR FORM? You must call initializeContext for
                  FormSupport
                </h2> */}
              </div>
            )}

            {/* {JSON.stringify(form)} */}
            {children}
          </Container>
        </Container>
      )}
    </FormSupportContext.Provider>
  );
}

export function useFormSupportContext(): FormSupportContextData {
  const context = useContext(FormSupportContext);

  if (!context) {
    throw new Error(
      "useFormSupportContext must be used within an FormSupportContextProvider"
    );
  }
  return context;
}
