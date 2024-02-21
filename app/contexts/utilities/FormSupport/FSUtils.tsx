import { FormConfiguration } from "./FormFieldPropConstants";
import { FormError, FormField } from "./FormSupportTypes";

export function deepCopy(value: any, myReplacer?: (number | string)[] | null) {
  if (myReplacer) {
    return !!value ? JSON.parse(JSON.stringify(value, myReplacer)) : undefined;
  } else {
    return !!value ? JSON.parse(JSON.stringify(value)) : undefined;
  }
  // return !!value ? JSON.parse(JSON.stringify(value)) : undefined;
}
export const hasErrors = (errors: any, value: FormError | undefined) => {
  return errors && value && value.message && value.message.length > 0;
};

export const formatDateForPicker = (value?: string): string => {
  return !value
    ? new Date().toISOString().split("T")[0]
    : new Date(value).toISOString().split("T")[0];
};

export const makeContextConfig = (
  formFields: Map<string, FormField>,
  postFormEndpoint?: string,
  validateFormEndpoint?: string | undefined
): FormConfiguration => {
  return {
    formFields: formFields,
    validateFormEndpoint: validateFormEndpoint,
    postFormEndpoint: postFormEndpoint,
  } as FormConfiguration;
};

export interface IDayOfWeek {
  value: string;
  displayValue: string;
  numericValue: number;
}

export function getDaysOfWeek(): IDayOfWeek[] {
  return [
    {
      value: "Sunday",
      displayValue: "Sunday",
      numericValue: 0,
    },
    {
      value: "Monday",
      displayValue: "Monday",
      numericValue: 1,
    },
    {
      value: "Tuesday",
      displayValue: "Tuesday",
      numericValue: 2,
    },
    {
      value: "Wednesday",
      displayValue: "Wednesday",
      numericValue: 3,
    },
    {
      value: "Thursday",
      displayValue: "Thursday",
      numericValue: 4,
    },
    {
      value: "Friday",
      displayValue: "Friday",
      numericValue: 5,
    },
    {
      value: "Saturday",
      displayValue: "Saturday",
      numericValue: 6,
    },
  ];
}

export interface IHour {
  displayValue: string;
  value: string;
  numericValue: number;
}

export function getHourValues(): IHour[] {
  let ret: IHour[] = [];
  for (var i = 1; i < 12; i++) {
    ret.push({
      displayValue: "" + i,
      value: "" + i,
      numericValue: i,
    });
  }
  return ret;
}

export function getMinuteValuesIn5MinuteIncrements() {
  return [
    "00",
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];
}
