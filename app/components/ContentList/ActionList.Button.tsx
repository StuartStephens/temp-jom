import { MouseEvent, ReactNode, forwardRef, useRef, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

export type ActionListAction = {
  name: string;
  text: string;
  cargo: any;
  onAction: (action: ActionListAction, messageID: string) => void;
};

export interface IActionListButtonProps {
  buttonText?: string;
  leftButtonIconClass?: string;
  rightButtonIconClass?: string;
  variant?: string;
  actions: ActionListAction[];
}

export function ActionListButton({
  buttonText = "FLAG",
  leftButtonIconClass,
  rightButtonIconClass,
  variant = "link",
  actions,
}: IActionListButtonProps) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<any>(null);
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <Dropdown>
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components"
          className="text-primary"
          variant={variant}
        >
          {leftButtonIconClass && (
            <i className={`bi ${leftButtonIconClass} text-muted pe-2`} />
          )}
          {buttonText && <span>{buttonText}</span>}

          {rightButtonIconClass && (
            <i className={`bi ${rightButtonIconClass} text-muted ps-2`} />
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {actions &&
            actions.map((action: ActionListAction, index: number) => (
              <Dropdown.Item
                key={`Action_${action.name}`}
                eventKey="1"
                onClick={() => action.onAction(action, action.cargo as string)}
              >
                {action.text}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

interface CustomToggleProps {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
}
const CustomToggle = forwardRef<HTMLButtonElement, CustomToggleProps>(
  ({ children, onClick, variant = "link" }, ref) => (
    <Button
      className="text-muted"
      ref={ref}
      variant={variant}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  )
);
CustomToggle.displayName = "CustomToggle";
