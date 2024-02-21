import { IChurch } from "../../components/FindChurchesContainer/SearchForChurch";
import { IContactAddress } from "../../contexts/Auth/AccountTypes";
import {
  IPaymentMethod,
  PAYMENT_METHOD_TYPES,
} from "../../contexts/Auth/PaymentMethodTypes";
import { APIError, ICountryDetail } from "../../contexts/Common/CommonTypes";

export interface IOrderDetailsAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IOrderHeader;
}

export interface IOrderHeadersAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IOrderHeader[];
}

export type IOrderHeader = {
  Id: string;
  Contact: IContact;
  CustomerId: string; //
  Payments: any;
  OrderItems: IShoppingCartItem[];
  Status: number; //0,
  Discount: number; //0.0,
  Shipping: number; //0.0,
  ProductTotal: number; //25.0,
  DonationTotal: number; //0.0,
  EventTotal: number; //0.0,
  Subtotal: number; //0.0,
  Tax: number; //0.0,
  Total: number; //25.0,
  IsWebOrder: boolean; //false,
  OrderDate: string; //"2023-10-26T19:51:52",
  IsFromRecurringGift: false;
  OrderNumber: string; //"ORD-4511940-S8R4F9",
  CurrencySymbol: string; //"$",
  Currency: ICurrencyType;
  StatusString: string; //"0",
  TrackingNumbers: string; //"",
};

export type ITransactionDetail = {
  id?: string; //"04756828-165b-417b-9efe-56e26a6bfb1f";
  Type?: string; //"ShoppingCart";
  CreatedOn?: string; //"2023-10-27T00?:52?:23.982434Z";
  ModifiedOn?: string; //"2023-10-30T16?:52?:05.7609717Z";
  SubmittedOn?: any; //null;
  ProcessedOn?: any; //null;
  CompletedOn?: any; //null;
  partition?: string; //"CART#04756828-165b-417b-9efe-56e26a6bfb1f";
  CheckoutInitiated?: boolean; //true;
  Status?: number; //1;
  CurrentLocation?: string; //"UNITED STATES";
  Currency?: ICurrencyType;
  AllowInstallments?: boolean; //false;
  InstallmentDates?: any; //null;
  InstallmentOptions?: any; //null;
  IsNew?: boolean; //false;
  ItemList?: IShoppingCartItem[];
  BillToAddress?: IContactAddress;

  BillToCompany?: any; //null;
  Weight?: number; //0.0;
  Contact?: IContact;
  AreDiscountsDisabled?: boolean; //false;
  Id?: string; //"04756828-165b-417b-9efe-56e26a6bfb1f";
  Order?: any; // null;
  Payment?: IPayment;
  ShipToAddress?: IContactAddress;

  Sourcecode?: string; //"2300JW";
  Discount?: number; //0.0;
  Shipping?: number; //0.0;
  ProductTotal?: number; //35.0;
  DonationTotal?: number; //0.0;
  Subtotal?: number; // 35.0;
  Tax?: number; // 0.0;
  Total?: number; //35.0;
  RegistrationProduct?: null;
  ShippingInfoList?: IShippingInfo[];
  ShippingOptionsChanged?: boolean; //false;
  SiteCode?: string; //"JOM";
  Environment?: string; //"Debugging JOM Integration";
  IPAddress?: string; //"98.122.249.197?:52648";
  DenyPayPal?: boolean; //false;
  DenyDigitalWallet?: boolean; //false;
  DenyEFT?: boolean; //false;
  TransactionProcessorUrl?: string; //"https?://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-7593433782750950D";
  Notifications?: null;
  ChurchAccountId?: null;
  ChurchAccountName?: null;
  CancelUrl?: string; //"https?://int.joelosteen.com/store/cart";
  SuccessUrl?: string; //"https?://int.joelosteen.com/store/cart/checkout/paypal-success";
  AvailablePaymentTypes?: PAYMENT_METHOD_TYPES[];
  PaymentNotSet?: boolean; //false;
  PaymentNotSetReason?: null;
  Audit?: IAudit[];
  ProcessingDetails?: [];
  ProcessingErrors?: any; //null;
  BillToPhone?: any; //null;
  BillToEmail?: string; //"ven-dobrien@lakewood.cc";
  BillToAddressSummary?: string; //"5507 FULTON RIDGE DR, Suite 4, INDIAN TRAIL, NC, 28079, USA";
  ShipToAddressSummary?: string; //"5507 FULTON RIDGE DR, Suite 4, INDIAN TRAIL, NC, 28079, USA";
  PaymentMethodSummary?: string; //"Bank Account ********1234";
  OrderNumber?: any; //null;
  OrderId?: any; //null;
  ContactId?: string; //"3302a646-1536-ee11-bdf4-000d3a190fe1";
  ContactAcno?: string; //"C011006381";
  ShipToEmail?: string; //"ven-dobrien@lakewood.cc";
  ShipToPhone?: any; //null;
  BillToFirstName?: string; //"Don";
  BillToLastName?: string; //"Test";
  ShipToFirstName?: string; //"Don";
  ShipToLastName?: string; //"Test";
  HasSaleProducts?: boolean; //true;
  IsAppleToken?: boolean; //false;
  IsAppleLogin?: boolean; //false;
  IsFacebookToken?: boolean; //false;
  IsFacebookLogin?: boolean; //false;
  IsPasswordLogin?: boolean; //true;
  IsGuest?: boolean; //false;
  RequiresShipping?: boolean; //true;
  ShippingMethod?: IShippingMethod;
  HasDonations?: boolean; //false;
  HasRecurringDonation?: boolean; //false;
  HasDonationOnly?: boolean; //false;
  HasRecurringDonationOnly?: boolean; //false;
  HasPromotions?: boolean; //false;
};

