import { APIError } from "../Common/CommonTypes";

export interface IEmailAddress {
  Email: string;
  IsPrimary: boolean;
  Id?: string;
  DoNotEmail: boolean;
}

export interface IEmailAddressesAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IEmailAddress[];
}

