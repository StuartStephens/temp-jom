import { Container, Modal } from "react-bootstrap";
import {
  AddChurchServiceWithFormSupport,
  IAddEditChurchServiceForm,
} from "../../(main-pages)/manage-account/church-info/general-information/components/AddChurchServiceForm";
import { useAccountInfoContext } from "../AccountInformationContext/AccountInformationContext";
import { useCMColorModeProviderContext } from "../ColorModeContext/CMColorModeContext";
import { ADD_EDIT_CHURCH_SERVICE_FORM, FORM_MODE } from "./ChurchInfoTypes";
import { useChurchInfoContext } from "./ChurchInfoContext";

export interface IAddEditChurchServiceDialogProps {
  mode?: FORM_MODE; //creditcard or
  show: boolean;
  title: string;
  onHide: () => void;
}

export function AddEditChurchServiceDialog(
  props: IAddEditChurchServiceDialogProps
) {
  const { mode, show, onHide } = props;
  const { updatePaymentMethods } = useAccountInfoContext();
  const { selectedChurch, editingChurchService } = useChurchInfoContext();
  const { currentColorMode } = useCMColorModeProviderContext();

  // function save() {
  //   const paymentMethod = convertBankAccountFormToPaymentMethod({ ...form });
  //   addNewPaymentMethod(paymentMethod);
  // }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme={currentColorMode}
    >
      <Modal.Header
        closeVariant="white"
        closeButton
        className=" bg-dark text-white"
      >
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Container fluid className="p-3">
          {FORM_MODE.ADD == mode && (
            <AddChurchServiceWithFormSupport
              defaultForm={
                {
                  ChurchId: selectedChurch?.Id || "",
                  ServiceId: undefined,
                  Day: "Sunday",
                  Description: "",
                  Hour: "1",
                  Minute: "0",
                  Meridium: "AM",
                } as IAddEditChurchServiceForm
              }
              formConfiguration={{ formFields: ADD_EDIT_CHURCH_SERVICE_FORM }}
              mode={FORM_MODE.ADD}
              onCancel={() => {
                //setIsAddingChurchService(false);
                onHide();
                alert("ADD MODE  Add service cancelled");
              }}
              onSaveSuccess={() => {
                //setIsAddingChurchService(false);
                onHide();
                alert("ADD MODE Add service on save success");
              }}
            />
          )}
          {FORM_MODE.EDIT == mode && (
            <AddChurchServiceWithFormSupport
              defaultForm={
                {
                  ChurchId: selectedChurch?.Id || "",
                  ServiceId: editingChurchService?.Id,
                  Day: "Sunday",
                  Description: "",
                  Hour: "1",
                  Minute: "0",
                  Meridium: "AM",
                } as IAddEditChurchServiceForm
              }
              formConfiguration={{ formFields: ADD_EDIT_CHURCH_SERVICE_FORM }}
              mode={FORM_MODE.EDIT}
              onCancel={() => {
                //setEditingChurchService(undefined);
                onHide();
                alert("EDIT MODE Edit service cancelled");
              }}
              onSaveSuccess={() => {
                //setEditingChurchService(undefined);
                onHide();
                alert("EDIT MODE Edit service on save success");
              }}
            />
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}
