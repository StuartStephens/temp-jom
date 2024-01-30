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