export type ISecurityData = {
  IsAdmin?: boolean; //false;
  SecurityRoles?: any; //null;
  SecurityFlags?: any; //null;
  SecurityAuthority?: any; //null;
};

export type IContact = {
  Id?: string; // "3302a646-1536-ee11-bdf4-000d3a190fe1";
  IsLoggedIn?: boolean; //true;
  IsGuest?: boolean; //false;
  IsPartner?: boolean; //false;
  Security?: ISecurityData;
  Address?: IContactAddress;
  DefaultBillingAddress?: IContactAddress;
  DefaultShippingAddress?: IContactAddress;
  BirthDate?: any; //null;
  DoNotEmail?: boolean; //true;
  DoNotPhone?: boolean; //true;
  DoNotCallMobile?: any; //null;
  AllowSMS?: any; //null;
  DoNotPostalMail?: boolean; //false;
  PrimaryEmailAddress?: string; //"ven-dobrien@lakewood.cc";
  FirstName?: string; //"Don";
  LastName?: string; //"Test";
  FullName?: string; //"Don Test";
  Gender?: number; //3;
  Acno?: string; //"C011006381";
  Church?: any; //null;
  Discount?: number; //0.0;
  PriceLevelId?: string; //"5f7fcdb8-a87a-e611-80c9-000d3a700f55";
  Facebook?: any; //null;
  Instagram?: any; //null;
  TaxExempt?: boolean; //false;
  Twitter?: any; //null;
  LastLogin?: string; //"2023-10-30T16?:52?:04.305617Z";
  IsPrivate?: boolean; //false;
  PhoneNumber?: any; //null;
  MobilePhoneNumber?: any; // null;
  SiteCode?: string; //"JOM";
  Sourcecode?: string; //"2300JW";
  CreatedOn?: string; //"2023-08-08T17?:59?:18Z";
  LastDonationAmount?: number; //0.0;
  HighestDonationAmount?: number; //0.0;
  AverageDonationAmount?: number; //0.0;
  GiftAskLow?: number; //10.0;
  GiftAskMid?: number; //15.0;
  GiftAskHigh?: number; //25.0;
  JOMMobile?: any; //null;
  LWCMobile?: any; //null;
  DonorFrequency?: string; //"";
  DonorType?: string; //"";
  GivingHistory?: any; //null;
  AuthToken?: any; //null;
  RedirectUrl?: any; //null;
  DefaultCurrency?: ICurrencyType;
  AdminChurches?: IChurch[]; //null;
};

export type IPayment = {
  Id?: string; // "e13b42c1-38ba-444c-b13c-86023c29a194";
  Method?: IPaymentMethod;
  AuthorizationToken?: string; //"2377265b-6774-ee11-9ae7-0022482497d6";
  ConfirmationToken?: string; //"";
  Amount?: number; // 35.0;
  Currency?: ICurrencyType;
  HasRequiredDetailsForRecurringDonationOnly?: boolean; //true;
  HasRequiredDetails?: boolean; //true;
};

export type ICurrencyType = {
  Id?: string; //"2910ccf8-ec75-e611-80ca-000d3a7075d4";
  Name?: string; //"US Dollar";
  Symbol?: string; //"$";
  Iso3Code?: string; //"USD";
  IsSelected?: boolean; // false;
};
export type IShippingMethod = {
  Name?: string; // "UMI";
  FOB?: string; // "UMD";
  EstimatedDelivery?: string; // "5 - 15 Business Days";
  Id?: string; // "1e7f3412-81a9-df11-9532-005056954cab";
  Classification?: string; // "Economy";
};

export type IShippingInfo = {
  Method?: IShippingMethod;
  Amount?: number; // 2.7;
  Warehouse?: IWarehouse;
  IsDefault?: boolean; //true;
  PackDate?: any; //null;
  ShipDate?: any; //null;
  TrackingNumber?: any; //null;
};

