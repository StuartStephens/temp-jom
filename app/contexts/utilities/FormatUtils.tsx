import { ICurrencyType } from "../Common/TransactionDetailsTypes";

export const formatPrice = (
  amount: number,
  currencyType?: ICurrencyType | string | undefined
): string => {
  if (typeof currencyType === "string") {
    return amount.toFixed(2) + " " + currencyType;
  }
  return (currencyType ? currencyType?.Symbol : "") + amount.toFixed(2);
};

export const parseCurrency = (amount: string): number => {
  var currency: string = "$" + amount;
  var number = Number(currency.replace(/[^0-9\.]+/g, ""));
  return number;
};

export const formatDate = (
  date: string,
  locale?: Intl.LocalesArgument
): string => {
  if (!locale) {
    locale = "en-us";
  }

  return new Date(date).toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDayOfMonth = (
  dayOfMonth: number,
  locale?: Intl.LocalesArgument
): string => {
  if (!locale) {
    locale = "en-us";
  }
  if (dayOfMonth == 1) {
    return "1st";
  } else if (dayOfMonth == 2) {
    return "2nd";
  } else if (dayOfMonth == 3) {
    return "3rd";
  }
  return dayOfMonth + "th";
};

export const formatYear = (date: string, locale?: Intl.LocalesArgument) => {
  if (!locale) {
    locale = "en-us";
  }
  const retVal = new Date(date).toLocaleDateString(locale, {
    year: "numeric",
  });

  return retVal;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  let retVal: string = phoneNumber;
  if (phoneNumber.length == 10) {
    retVal =
      phoneNumber.slice(0, 3) +
      "-" +
      phoneNumber.slice(3, 6) +
      "-" +
      phoneNumber.slice(6, 10);
  } else if (phoneNumber.length == 11) {
    retVal =
      phoneNumber.slice(0, 1) +
      "-" +
      phoneNumber.slice(1, 4) +
      "-" +
      phoneNumber.slice(4, 7) +
      "-" +
      phoneNumber.slice(7, 11);
  }
  return retVal;
};

export const printPage = function () {
  window.print();
  return false;
};
