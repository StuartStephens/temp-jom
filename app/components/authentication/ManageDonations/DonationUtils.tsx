import {
  CREDIT_CARD_TYPES,
  CreditCardType,
  IPaymentMethod,
  PAYMENT_METHOD_TYPES,
} from "../../contexts/Auth/PaymentMethodTypes";

export interface IPaymentMethodDetailsHelper {
  isCreditCard: boolean;
  isCheckingAccount: boolean;
  isDebit: boolean;
  isPaypal: boolean;
  isSavingsAccount: boolean;
  summary: string;
  imageUrl?: string;
  creditCardType?: CreditCardType;
}

export const getPaymentMethodDetailsHelper = (
  paymentMethod: IPaymentMethod
): IPaymentMethodDetailsHelper => {
  return {
    isCreditCard: isCreditCard(paymentMethod),
    isCheckingAccount: isCheckingAccount(paymentMethod),
    isDebit: isDebit(paymentMethod),
    isPaypal: isPaypal(paymentMethod),
    isSavingsAccount: isSavingsAccount(paymentMethod),
    summary: getPaymentMethodSummary(paymentMethod),
    imageUrl: getPaymentMethodImgUrl(paymentMethod),
    creditCardType: getCreditCardType(paymentMethod?.CardType),
  };
};

export const isCreditCard = (paymentMethod: IPaymentMethod): boolean => {
  return (
    !!paymentMethod?.Type &&
    [PAYMENT_METHOD_TYPES.CREDIT_CARD].includes(paymentMethod?.Type)
  );
};

export const isCheckingAccount = (paymentMethod: IPaymentMethod): boolean => {
  return (
    !!paymentMethod?.Type &&
    [PAYMENT_METHOD_TYPES.CHECKING].includes(paymentMethod?.Type)
  );
};

export const isDebit = (paymentMethod: IPaymentMethod): boolean => {
  return (
    !!paymentMethod?.Type &&
    [PAYMENT_METHOD_TYPES.DEBIT_CARD].includes(paymentMethod?.Type)
  );
};

export const isPaypal = (paymentMethod: IPaymentMethod): boolean => {
  return (
    !!paymentMethod?.Type &&
    [PAYMENT_METHOD_TYPES.CREDIT_CARD].includes(paymentMethod?.Type)
  );
};

export const isSavingsAccount = (paymentMethod: IPaymentMethod): boolean => {
  return (
    !!paymentMethod?.Type &&
    [PAYMENT_METHOD_TYPES.SAVINGS].includes(paymentMethod?.Type)
  );
};

export const getCreditCardType = (
  cardType: string | undefined
): CreditCardType | undefined => {
  return cardType && CREDIT_CARD_TYPES.get(cardType)
    ? CREDIT_CARD_TYPES.get(cardType)
    : undefined;
};

export const getPaymentMethodSummary = (
  paymentMethod: IPaymentMethod
): string => {
  switch (paymentMethod.Type) {
    case PAYMENT_METHOD_TYPES.CHECKING.valueOf():
      return `Checking account ending in  ${paymentMethod.BankAccountNumber}`;
    case PAYMENT_METHOD_TYPES.CREDIT_CARD.valueOf():
      return `${paymentMethod.CardType} ending in ${paymentMethod.MaskedCardNumber}`;
    case PAYMENT_METHOD_TYPES.DEBIT_CARD.valueOf():
      return `${paymentMethod.CardType} ending in ${paymentMethod.MaskedCardNumber}`;
    case PAYMENT_METHOD_TYPES.PAYPAL.valueOf():
      return `${paymentMethod.CardType} ending in ${paymentMethod.MaskedCardNumber}`;
    case PAYMENT_METHOD_TYPES.SAVINGS.valueOf():
      return `Savings account ending in ${paymentMethod.BankAccountNumber}`;
    default:
      return "";
  }
};
export const getPaymentMethodImgUrl = (paymentMethod: IPaymentMethod) => {
  const cardType = getCreditCardType("" + paymentMethod?.CardType);
  return cardType?.imageUrl;
};
