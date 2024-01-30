import { APIError } from "../Common/CommonTypes";

export interface IPaymentMethod {
  Id?: string;
  Alias?: string;
  NameOnAccount?: string;
  IsSelected?: boolean;
  CardType?: string;
  CardExpMMYY?: string;
  CardToken?: string | undefined;
  MaskedCardNumber?: string;
  BankAccountNumber?: string;
  Type?: number; //PAYMENT_METHOD_TYPES;
  BankRoutingNumber?: string;
  BankAccountId?: string;
  Code?: string;
  Company?: string;
  CustomerId?: string;
  DigitalWalletName?: string;
  Summary?: string;
  HasRequiredDetails?: boolean;
}

export interface IPaymentMethodsAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IPaymentMethod[];
}

export enum PAYMENT_METHOD_TYPES {
  CHECKING = 1,
  SAVINGS = 2,
  CREDIT_CARD = 3,
  PAYPAL = 4,
  DEBIT_CARD = 5, //TODO: there are 5 types, not sure what 5 is
}

export enum CREDIT_CARD_NAMES {
  VISA = "Visa",
  MASTERCARD = "Master Card",
  AMEX = "American Express",
  DISCOVER = "Discover",
  OTHER = "Other",
  PAYPAL = "Paypal",
}
export enum CREDIT_CARD_BRAND_IMAGES {
  VISA = "https://joelosteen.com/Areas/Jom/img/Visa.png",
  MASTERCARD = "https://joelosteen.com/Areas/Jom/img/Mastercard.png",
  AMEX = "https://joelosteen.com/Areas/Jom/img/American_Express.png",
  DISCOVER = "https://joelosteen.com/Areas/Jom/img/Discover.png",
  OTHER = "OTHER",
  PAYPAL = "https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2.jpg",
}

export type CreditCardType = {
  name: string;
  imageUrl: string;
};

export const CREDIT_CARD_TYPES = new Map<string, CreditCardType>([
  [
    CREDIT_CARD_NAMES.VISA,
    { name: "Visa", imageUrl: CREDIT_CARD_BRAND_IMAGES.VISA },
  ],
  [
    CREDIT_CARD_NAMES.MASTERCARD,
    { name: "Visa", imageUrl: CREDIT_CARD_BRAND_IMAGES.MASTERCARD },
  ],
  [
    CREDIT_CARD_NAMES.AMEX,
    { name: "Visa", imageUrl: CREDIT_CARD_BRAND_IMAGES.AMEX },
  ],
  [
    CREDIT_CARD_NAMES.DISCOVER,
    { name: "Visa", imageUrl: CREDIT_CARD_BRAND_IMAGES.DISCOVER },
  ],
  [
    CREDIT_CARD_NAMES.OTHER,
    { name: "Visa", imageUrl: CREDIT_CARD_BRAND_IMAGES.OTHER },
  ],
  [
    CREDIT_CARD_NAMES.PAYPAL,
    { name: "Visa", imageUrl: CREDIT_CARD_BRAND_IMAGES.PAYPAL },
  ],
]);

