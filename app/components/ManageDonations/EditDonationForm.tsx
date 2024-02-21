import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { IDonation } from "../../contexts/Auth/DonationsTypes";
import {
  IPaymentMethod,
  PAYMENT_METHOD_TYPES,
} from "../../contexts/Auth/PaymentMethodTypes";
import { hasErrors } from "../../contexts/utilities/FormSupport/FSUtils";
import { withFSContextFormSupport } from "../../contexts/utilities/FormSupport/FormSupport";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../contexts/utilities/FormSupport/FormSupportContext";
import {
  FormField,
  VALIDATION_TYPES,
} from "../../contexts/utilities/FormSupport/FormSupportTypes";
import {
  formatDayOfMonth,
  parseCurrency,
} from "../../contexts/utilities/FormatUtils";
import { LoadingSpinner } from "../LoadingSpinner";
import { JOMButtonLink } from "../shared/controls/JOMButtonLink";
import {
  IPaymentMethodDetailsHelper,
  getPaymentMethodDetailsHelper,
} from "./DonationUtils";
import { useChurchInfoContext } from "../../contexts/ChurchInfoContext/ChurchInfoContext";
import { AddPaymentMethodDialog } from "../PaymentInfo/AddPaymentMethodDialog";

export interface IEditDonationFormProps {
  donation: IDonation;
  churchId?: string;
  onCancel: () => void;
  onSave: (EditDonation: IDonation) => void;
}

export interface IEditDonationForm {
  PaymentMethodId: string;
  DayOfCharge: string;
  Amount: string;
}

export const EDIT_DONATION_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "PaymentMethodId",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Church Name is Required",
        // },
      ],
    },
  ],
  [
    "DayOfCharge",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Church Website is Required",
        // },
      ],
    },
  ],
  [
    "Amount",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "A valid EditDonation Amount is required",
        },
      ],
    },
  ],
]);

