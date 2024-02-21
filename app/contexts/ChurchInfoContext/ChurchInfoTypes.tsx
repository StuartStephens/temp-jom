import {
  FormField,
  VALIDATION_TYPES,
} from "../utilities/FormSupport/FormSupportTypes";

export interface IChurchService {
  Id?: string; //(string, optional),
  Address?: string; // (LWCRM.Services.Data.Address, optional),
  Description?: string; // (string, optional),
  Location?: string; // (string, optional)
}

export interface IChurchService {
  //LWCRM.Services.Models.V1.ChurchServiceParms
  ServiceId?: string; // (string, optional): OPTIONAL: the associated serivce id if updating an existing service
  ChurchId?: string; // (string, optional): the associated church id ,
  Location?: string; // (string, optional): the location of the service ,
  Time?: string; // (string, optional): the times of the service ,
  Description?: string; // (string, optional),
}

export enum FORM_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
}

export const ADD_EDIT_CHURCH_SERVICE_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "Description",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Service Description is Required",
        },
      ],
    },
  ],
  [
    "Day",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Church Website is Required",
        // },
      ],
    },
  ],
  [
    "Hour",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.EMAIL_ADDRESS,
        //   message: "A valid Email Address is Required",
        // },
      ],
    },
  ],
  [
    "Minute",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.PHONE_NUMBER,
        //   message: "A valid Phone Number is Required",
        // },
      ],
    },
  ],
  [
    "ChurchId",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Pastor Name(s) is a required field",
        // },
      ],
    },
  ],
  [
    "ServiceId",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Pastor Name(s) is a required field",
        // },
      ],
    },
  ],
]);
