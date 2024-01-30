// import { Col, FloatingLabel, Form } from "react-bootstrap";
// import { hasErrors } from "../../utilities/FormSupport/FSUtils";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { FormField } from "../../contexts/utilities/FormSupport/FormSupportTypes";
import { FormGeneratorSelect } from "./FormGeneratorSelect";
import { useEffect, useRef } from "react";
import { FIELD_REF_ACTIONS } from "../../contexts/utilities/FormSupport/FSReducers";
import { FormGeneratorText } from "./FormGeneratorText";

export interface IFormGeneratorFieldProps {
  settings: FormField;
  //   onCommand: Function;
}

export function FormGeneratorField({
  settings,
}: //   onCommand,
  IFormGeneratorFieldProps) {
  const {
    handleInputChange,
    handleInputBlur,
    form,
    initForm,
    errors,
    handleSelectChange,
    handleSelectBlur,
    executeCommand,
    dispatch,
    getReferenceValues,
  } = useFormSupportContext();
  const fieldRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: FIELD_REF_ACTIONS.ADD_PROPERTY,
      fieldName: settings.name,
      payload: fieldRef.current,
    });
  }, [fieldRef && fieldRef.current]);

  function handleSelectInitCommand(
    command: string,
    callbackFunction: Function
  ) {
    executeCommand(command, settings, callbackFunction);
  }

  if (form) {
    const fieldName: string = settings.name || "";
    const fieldLabel: string = settings.label || "";
    const thefield: any = eval("form['" + fieldName + "']");

    switch (settings.type) {
      case "text":
        return (
          <FormGeneratorText
            settings={settings}
            onTextBlur={handleInputBlur}
            onTextChange={handleInputChange}
          />
        );
      case "select":
        return (
          <FormGeneratorSelect
            settings={settings}
            onSelectBlur={handleSelectBlur}
            onSelectChange={handleSelectChange}
            onSelectInitCommand={handleSelectInitCommand}

          //   initializeOptions={(commandName: string, settings: FormField) => {
          //     onCommand("initializeOptions", settings);
          //   }}
          />
        );

      default:
      //do nothng
    }
  }

  return <div>none found</div>;
}

