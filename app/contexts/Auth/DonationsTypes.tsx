import { IProduct } from "../../(main-pages)/store/featured/FeaturedLayout";
import { APIError } from "../Common/CommonTypes";
import {
  ICurrencyType,
  IProductDetails,
} from "../Common/TransactionDetailsTypes";
import { IPaymentMethod } from "./PaymentMethodTypes";

// export interface IDonation {
//   donationId: string;
//   paymentMethod: string;
//   donationDate: string;
//   donationAmount: string;
// }

export interface IDonation {
  //maps to LWCRM.Services.Data.RecurringGif
  Id: string;
  Sourcecode?: string;
  PaymentReference?: string;
  Amount: number;
  DayOfCharge: number;
  DonationProduct?: IProductDetails; //not sure of this type
  SubprojectCode?: number;
  IsActive?: boolean;
  LastDonationDate?: string;
  NextDonationDate?: string;
  CurrencySymbol?: string;
  Currency?: ICurrencyType;
  PaymentMethod: IPaymentMethod;
}

export interface IDonationsAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IDonation[];
}
