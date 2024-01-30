import { ChangeEvent, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

export interface IEnhancedTextAreaProps {
  controlId: string;
  maxCount?: number;
  initialRowsVisible?: number;
  required?: boolean;
  fieldLabel?: string;
  onMessageChanged: (message: string) => void;
}

export function EnhancedTextArea({
  controlId,
  maxCount = 200,
  initialRowsVisible = 6,
  required = true,
  fieldLabel = "Message",
  onMessageChanged,
}: IEnhancedTextAreaProps) {
  const [textareaLabel, setTextareaLabel] = useState<string>(
    fieldLabel + " (" + maxCount + " remaining)"
  );
  const [textAreaLabelClassName, setTextAreaLabelClassName] =
    useState<string>("");
  const [message, setMessage] = useState<string>("");

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

    onMessageChanged(message);
  }, [message]);

  function handleMessageChanged(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value.slice(0, maxCount));
  }

  return (
    <FloatingLabel
      controlId={controlId}
      label={textareaLabel}
      className={`enhanced-text-area mb-3 ${textAreaLabelClassName}`}
    >
      <Form.Control
        as="textarea"
        rows={initialRowsVisible}
        value={message}
        required={true}
        onChange={handleMessageChanged}
      />
    </FloatingLabel>
  );
}
