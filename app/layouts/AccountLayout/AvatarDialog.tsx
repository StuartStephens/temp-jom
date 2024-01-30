import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/Auth/Context";

export interface IAvatarDialogProps {}

export function AvatarDialog(props: IAvatarDialogProps) {
  const { emailHash } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function openGravitar() {
    window.open(
      `http://gravatar.com/${emailHash}`,
      "_blank",
      "noopener, noreferrer"
    );
  }
  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Edit Profile Picture
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            YOU ARE NOW BEING REDIRECTED TO GRAVATAR.COM
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`To update your profile picture, you must upload your photo and create an account at gravatar.com. Select Ok to be sent to Gravatar.`}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              window.location.href = `http://gravatar.com/${emailHash}`;
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
