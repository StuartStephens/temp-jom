import { APIError, ICountryDetail, IStateDetail } from "../Common/CommonTypes";
import { IContact } from "../../contexts/Common/TransactionDetailsTypes";

export interface IContactInformationAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IContactInformation;
}

export interface IContactAddress {
  Id: string;
  CustomerId?: string;
  FirstName?: string;
  LastName?: string;
  IsPrimary?: boolean;
  IsDefaultBilling?: boolean;
  IsDefaultShipping?: boolean;
  IsSelected?: boolean;
  City?: string;
  StateDetail?: IStateDetail;
  DoNotMail?: boolean;
  State?: string;
  CountryDetail?: ICountryDetail;
  Country?: string;
  Summary?: string;
  Latitude?: number; //0.0
  Longitude?: number; //0.0
  Line1?: string;
  Line2?: string;
  Person?: string;
  Name?: string;
  PostalCode?: string;
  HasBasicData?: boolean;
}

export type IContactInformation = {
  Id: string;
  IsLoggedIn: boolean;
  IsGuest: boolean;
  IsPartner: boolean;
  Security: {
    IsAdmin: boolean;
    SecurityRoles: null;
    SecurityFlags: null;
    SecurityAuthority: null;
  };
  Address: IContactAddress;
  DefaultBillingAddress: IContactAddress;
  DefaultShippingAddress: IContactAddress;
  BirthDate: string;
  DoNotEmail: boolean;
  DoNotPhone: boolean;
  DoNotCallMobile: null;
  AllowSMS: null;
  DoNotPostalMail: boolean;
  PrimaryEmailAddress: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  Gender: number;
  Acno: string;
  Church: string;
  Discount: number;
  PriceLevelId: string;
  Facebook: string;
  Instagram: string;
  TaxExempt: boolean;
  Twitter: string;
  LastLogin: string;
  IsPrivate: boolean;
  PhoneNumber: string;
  MobilePhoneNumber: string;
  SiteCode: string;
  Sourcecode: string;
  CreatedOn: string;
  LastDonationAmount: number;
  HighestDonationAmount: number;
  AverageDonationAmount: number;
  GiftAskLow: number;
  GiftAskMid: number;
  GiftAskHigh: number;
  JOMMobile: string;
  LWCMobile: string;
  DonorFrequency: string;
  DonorType: any;
  GivingHistory: [];
  AuthToken: string;
  RedirectUrl: string;
  DefaultCurrency: string;
  AdminChurches: any;
};

export type IDashboardHero = {
  contact: IContact;
  EmailMD5Hash: string;
};
