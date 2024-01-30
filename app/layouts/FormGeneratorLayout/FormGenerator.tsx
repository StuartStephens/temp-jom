import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import { ICallbacks } from "../../utilities/FormSupport/FSReducers";
import { FormErrors } from "../../contexts/utilities/FormSupport/FormErrors";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { FormField } from "../../contexts/utilities/FormSupport/FormSupportTypes";
import { FormGeneratorField } from "./FormGeneratorField";
// import { IFSFormConfiguration } from "../../utilities/FormSupport/FSBehaviors";
import { CONTACT__EMAIL_ADDRESS_FIELDS } from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import { useAuth } from "../../contexts/Auth/Context";
import { IEmailAddress } from "../../contexts/Auth/EmailAddressTypes";
import { useEffect } from "react";

export interface IPostProps {
  // endpoint?: string | undefined;
  payload?: any;
  // callbacks?: ICallbacks;
}

export interface IFormGeneratorProps { }

export function FormGenerator(props: IFormGeneratorProps) {
  const { checkIsLoggedIn, contactInfo, login, fetchAPI } = useAuth();
  const {
    state,
    form,
    resetForm,
    handleSubmit,
    initForm,
    dispatch,
    initializeContext,
  } = useFormSupportContext();
  // const formConfigProvider = (): IFSFormConfiguration => {
  //   let conf: IFSFormConfiguration = {
  //     formFields: CONTACT__EMAIL_ADDRESS_FIELDS,
  //     postFormEndpoint: "Contact/EmailAddress",
  //   };
  //   return conf;
  // };
  const formSubmitProvider = () => {
    const transformedData: any = { Email: form.Email };
    return fetchAPI("Contact/EmailAddress", transformedData, "POST");
  };
  const formSubmitSuccessProvider = (data: IEmailAddress) => {
    const newForm = {
      Email: data?.Email,
    };
    initForm(newForm);
  };
  const dataSourceProvider = () =>
    fetchAPI("Contact/EmailAddresses", null, "GET");

  const dataSourceReducer = (data: IEmailAddress[]) => {
    return data && data.length > 0 ? data.at(0) : undefined;
  };
  const defaultForm = {
    Id: contactInfo?.Id,
    Email: "",
    IsPrimary: false,
    DoNotEmail: false,
  } as IEmailAddress;

  useEffect(() => {
    initializeContext(
      defaultForm,
      {
        formFields: CONTACT__EMAIL_ADDRESS_FIELDS,
        postFormEndpoint: "Contact/EmailAddress",
      },
      undefined,
      undefined
    );
    // eslint-disable-next-line
  }, []);

  function makeRows(): any[] {
    if (!(state && state.formConfiguration)) {
      return [];
    }
    const { formConfiguration: config } = state;
    let count = 0;
    let numCols = 0;
    let max = 0;
    let rowCount = 0;
    let prevCount = 0;
    let rows: any[] = [];
    // let lastField: FormField;

    config &&
      config.formFields &&
      config.formFields.forEach((value: FormField, key, map) => {
        if (value && value.md) {
          prevCount = Math.floor(numCols / 12);
          numCols += value.md;
          rowCount = Math.floor((numCols - 1) / 12);
          if (rowCount > prevCount) {
            numCols = 12 & rowCount;
          }
          rows[rowCount] = !rows[rowCount]
            ? [JSON.parse(JSON.stringify(value))]
            : [...rows[rowCount], JSON.parse(JSON.stringify(value))];
        } else {
          //
        }
      });
    return rows;
  }

  return (
    <Container fluid className="full-width d-flex flex-column gap-5">
      <Form>
        {/* {JSON.stringify(form)} */}
        {makeRows().map(
          (value: FormField[], index: number, arr: [string, FormField][]) => {
            return (
              <Row key={`RR_${index}`}>
                {/* {JSON.stringify(value)} */}
                {value &&
                  value.map((field: FormField) => {
                    return (
                      <FormGeneratorField
                        // ref={()=>{}}
                        key={`CC_${field?.name}`}
                        settings={field}
                      />
                      // <div>hll</div>
                    );
                  })}
              </Row>
            );
          }
        )}
        <Row>
          <Col className="col-12 ">
            <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-start">
              <Button
                variant="outline-primary"
                onClick={() => {
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleSubmit(formSubmitProvider, formSubmitSuccessProvider);
                }}
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <FormErrors />
    </Container>
  );
}

