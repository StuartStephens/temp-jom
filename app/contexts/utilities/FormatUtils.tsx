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

export const printPage = function() {
    window.print();
    return false;
};

