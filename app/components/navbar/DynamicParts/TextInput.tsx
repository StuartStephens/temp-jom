import { ChangeEvent, FunctionComponent } from "react";

interface TextInputProps {
  placeholder: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function TextInput({
  placeholder,
  name,
  type = "text",
  value,
  onChange,
  error,
}: TextInputProps) {
  return (
    <div className="mb-4">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
