import { APIError } from "../Common/CommonTypes";

export interface IPhoneNumber {
  Phone: string;
  IsPrimary: boolean;
  AllowSMS: boolean;
  DoNotCall: boolean;
  IsMobile: boolean;
  Id?: string;
}

export interface IPhoneNumbersAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IPhoneNumber[];
}

