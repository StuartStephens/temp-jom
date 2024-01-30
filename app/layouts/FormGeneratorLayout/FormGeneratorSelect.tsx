import { useEffect, useRef, useState } from "react";
import { Col, FloatingLabel, Form } from "react-bootstrap";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { FIELD_REF_ACTIONS } from "../../contexts/utilities/FormSupport/FSReducers";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { FormField } from "../../contexts/utilities/FormSupport/FormSupportTypes";

export interface IFormGeneratorSelectProps {
  settings: FormField;
  onSelectChange: Function;
  onSelectBlur: Function;
  onSelectInitCommand: Function;
}

export interface ISelectOption {
  name: string;
  value: string;
}

export function FormGeneratorSelect({
  settings,
  onSelectChange,
  onSelectBlur,
}: IFormGeneratorSelectProps) {
  const { getReferenceValues, dispatch } = useFormSupportContext();
  const { countries } = useAccountInfoContext();
  const [options, setOptions] = useState<ISelectOption[] | undefined>();
  const fieldRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: FIELD_REF_ACTIONS.ADD_PROPERTY,
      fieldName: settings.name,
      payload: fieldRef.current,
    });
  }, [fieldRef && fieldRef.current]);

  useEffect(() => {
    //executeCommand("initCommandName", settings, undefined);
    if (settings && settings.selectOptionsReferenceType) {
      setOptions(getReferenceValues(settings.selectOptionsReferenceType));
    }
  }, [countries]);

  //const [optionValues, setOptionValues] = useState<ISelectOption[]>([]);
  const [selectedValue, setSeletedValue] = useState<string>();

  const listLoaded = options && options.length > 0;
  return !listLoaded ? (
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
        className="mt-3"
      >
        <FloatingLabel controlId={settings.name} label={settings.label}>
          <Form.Select
            ref={fieldRef}
            id={settings.name}
            name={settings.name}
            aria-label={settings.label}
            onChange={(e) => {
              onSelectChange(e);
              setSeletedValue(e.target.value);
            }}
            onBlur={(e) => {
              onSelectBlur(e);
              setSeletedValue(e.target.value);
            }}
            value={selectedValue}
          >
            {options &&
              options.map((c: ISelectOption) => (
                <option key={c.name} value={c.value}>
                  {c.name}
                </option>
              ))}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
    </>
  );
}

