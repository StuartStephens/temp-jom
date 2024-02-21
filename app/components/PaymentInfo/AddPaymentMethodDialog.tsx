import { useState } from "react";
import { Container, Modal, Tab, Tabs } from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../contexts/Auth/Context";
import {
  CHANGE_PASSWORD_FORM,
  CHECKING_FORM,
} from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import { FORM_MODE } from "../AddressForm";
import {
  BankAccountWithFormSupport,
  IBankAccountForm,
} from "./BankAccountForm";
import { CCWithFormSupport, ICreditCardForm } from "./CreditCardForm";
import { useCMColorModeProviderContext } from "../../contexts/ColorModeContext/CMColorModeContext";

export interface IAddPaymentMethodDialogProps {
  type?: string; //creditcard or
  show: boolean;
  title: string;
  onHide: () => void;
}

export function AddPaymentMethodDialog(props: IAddPaymentMethodDialogProps) {
  const { type, show, onHide } = props;
  const [paymentType, setPaymentType] = useState(type);
  const { updatePaymentMethods } = useAccountInfoContext();
  const { refreshContactInformation } = useAuth();
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
        <>
          <Tabs
            defaultActiveKey={type || "CREDIT_CARD"}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="CREDIT_CARD" title="Credit Card">
              <Container fluid className="full-width p-3">
                <CCWithFormSupport
                  defaultForm={
                    {
                      cardNumber: "",
                      nameOnCard: "",
                      expirationDate: "01/23", //formatDateForPicker(), //new Date().toISOString().split("T")[0],
                      securityCode: "",
                      cardType: "",
                    } as ICreditCardForm
                  }
                  formConfiguration={{ formFields: CHANGE_PASSWORD_FORM }}
                  mode={FORM_MODE.ADD}
                  onSaveSuccess={() => {
                    updatePaymentMethods();
                    onHide();
                  }}
                  onCancel={onHide}
                />
              </Container>
            </Tab>
            <Tab eventKey="BANK_ACCOUNT" title="Bank Account">
              <Container fluid className="full-width p-3">
                <BankAccountWithFormSupport
                  defaultForm={
                    {
                      acctID: "",
                      bankName: "",
                      accountType: "Checking",
                      routingNumber: "",
                    } as IBankAccountForm
                  }
                  formConfiguration={{ formFields: CHECKING_FORM }}
                  mode={FORM_MODE.ADD}
                  // onSaveSuccess={(returnedData: IPaymentMethod) => {
                  //   // handleAddBankAccount(returnedData);
                  //   // setIsAddBankAcctMode(false);
                  //   //alert("save not implement");
                  // }}
                  // onCancel={() => {
                  //   // setIsAddBankAcctMode(false);
                  // }}
                  onSaveSuccess={() => {
                    updatePaymentMethods();
                    onHide();
                  }}
                  onCancel={onHide}
                />
              </Container>
            </Tab>
            <Tab eventKey="OTHER" title="Other" disabled>
              <Container fluid className="full-width p-3">
                Tab content for Other types
              </Container>
            </Tab>
          </Tabs>
        </>
      </Modal.Body>
    </Modal>
  );
}
