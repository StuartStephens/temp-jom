"use client";
import { MouseEvent, useState } from "react";
import { Form } from "react-bootstrap";

export interface IFacetCheckboxProps {
  topic: string;
  onFacetChecked: (topic: string, value: boolean) => void;
}

export function FacetCheckbox(props: IFacetCheckboxProps) {
  const { topic, onFacetChecked } = props;
  const [checked, setChecked] = useState(false);

  function handleCheckboxChanged(e: MouseEvent<HTMLInputElement>) {
    setChecked(e.currentTarget.checked);
    onFacetChecked(topic, e.currentTarget.checked);
  }

  return (
    <Form.Check
      className="facet-checkbox"
      key={`topic_${topic}`}
      inline
      label={`${topic}`}
      name={topic}
      checked={checked}
      type="checkbox"
      onClick={handleCheckboxChanged}
    />
  );
}
