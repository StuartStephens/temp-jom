import { IFormSubmissionProps } from "../../../layouts/FormGeneratorLayout";
import { IFSFormConfiguration } from "./FSBehaviors";
import { deepCopy } from "./FSUtils";
import { FieldReference } from "./FormSupportContext";

// const { getCountryDetails } = useMetaDataAPI();

export enum POST_FORM_ACTIONS {
    POST_FORM = "VALIDATION_ACTIONS_POST_FORM",
    VALIDATE_REMOTE_AND_POST_FORM = "VALIDATION_ACTIONS_VALIDATE_REMOTE_AND_POST_FORM",
    POST_FORM_SUCCESS = "VALIDATION_ACTIONS_POST_FORM_SUCCESS",
    POST_FORM_FAILURE = "VALIDATION_ACTIONS_POST_FORM_FAILURE",
    SET_FORM_SUBMISSION_PROPS_STATE = "POST_FORM_ACTIONS_SET_FORM_SUBMISSION_PROPS_STATE",
}
export enum FORM_STATE_ACTIONS {
    IS_LOADING = "FORM_STATE_IS_LOADING",
}
export enum FORM_CONFIG_ACTIONS {
    SET_STATE = "FORM_CONFIG_ACTIONS_SET_STATE",
}
export enum FORM_ACTIONS {
    UPDATE_PROPERTY = "FORM_UPDATE_PROPERTY",
    ADD_PROPERTY = "FORM_ADD_PROPERTY",
    REMOVE_PROPERTY = "FORM_REMOVE_PROPERTY",
    RESET_STATE = "FORM_RESET_STATE",
    SET_STATE = "FORM_SET_STATE",
}
export enum ERROR_ACTIONS {
    UPDATE_PROPERTY = "ERROR_UPDATE_PROPERTY",
    ADD_PROPERTY = "ERROR_ADD_PROPERTY",
    REMOVE_PROPERTY = "ERROR_REMOVE_PROPERTY",
    RESET_STATE = "ERROR_RESET_STATE",
    SET_STATE = "ERROR_SET_STATE",
    SET_REMOTE_ERROR_MESSAGE = "SET_REMOTE_ERROR_MESSAGE",
}

export enum ORIGINAL_DATA_ACTIONS {
    UPDATE_PROPERTY = "ORIGINAL_DATA_UPDATE_PROPERTY",
    ADD_PROPERTY = "ORIGINAL_DATA_ADD_PROPERTY",
    REMOVE_PROPERTY = "ORIGINAL_DATA_REMOVE_PROPERTY",
    RESET_STATE = "ORIGINAL_DATA_RESET_STATE",
    SET_STATE = "ORIGINAL_DATA_SET_STATE",
}

export enum FIELD_REF_ACTIONS {
    SET_STATE = "FIELD_REF_SET_STATE",
    ADD_PROPERTY = "FIELD_REF_ADD_PROPERTY",
}

export interface ICallbacks {
    successCallback?: (data: any) => void;
    failureCallback?: (data: any) => void;
}

export type IPostFormActions = {
    type: POST_FORM_ACTIONS;
    // fieldName?: string;
    formSubmissionProps?: IFormSubmissionProps;
};

export type IFormConfigActions = {
    type: FORM_CONFIG_ACTIONS;
    payload: any;
};
export type IFormStateAction = {
    type: FORM_STATE_ACTIONS;
    fieldName?: string;
    payload: any;
};

export type IFormAction = {
    type: FORM_ACTIONS;
    fieldName?: string;
    payload: any;
};
export type IErrorAction = {
    type: ERROR_ACTIONS;
    fieldName?: string;
    payload: any;
};

export type IOriginalDataAction = {
    type: ORIGINAL_DATA_ACTIONS;
    fieldName?: string;
    payload: any;
};
export type IFieldRefAction = {
    type: FIELD_REF_ACTIONS;
    fieldName?: string;
    payload: any;
};
export enum REFERENCE_TYPES {
    COUNTRIES = "Countries",
}

export interface IFormContextState {
    isLoading: boolean;
    form: any;
    errors: any;
    remoteErrorMessage: string | undefined;
    originalData: any;
    fieldRefs: FieldReference[];
    formSubmissionProps?: IFormSubmissionProps;
    formConfiguration: IFSFormConfiguration;
}

