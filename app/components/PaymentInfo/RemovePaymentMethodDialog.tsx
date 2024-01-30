import { Button, Modal } from "react-bootstrap";
// import { IPaymentMethod } from "../../apis/Account/PaymentMethodTypes";

export interface IRemovePaymentMethodDialogProps {
  type?: string;
  idToDelete?: string;
  onCancel: (id: string) => void;
  onConfirm: (id: string) => void;
  show: boolean;
  title: string;
  message: string;
}

export function RemovePaymentMethodDialog(
  props: IRemovePaymentMethodDialogProps
) {
  return !props.idToDelete || !props.type ? null : (
    <Modal
      show={props.show}
      onHide={() => {
        props.idToDelete && props.onCancel(props.idToDelete);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
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