export type IShoppingCartItem = {
  Id?: string; //"24f3474a-fbba-47fc-95dd-8327917264e7";
  ShippingInfo?: IShippingInfo;
  Quantity?: number; //1;
  Product?: IProductDetails;
  Subproject?: null;
  IsPromoItem?: boolean; //false;
  MinimumDonation?: number; //0.0;
  PromotionSourcecode?: null;
  Amount?: number; //10.0;
  DonationRecurDay?: null;
  NextDonationDate?: null;
  Notes?: null;
  Total?: number; //10.0;
  RestrictionList?: null;
  Country?: null;
  Detail?: string; //"CD";
  StatusDetail?: null;
  IncludeInOrder?: boolean; // true;
  Tax?: number; //0.0;
  IsRecurringDonation?: boolean; //false;
  IsBackOrdered?: boolean; //true;
  IsDonation?: boolean; //false;
  FirstDonationDate?: any; //null;
};

export type IProductDetails = {
  Id?: string; //"dc1d11d4-115a-e911-80e7-000d3a700f55";
  DisplayOrder?: number; //6;
  CreatedOn?: string; //"2019-04-08T15?:20?:26Z";
  ModifedOn?: string; // "2022-10-09T14?:32?:06Z";
  StartDate?: any; // null;
  EndDate?: any; //null;
  Name?: string; // "En Tus Maravillas";
  IsDonation?: boolean; //false;
  Description?: string; //"Nuestra música es como un tapiz de estilos entretejidos entre sí resultando en una continua expression de adoración. Nuestro mayor deseo es escuchar el sonodo del cielo aquí en la tierra donde personas de todas la naciones y trasfondos puedan levantar su adoración a una sola voz";
  SEODescription?: string; //null;
  SEOKeywords?: string; //null;
  Topics?: any[]; //[];
  SKU?: string; //"LCM0014S";
  AuthorOrProducer?: string; //"Lakewood Music";
  Weight?: number; //0.0;
  AvailableQuantity?: number; // 0;
  AreBackordersAllowed?: boolean; //true;
  IsBackordered?: boolean; //true;
  BackorderExpectedDate?: null;
  Detail1?: string; // "CD";
  Detail2?: string; // "4/12/2019";
  Images?: IProductImage[];
  IsOnSale?: boolean; //false;
  IsNew?: boolean; //false;
  IsFeatured?: boolean; //false;
  IsPreorder?: boolean; //false;
  IsDiscountAllowed?: boolean; //false;
  AreInstallmentsAllowed?: boolean; //false;
  Price?: number; //10.0;
  MSRP?: number; //10.0;
  IsDownloadable?: boolean; //false;
  DownloadURL?: null;
  VariantGroup?: null;
  VariantProducts?: null;
  Variants?: [];
  Tags?: [];
  RelatedProducts?: IProductDetails[];
  Warehouses?: IWarehouse[];
  Type?: string; //"Product";
  CurrentCategory?: boolean; //null;
  NextProduct?: boolean; //null;
  PrevProduct?: boolean; //null;
  IsQualifyingBook?: boolean; //false;
  IsQualifyingAudioBook?: boolean; //false;
  DefaultUoMId?: string; //"675505b8-9b2a-4075-951a-af59ecbeff6f";
  IsBundle?: boolean; //false;
  BundledProducts?: null;
  IsQualifyBookOrQualifyingAudioBook?: boolean; //false;
};

export type IProductImage = {
  Id?: string; // "93ece23e-c03d-ed11-80f4-000d3a7075d4";
  Type?: number; //2;
};

export type IPriority = {
  Priority?: number; //2;
  CurrencyISO3?: string; //"USD";
};

export type IWarehouse = {
  Id?: string; //"0f2005e3-e50d-e211-9dde-005056810022";
  Name?: string; //"PBD";
  Country?: ICountryDetail;
  Priorities?: IPriority[];
};

export type ICartClaims = {
  IsGuest?: boolean; //true;
  CartId?: string; //"04756828-165b-417b-9efe-56e26a6bfb1f";
  Sourcecode?: string; //"2300JW";
  CurrencyId?: string; //"2910ccf8-ec75-e611-80ca-000d3a7075d4";
  Country?: string; //"USA";
  OrderId?: any; //null;
  SiteCode?: string; //"JOM";
  Environment?: string; //"Debugging JOM Integration";
};

export type IContactClaims = {
  Name?: string; // "Don Test";
  FirstName?: string; // "Don";
  LastName?: string; // "Test";
  Email?: string; // "ven-dobrien@lakewood.cc";
  Id?: string; //  "3302a646-1536-ee11-bdf4-000d3a190fe1";
  Acno?: string; // "C011006381";
  MyAccountUrl?: string; //  "/account";
  WebSiteUrl?: string; // null;
};

export type IAudit = {
  DateTime?: string; // "2023-10-30T16?:52?:05.6203484Z";
  Endpoint?: string; // "/api/Contact/Login";
  Action?: any; //null;
  CartClaims?: ICartClaims;
  ContactClaims?: IContactClaims;
};
