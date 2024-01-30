import { REFERENCE_TYPES } from "./FSReducers";
import { FormField, VALIDATION_TYPES } from "./FormSupportTypes";

export interface FormConfiguration {
    postFormEndpoint: string;
    validateFormEndpoint?: string | undefined;
    formFields: Map<string, FormField>;
}

export const CONTACT__EMAIL_ADDRESS_FIELDS: Map<string, FormField> = new Map<
    string,
    FormField
>([
    [
        "Email",
        {
            name: "Email",
            label: "Email Address",
            type: "text",
            defaultValue: "",
            xs: 12,
            md: 6,
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "Email Address is Required",
                },
            ],
        },
    ],
    [
        "IsPrimary",
        {
            name: "IsPrimary",
            label: "IsPrimary",
            type: "hidden",
            defaultValue: "",
            xs: 12,
            md: 6,
            validationProps: [
                // {
                //   validationType: VALIDATION_TYPES.REQUIRED,
                //   message: "IsPrimary Field is Required",
                // },
            ],
        },
    ],
    [
        "ID",
        {
            name: "ID",
            label: "ID",
            type: "hidden",
            defaultValue: "",
            xs: 12,
            md: 6,
            validationProps: [],
        },
    ],
    [
        "DoNotEmail",
        {
            name: "DoNotEmail",
            label: "DoNotEmail",
            type: "hidden",
            xs: 12,
            md: 6,
            // selectOptionsReferenceType: REFERENCE_TYPES.COUNTRIES,
            defaultValue: "",
            validationProps: [],
        },
    ],
]);

export const CONTACT__EMAIL_ADDRESS_CONFIGURATION = {
    postFormEndpoint: "Contact/EmailAddress",
    validateFormEndpoint: undefined,
    formFields: CONTACT__EMAIL_ADDRESS_FIELDS,
} as FormConfiguration;

export const FORM_GENERATOR_FIELDS: Map<string, FormField> = new Map<
    string,
    FormField
>([
    [
        "testField",
        {
            name: "testField",
            label: "Test Input",
            type: "text",
            initCommandName: "textFieldInit",
            defaultValue: "",
            xs: 12,
            md: 6,
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "This Test Input Field is Required",
                },
            ],
        },
    ],
    [
        "testField2",
        {
            name: "testField2",
            label: "Test Input 2",
            type: "text",
            initCommandName: "textFieldInit",
            defaultValue: "",
            xs: 12,
            md: 6,
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "Test Input 2 Field is Required",
                },
            ],
        },
    ],
    [
        "testField3",
        {
            name: "testField3",
            label: "Test Input 3",
            type: "text",
            initCommandName: "textFieldInit",
            defaultValue: "",
            xs: 12,
            md: 6,
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "Test Input 3 Field is Required",
                },
            ],
        },
    ],
    [
        "country",
        {
            name: "country",
            label: "Country",
            type: "select",
            initCommandName: "initCountryField",
            xs: 12,
            md: 6,
            initSelectOptionsCommandName: "initCountryOptions",
            selectOptionsReferenceType: REFERENCE_TYPES.COUNTRIES,

            // onInputChangedCommand: "handleInputChanged",
            // onSelectChangedCommand: "handleSelectChanged",
            // onInputBlurredCommand: "handleInputBlurred",
            // onSelectBlurredCommand: "handleSelectBlurred",
            defaultValue: "USA",
            validationProps: [],
        },
    ],
]);

export const FORM_GENERATOR: FormConfiguration = {
    postFormEndpoint: "postForm",
    validateFormEndpoint: undefined,
    formFields: FORM_GENERATOR_FIELDS,
};

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
            label: "Id",
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
            label: "Donation Amount",
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
            label: "Product Option",
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
            defaultValue: "on",
            label: "Other Amount",
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
    [
        "billDayOfMonth",
        {
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.ACO_DONATION_DAY_OF_MONTH,
                    message: "Please select a valid day between 1 and 28",
                },
                // {
                //   validationType: VALIDATION_TYPES.BANK_ROUTING_NUMBER,
                //   message: "Bank Routing Number is Invalid",
                // },
            ],
        },
    ],
]);

export const EMAIL_ADDRESS_FORM: Map<string, FormField> = new Map<
    string,
    FormField
>([
    [
        "Email",
        {
            type: "email",
            defaultValue: "",
            validationProps: [
                // {
                //   validationType: VALIDATION_TYPES.REQUIRED,
                //   message: "Card Number is Required",
                // },
                {
                    validationType: VALIDATION_TYPES.EMAIL_ADDRESS,
                    message: "Email Address is Invalid",
                },
            ],
        },
    ],
]);
export const PHONE_NUMBER_FORM: Map<string, FormField> = new Map<
    string,
    FormField
>([
    [
        "Phone",
        {
            type: "text",
            defaultValue: "",
            validationProps: [
                // {
                //   validationType: VALIDATION_TYPES.REQUIRED,
                //   message: "Card Number is Required",
                // },
                {
                    validationType: VALIDATION_TYPES.PHONE_NUMBER,
                    message: "Phone Number is Invalid",
                },
            ],
        },
    ],
]);

export const BASIC_INFORMATION: Map<string, FormField> = new Map<
    string,
    FormField
>([
    [
        "firstName",
        {
            type: "text",
            defaultValue: "",
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "First Name is Required",
                },
            ],
        },
    ],
    [
        "lastName",
        {
            type: "text",
            defaultValue: "",
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "Last Name is Required",
                },
            ],
        },
    ],
    [
        "dateOfBirth",
        {
            type: "text",
            defaultValue: "",
            validationProps: [
                // {
                //   validationType: VALIDATION_TYPES.REQUIRED,
                //   message: "Date of Birth is Required",
                // },
            ],
        },
    ],
    [
        "gender",
        {
            type: "text",
            defaultValue: "",
            validationProps: [
                // {
                //   validationType: VALIDATION_TYPES.REQUIRED,
                //   message: "Gender is Required",
                // },
            ],
        },
    ],
]);

