import { REFERENCE_TYPES } from "./FSReducers";

export type FormField = {
  validationProps?: ValidationProp[];
  name?: string;
  type?: string; //enum "text", "select", etc.
  initCommandName?: string;
  initSelectOptionsCommandName?: string;
  selectOptionsReferenceType?: REFERENCE_TYPES;
  onInputChangedCommand?: string;
  onSelectChangedCommand?: string;
  onInputBlurredCommand?: string;
  onSelectBlurredCommand?: string;
  defaultValue?: any;
  label?: string;
  placeholder?: string;
  xs?: number;
  md?: number;
};

export type FormError = {
  name: string;
  message?: string;
  cargo?: any;
};

export type FormValue = {
  name: string;
  value: string;
};

export type APIResponse = {
  hasErrors?: boolean;
  errors?: FormError[];
};

export enum VALIDATION_TYPES {
  REQUIRED = "REQUIRED",
  MAX_LENGTH = "MAX_LENGTH",
  VALID_DATE = "VALID_DATE",
  VALID_YEAR = "VALID_YEAR",
  FUTURE_DATE = "FUTURE_DATE",
  CREDIT_CARD_NUMBER = "CREDIT_CARD_NUMBER",
  CREDIT_CARD_SEC_CODE = "CREDIT_CARD_SEC_CODE",
  BANK_ROUTING_NUMBER = "BANK_ROUTING_NUMBER",
  BANK_ACCT_NUMBER = "BANK_ACCT_NUMBER",
  PW_STRENGTH = "PW_STRENGTH",
  PW_CONFIRM = "PW_CONFIRM",
  ADDRESS_LAST_NAME = "ADDRESS_LAST_NAME",
  ADDRESS_FIRST_NAME = "ADDRESS_FIRST_NAME",
  ACO_DONATION_DAY_OF_MONTH = "ACO_DONATION_DAY_OF_MONTH",
  ACO_DONATION_OTHER_AMOUNT = "ACO_DONATION_OTHER_AMOUNT",
  EMAIL_ADDRESS = "EMAIL_ADDRESS",
  PHONE_NUMBER = "PHONE_NUMBER",
}

export type ValidationProp = {
  validationType: string; //can make this an enum
  validationParams?: string; //e.g. min length, max length, etc
  message: string;
};

export type Country = {
  Name: string;
  Iso2Code: string;
  Iso3Code: string;
  //   IsSelected: boolean;
  Id: string;
};

export type State = {
  Name: string;
  Iso2Code: string;
  Iso3Code: string;
  Country: string | null;
  //   IsSelected: boolean;
};
