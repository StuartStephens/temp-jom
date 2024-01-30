import { useEffect, useRef, useState } from "react";
import { Col, FloatingLabel, Form } from "react-bootstrap";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { FIELD_REF_ACTIONS } from "../../contexts/utilities/FormSupport/FSReducers";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { FormField } from "../../contexts/utilities/FormSupport/FormSupportTypes";
import { hasErrors } from "../../contexts/utilities/FormSupport/FSUtils";

export interface IFormGeneratorTextProps {
  settings: FormField;
  onTextChange: Function;
  onTextBlur: Function;
}

export function FormGeneratorText({
  settings,
  onTextChange,
  onTextBlur,
}: IFormGeneratorTextProps) {
  const { dispatch, errors, form } = useFormSupportContext();
  const fieldRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: FIELD_REF_ACTIONS.ADD_PROPERTY,
      fieldName: settings.name,
      payload: fieldRef.current,
    });
  }, [fieldRef && fieldRef.current]);
  // useEffect(() => {
  //   dispatch({
  //     type: FIELD_REF_ACTIONS.ADD_PROPERTY,
  //     fieldName: settings.name,
  //     payload: fieldRef.current,
  //   });
  // }, []);

  const ready = true;
  return !ready ? (
    <Col xs={settings.xs} md={settings.md}>
      <LoadingSpinner />
    </Col>
  ) : (
    <>
      {/* {optionValues && JSON.stringify(optionValues)} */}
      <Form.Group
        key={`FIELD_${settings.name}`}
        as={Col}
        xs={settings.xs}
        md={settings.md}
        className=" mt-4"
      >
        <FloatingLabel controlId={settings.name} label={settings.label}>
          <Form.Control
            ref={fieldRef}
            type="text"
            placeholder={settings?.placeholder || ""}
            name={`${settings.name}`}
            onChange={(e) => {
              onTextChange(e);
            }}
            onBlur={(e) => {
              onTextBlur(e);
            }}
            value={(settings.name && form[settings.name]) || ""}
            isInvalid={hasErrors(
              errors,
              settings.name && errors[settings.name]
            )}
          />
          <Form.Control.Feedback type="invalid">
            {settings.name &&
              errors[settings.name] &&
              errors[settings.name].message}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
    </>
  );
}