export function EditDonationForm(props: IEditDonationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [addPaymentMethod, setAddPaymentMethod] = useState<
    string | undefined
  >();
  const token = localStorage.getItem("authToken") || "";
  const { donation, churchId, onCancel, onSave } = props;
  const { churchPaymentMethods } = useChurchInfoContext();
  const { paymentMethods } = useAccountInfoContext();

  //   const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>();
  const {
    form,
    errors,
    handleInputBlur,
    handleSelectBlur,
    handleInputChange,
    handleSelectChange,
  } = useFormSupportContext();
  function resetEditDonationForm() {
    alert("reset edit EditDonation form");
  }

  function handleCancel() {
    onCancel();
  }

  function convertFormToIDonation(): IDonation {
    const editForm: IEditDonationForm = { ...form };
    const recurringGift: IDonation = {
      Id: donation.Id,
      Sourcecode: donation.Sourcecode,
      PaymentReference: donation.PaymentReference,
      Amount: parseCurrency(editForm.Amount),
      DayOfCharge: parseInt(editForm.DayOfCharge),
      DonationProduct: donation.DonationProduct, //not sure of this type
      SubprojectCode: donation.SubprojectCode,
      IsActive: donation.IsActive,
      LastDonationDate: donation.LastDonationDate,
      NextDonationDate: donation.NextDonationDate,
      CurrencySymbol: donation.CurrencySymbol,
      Currency: donation.Currency,
      PaymentMethod: { Id: editForm.PaymentMethodId },
    };
    return recurringGift;
  }

  const saveRecurringGift = (donation: IDonation) => {
    if (!donation) return;
    async function postRecurringGift(donation: IDonation) {
      setIsLoading(true);

      const url = churchId
        ? `/api/v2/Church/RecurringGift/${churchId}`
        : `/api/v2/Contact/RecurringGift`;
      try {
        let headers = new Headers();
        headers.append("Authorization", `${token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(donation),
          headers: headers,
        });
        if (response.ok) {
          const data = await response.json();
          props.onSave(data);
        } else {
          //updateErrorMessage(churchesNotFound);
          throw new Error("ERROR SAVING DONATION");
        }
      } catch (e) {
        throw new Error("UNEXPECTED ERROR WHILE SAVING RECURRING DONATION");
        // error({ code: "CANTFIND", message: "Could not find any position" });
      } finally {
        setIsLoading(false);
      }
    }
    postRecurringGift(donation);
  };

  function handleSave() {
    const saveValue: IDonation = convertFormToIDonation();
    saveRecurringGift(saveValue);
  }

  function handleHideAddPaymentDialog() {
    setAddPaymentMethod(undefined);
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Form>
      <AddPaymentMethodDialog
        type={addPaymentMethod}
        show={addPaymentMethod !== undefined}
        title="Add Payment Method"
        onHide={handleHideAddPaymentDialog}
        // onConfirm={handleConfirmAddPaymentMethod}
      />
      <Container fluid className="full-width">
        <Row>
          <Form.Group as={Col} xs={12} md={6} className=" mt-4">
            <FloatingLabel controlId="PaymentMethodId" label="Payment Method">
              <Form.Select
                id="PaymentMethodId"
                aria-label="Payment Method"
                value={form?.PaymentMethodId || ""}
                name="PaymentMethodId"
                onChange={handleSelectChange}
                onBlur={handleSelectBlur}
              >
                {!!churchPaymentMethods &&
                  churchPaymentMethods.map((pm: IPaymentMethod) => {
                    const pmHelper: IPaymentMethodDetailsHelper =
                      getPaymentMethodDetailsHelper(pm);
                    return (
                      <option key={`${donation.Id}__${pm.Id}`} value={pm.Id}>
                        {pmHelper.summary}
                      </option>
                    );
                  })}
                {!churchPaymentMethods &&
                  !!paymentMethods &&
                  paymentMethods.map((pm: IPaymentMethod) => {
                    const pmHelper: IPaymentMethodDetailsHelper =
                      getPaymentMethodDetailsHelper(pm);
                    return (
                      <option key={pm.Id} value={pm.Id}>
                        {pmHelper.summary}
                      </option>
                    );
                  })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors?.PaymentMethodId?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} xs={12} md={3} className=" mt-4">
            <FloatingLabel controlId="DayOfCharge" label="Donation Date">
              <Form.Select
                id="DayOfCharge"
                aria-label="Donation Date"
                value={form?.DayOfCharge || ""}
                name="DayOfCharge"
                onChange={handleSelectChange}
                onBlur={handleSelectBlur}
              >
                {(() => {
                  let td = [];
                  for (let i = 1; i <= 28; i++) {
                    td.push(
                      <option key={i} value={i}>
                        {formatDayOfMonth(i)}
                      </option>
                    );
                  }
                  return td;
                })()}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors?.DayOfCharge?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} xs={12} md={3} className="mt-4">
            <FloatingLabel controlId="Amount" label="Donation Amount">
              <Form.Control
                type="text"
                placeholder="Donation Amount"
                name="Amount"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={form?.Amount || ""}
                isInvalid={hasErrors(errors, errors?.Amount)}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.Amount?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Col xs={12} md={6}>
            <Container className=" ">
              {addPaymentMethod}
              <JOMButtonLink
                href="#"
                onClick={() => {
                  //alert("show form for adding a credit card");
                  setAddPaymentMethod("CREDIT_CARD");
                }}
              >
                <small className="text-nowrap">
                  Add Credit Card&nbsp;
                  <i className="bi bi-chevron-right" />
                </small>
              </JOMButtonLink>
              <JOMButtonLink
                href="#"
                onClick={() => {
                  // alert("show form for adding a credit card");
                  setAddPaymentMethod("BANK_ACCOUNT");
                }}
              >
                <small className="text-nowrap">
                  Add Bank Account&nbsp;
                  <i className="bi bi-chevron-right" />
                </small>
              </JOMButtonLink>
            </Container>
          </Col>
          <Col xs={12} md={3}>
            <Button
              className="w-100"
              variant="outline-primary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>
          <Col xs={12} md={3}>
            <Button className="w-100" variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

type EditDonationFSProps = IEditDonationFormProps & IFSContextInitializer;

export function EditDonationWithFormSupport(props: EditDonationFSProps) {
  const AddEditDonation = withFSContextFormSupport(EditDonationForm);
  return <AddEditDonation {...props}></AddEditDonation>;
}
