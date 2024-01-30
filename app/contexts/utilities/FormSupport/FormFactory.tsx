import { ReactNode } from "react";
import { Col, FloatingLabel, Form } from "react-bootstrap";
import { deepCopy, hasErrors } from "./FSUtils";
import { useFormSupportContext } from "./FormSupportContext";
import { FormField } from "./FormSupportTypes";

export type FormFactoryFieldSettings = {
  fieldName: string;
  props: any;
};

export const useFormFactory = () => {
  const { handleInputChange, handleInputBlur, form, initForm, errors, state } =
    useFormSupportContext();
  const { formConfiguration: config } = state;

  const getTextField = (settings: FormField): ReactNode => {
    const fieldName: string = settings.name || "";

    const thefield: any = eval("form['" + fieldName + "']");
    return fieldName ? (
      <>
        <Form.Group as={Col} className="col-12 col-md-6 mt-4">
          <FloatingLabel controlId={settings.name} label={fieldName}>
            <Form.Control
              type="text"
              placeholder={settings?.placeholder || ""}
              name={`${fieldName}`}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={thefield || ""}
              isInvalid={hasErrors(errors, errors[fieldName])}
            />
            <Form.Control.Feedback type="invalid">
              {errors[fieldName] && errors[fieldName].message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      </>
    ) : (
      <></>
    );
  };

  const generateForm_OLD = (): void => {
    const thisForm: any = {};

    if (config && config.formFields) {
      config.formFields.forEach((value: FormField, key: string, map: any) => {
        thisForm[key] = value.defaultValue || "";
      });
      initForm(thisForm);
    }
  };

  const getField = (type: string, settings: FormField): ReactNode => {
    let retVal: any = <></>;
    switch (type) {
      case "text":
        retVal = getTextField(settings);
        break;
      default:
      //do Nothing
    }
    return retVal;
  };

  return {
    // errors,
    // form,
    // setOriginalData,
    // handleInputChange,
    // handleInputBlur,
    // handleSelectChange,
    // handleSelectBlur,
    // // handleCheckboxChange,
    // validateForm,
    // resetForm,
    // initForm,
    // generateForm,
    getField,
  };
};

export default useFormFactory;
