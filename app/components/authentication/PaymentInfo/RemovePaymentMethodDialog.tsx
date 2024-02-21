import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCMColorModeProviderContext } from "../../contexts/ColorModeContext/CMColorModeContext";

export interface IRemovePaymentMethodDialogProps {
  type?: string;
  idToDelete?: string;
  onCancel: (id: string) => void;
  onConfirm: (id: string) => void;
  show: boolean;
}

export function RemovePaymentMethodDialog(
  props: IRemovePaymentMethodDialogProps
) {
  const { currentColorMode } = useCMColorModeProviderContext();
  const [title, setTitle] = useState(
    props?.type === "CreditCard" ? "Remove Credit Card" : "Remove Bank Account"
  );
  const [message, setMessage] = useState(
    props?.type === "CreditCard"
      ? "Are you sure you want to remove this Credit Card?"
      : "Are you sure you want to remove this Bank Accunt?"
  );

  useEffect(() => {
    switch (props.type) {
      case "CreditCard":
        setTitle("Remove Credit Card");
        setMessage("Are you sure you want to remove this Credit Card?");
        break;
      case "BankAccount":
        setTitle("Remove Bank Account");
        setMessage("Are you sure you want to remove this Bank Account?");
        break;
    }
  }, [props.type]);

  return !props.idToDelete || !props.type ? null : (
    <Modal
      size="lg"
      aria-labelledby="RemovePaymentMethodDialogTitle"
      centered
      data-bs-theme={currentColorMode}
      show={props.show}
      onHide={() => {
        props.idToDelete && props.onCancel(props.idToDelete);
      }}
    >
      <Modal.Header
        closeVariant="white"
        closeButton
        className=" bg-dark text-white"
      >
        <Modal.Title id="RemovePaymentMethodDialogTitle">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => {
            props.idToDelete && props.onCancel(props.idToDelete);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.idToDelete && props.onConfirm(props.idToDelete);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
