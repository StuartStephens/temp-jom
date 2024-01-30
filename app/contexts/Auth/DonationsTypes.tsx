import { APIError } from "../Common/CommonTypes";

export interface IDonation {
  donationId: string;
  paymentMethod: string;
  donationDate: string;
  donationAmount: string;
}

export interface IDonationsAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IDonation[];
}

