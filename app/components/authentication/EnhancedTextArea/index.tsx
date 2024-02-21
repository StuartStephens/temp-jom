import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useFormSupportContext } from "../../../app/contexts/utilities/FormSupport/FormSupportContext";
import { hasErrors } from "../../../app/contexts/utilities/FormSupport/FSUtils";

export interface IEnhancedTextAreaProps {
  controlId: string;
  maxCount?: number;
  initialRowsVisible?: number;
  required?: boolean;
  fieldLabel?: string;
  value?: string;
  onMessageChanged: (e: ChangeEvent<HTMLInputElement>, message: string) => void;
  onFieldBlurred?: (e: FocusEvent<HTMLInputElement>, message: string) => void;
}

export function EnhancedTextArea({
  controlId,
  maxCount = 200,
  initialRowsVisible = 6,
  required = true,
  fieldLabel = "Message",
  onMessageChanged,
  onFieldBlurred,
  value = "",
}: IEnhancedTextAreaProps) {
  const [textareaLabel, setTextareaLabel] = useState<string>(
    fieldLabel + " (" + maxCount + " remaining)"
  );
  const [textAreaLabelClassName, setTextAreaLabelClassName] =
    useState<string>("");
  const [message, setMessage] = useState<string>(value);
  const { errors } = useFormSupportContext();

  useEffect(() => {
    const charsRemaining: number = maxCount - message.trim().length;
    setTextareaLabel(fieldLabel + " (" + charsRemaining + " remaining)");
    if (charsRemaining < 20) {
      if (charsRemaining < 1) {
        setTextAreaLabelClassName("count-at-limit");
      } else {
        setTextAreaLabelClassName("count-approaching-limit");
      }
    } else {
      setTextAreaLabelClassName("");
    }
  }, [message]);

  useEffect(() => {
    setMessage(value);
  }, [value]);

  function handleMessageChanged(e: ChangeEvent<HTMLInputElement>) {
    const newMessage = e.target.value.slice(0, maxCount);
    setMessage(newMessage);
    onMessageChanged(e, newMessage);
  }
  function handleFieldBlurred(e: FocusEvent<HTMLInputElement>) {
    if (onFieldBlurred) {
      const newMessage = e.target.value.slice(0, maxCount);
      setMessage(newMessage);
      onFieldBlurred(e, newMessage);
    }
  }

  return (
    <FloatingLabel
      controlId={controlId}
      label={textareaLabel}
      className={`enhanced-text-area mb-3 ${textAreaLabelClassName}`}
    >
      <Form.Control
        as="textarea"
        className="w-100"
        name={controlId}
        rows={initialRowsVisible}
        value={message}
        required={true}
        onChange={handleMessageChanged}
        onBlur={handleFieldBlurred}
        isInvalid={hasErrors(errors, errors && errors[controlId])}
      />
      <Form.Control.Feedback type="invalid">
        {errors && errors[controlId] && errors[controlId]?.message}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}