export const formContextStateReducer = (
    state: IFormContextState,
    action:
        | IFormAction
        | IErrorAction
        | IOriginalDataAction
        | IFieldRefAction
        | IFormStateAction
        | IPostFormActions
        | IFormConfigActions
) => {
    function createStateIfNeeded() {
        if (!state) {
            state = {
                isLoading: false,
                form: {},
                errors: {},
                remoteErrorMessage: undefined,
                originalData: {},
                fieldRefs: [],
                formSubmissionProps: {},
                formConfiguration: {
                    formFields: new Map(),
                    // postFormEndpoint: undefined;
                },
            };
        }
        if (!state.form) {
            state.form = {};
        }
        if (!state.errors) {
            state.errors = {};
        }
        if (!state.originalData) {
            state.originalData = {};
        }
        if (!state.fieldRefs) {
            state.fieldRefs = [];
        }
        if (!state.formConfiguration) {
            state.formConfiguration = {
                formFields: new Map(),
                // validateFormEndpoint: undefined,
            };
        }
    }
    createStateIfNeeded();
    let usageErrors = [];
    switch (action.type) {
        case ERROR_ACTIONS.SET_REMOTE_ERROR_MESSAGE:
            return { ...state, remoteErrorMessage: action.payload };
        case FORM_CONFIG_ACTIONS.SET_STATE:
            return { ...state, formConfiguration: action.payload };
        case FORM_STATE_ACTIONS.IS_LOADING:
            return { ...state, isLoading: action.payload };
        case POST_FORM_ACTIONS.SET_FORM_SUBMISSION_PROPS_STATE:
            return { ...state, formSubmissionProps: action.formSubmissionProps };
        case POST_FORM_ACTIONS.POST_FORM_SUCCESS:
            return { ...state, isLoading: false };
        case POST_FORM_ACTIONS.POST_FORM_FAILURE:
            return { ...state, isLoading: false };
        case POST_FORM_ACTIONS.VALIDATE_REMOTE_AND_POST_FORM:
            return state;
        case FORM_ACTIONS.SET_STATE:
            return { ...state, form: action.payload };
        case FORM_ACTIONS.RESET_STATE:
            return { ...state, errors: JSON.parse(JSON.stringify(action.payload)) };
        case FORM_ACTIONS.UPDATE_PROPERTY:
            if (action.fieldName) {
                let newValue = deepCopy(state.form);
                newValue[action.fieldName] = action.payload;
                return { ...state, form: newValue };
            } else {
                usageErrors.push("fieldName is required - for ", action.type);
            }

            break;
        case ERROR_ACTIONS.SET_STATE:
            return { ...state, errors: action.payload };

        case ERROR_ACTIONS.RESET_STATE:
            return { ...state, errors: JSON.parse(JSON.stringify(action.payload)) };
        case ERROR_ACTIONS.UPDATE_PROPERTY:
            if (action.fieldName) {
                let newValue = deepCopy(state.errors);
                newValue[action.fieldName] = action.payload;
                return { ...state, errors: newValue };
            } else {
                usageErrors.push("fieldName is required - for ", action.type);
            }
            break;

        case ORIGINAL_DATA_ACTIONS.SET_STATE:
            return { ...state, originalData: action.payload };

        case FIELD_REF_ACTIONS.SET_STATE:
            return { ...state, fieldRefs: action.payload };
        case FIELD_REF_ACTIONS.ADD_PROPERTY:
            if (action.fieldName) {
                try {
                    action.payload = action?.payload?.current
                        ? action.payload.current
                        : action.payload;
                    // let newValue: FieldReference[] = deepCopy(state.fieldRefs);
                    let repl: FieldReference[] =
                        state?.fieldRefs?.length > 0
                            ? state.fieldRefs.reduce(
                                (accum: FieldReference[], currVal: FieldReference) => {
                                    if (currVal.name === action.fieldName) {
                                        const replace: FieldReference = {
                                            name: action.fieldName,
                                            value: action.payload,
                                        };
                                        accum.push(replace);
                                    } else {
                                        const replace: FieldReference = {
                                            name: action.fieldName,
                                            value: action.payload,
                                        };
                                        accum.push(replace);
                                    }
                                    return accum;
                                },
                                []
                            )
                            : [{ name: action.fieldName, value: action.payload }];
                    const merge = { fieldRefs: repl };
                    return { ...state, fieldRefs: repl };
                } catch (e) {
                    console.error("error failed to add ", action.fieldName, e);
                }
            } else {
                usageErrors.push("fieldName is required - for ", action.type);
            }

            break;

        default:
            //do nothing
            usageErrors.push("INVALID ACTION TYPE ", action.type);
            break;
    }

    if (usageErrors.length > 0) {
        console.error("FORM SUPPORT CONTEXT USAGE ERROR", action.type, action, [
            ...usageErrors,
        ]);
    }
    return state;
};

