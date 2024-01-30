import { FormField, VALIDATION_TYPES } from "./FormSupportTypes";

export const CREDIT_CARD_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "cardNumber",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Card Number is Required",
        },
        {
          validationType: VALIDATION_TYPES.CREDIT_CARD_NUMBER,
          message: "Card Number is Invalid",
        },
      ],
    },
  ],
  [
    "nameOnCard",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Name on Card is Required",
        },
      ],
    },
  ],
  [
    "expirationDate",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Expiration Date is Required",
        },
        {
          validationType: VALIDATION_TYPES.VALID_DATE,
          message: "Expiration Date is Required",
        },
        {
          validationType: VALIDATION_TYPES.FUTURE_DATE,
          message: "Expiration Date Must be in the Future",
        },
      ],
    },
  ],
  [
    "securityCode",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Security Code is Required",
        },
        {
          validationType: VALIDATION_TYPES.CREDIT_CARD_SEC_CODE,
          message: "Security Code must be exactly 3 characters",
        },
      ],
    },
  ],
]);

export const CHANGE_PASSWORD_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "currentPassword",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Current Password is Required",
        },
      ],
    },
  ],
  [
    "newPassword",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.PW_STRENGTH,
          message:
            "New password must be at least 8 characters long with at least 1 number and 1 special character",
        },
      ],
    },
  ],
  [
    "confirmPassword",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Confirm Password is Required",
        },
        {
          validationType: VALIDATION_TYPES.PW_CONFIRM,
          message: "Confirm Password must match New password",
        },
      ],
    },
  ],
]);

export const ADDRESS_FORM: Map<string, FormField> = new Map<string, FormField>([
  [
    "lastName",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.ADDRESS_LAST_NAME,
          message: "Last Name is Required",
        },
      ],
    },
  ],
  [
    "firstName",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.ADDRESS_FIRST_NAME,
          message: "First Name is Required",
        },
      ],
    },
  ],
  [
    "address1",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Address 1 Name is Required",
        },
      ],
    },
  ],
  ["address2", { type: "text", defaultValue: "", validationProps: [] }],
  [
    "city",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "City is Required",
        },
      ],
    },
  ],
  [
    "zipCode",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Zip Code is Required",
        },
      ],
    },
  ],
  [
    "state",
    {
      type: "select",
      defaultValue: "VI",
      validationProps: [],
    },
  ],
  [
    "country",
    {
      type: "select",
      defaultValue: "USA",
      validationProps: [],
    },
  ],
]);

export const CHECKING_FORM: Map<string, FormField> = new Map<string, FormField>(
  [
    [
      "bankName",
      {
        type: "text",
        defaultValue: "",
        validationProps: [
          {
            validationType: VALIDATION_TYPES.REQUIRED,
            message: "Bank Name is Required",
          },
        ],
      },
    ],
    [
      "accountType",
      {
        type: "text",
        defaultValue: "",
        validationProps: [
          {
            validationType: VALIDATION_TYPES.REQUIRED,
            message: "Account Type is Required",
          },
        ],
      },
    ],
    [
      "routingNumber",
      {
        type: "text",
        defaultValue: "",
        validationProps: [
          {
            validationType: VALIDATION_TYPES.REQUIRED,
            message: "Bank Routing Number is Required",
          },
          {
            validationType: VALIDATION_TYPES.BANK_ROUTING_NUMBER,
            message: "Bank Routing Number is Invalid",
          },
        ],
      },
    ],
    [
      "accountNumber",
      {
        type: "text",
        defaultValue: "",
        validationProps: [
          {
            validationType: VALIDATION_TYPES.REQUIRED,
            message: "Bank Account Number is Required",
          },
          {
            validationType: VALIDATION_TYPES.BANK_ACCT_NUMBER,
            message: "Bank Account Number is Invalid",
          },
        ],
      },
    ],
  ]
);

export const ACO_DONATION_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "Id",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Bank Name is Required",
        // },
      ],
    },
  ],
  [
    "donationAmount",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Bank Name is Required",
        // },
      ],
    },
  ],
  [
    "productOption",
    {
      type: "select",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Account Type is Required",
        // },
      ],
    },
  ],
  [
    "monthlyPartnerAgreement",
    {
      type: "checkbox",
      defaultValue: "false",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Bank Routing Number is Required",
        // },
        // {
        //   validationType: VALIDATION_TYPES.BANK_ROUTING_NUMBER,
        //   message: "Bank Routing Number is Invalid",
        // },
      ],
    },
  ],
  [
    "otherAmount",
    {
      validationProps: [
        {
          validationType: VALIDATION_TYPES.ACO_DONATION_OTHER_AMOUNT,
          message: "Other Amount must be a valid number",
        },
        // {
        //   validationType: VALIDATION_TYPES.BANK_ROUTING_NUMBER,
        //   message: "Bank Routing Number is Invalid",
        // },
      ],
    },
  ],
]);
