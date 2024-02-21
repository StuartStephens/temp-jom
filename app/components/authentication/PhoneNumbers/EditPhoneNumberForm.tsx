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
import { IPhoneNumber } from "../../contexts/Auth/PhoneNumbersTypes";
import {
  deepCopy,
  hasErrors,
} from "../../contexts/utilities/FormSupport/FSUtils";
import { FormErrors } from "../../contexts/utilities/FormSupport/FormErrors";
import { withFSContextFormSupport } from "../../contexts/utilities/FormSupport/FormSupport";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../contexts/utilities/FormSupport/FormSupportContext";
import { LoadingSpinner } from "../LoadingSpinner";

export interface IEditPhoneNumberFormProps {
  onSaveSuccess: (phone: IPhoneNumber) => void;
  onCancel: (phone: IPhoneNumber) => void;
}

export function EditPhoneNumberForm(props: IEditPhoneNumberFormProps) {
  const {
    handleInputBlur,
    handleInputChange,
    validateLocally,
    form,
    resetForm,
    errors,
  } = useFormSupportContext();
  const { updatePhoneNumber } = useAccountInfoContext();
  const { onSaveSuccess, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);
  // const [originalData, setOriginalData] = useState<IPhoneNumber>();

  function handleCancel() {
    resetForm();
    if (form) {
      props.onCancel(form);
    }
  }

  function postForm() {
    setIsLoading(true);
    const newVal: IPhoneNumber = deepCopy(form);
    updatePhoneNumber(newVal, (PhoneNumber: IPhoneNumber) => {
      setIsLoading(false);
      handleCancel();
    });
    // setOriginalData(deepCopy(PhoneNumber));
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Form noValidate>
      {/* {JSON.stringify(form)} */}
      <Container fluid className="full-width mb-3">
        <Row>
          <Form.Group as={Col} className="col-12 col-md-8 ">
            <FloatingLabel
              controlId={`EDIT PhoneNumber_${form.Id}`}
              label="Phone Number (e.x. 555-555-5555)"
            >
              <Form.Control
                // ref={PhoneNumber}
                type="tel" //there is an issue using PhoneNumber in react, it populates the value with wrong values
                placeholder="e.x. 555-555-5555"
                name="Phone"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={form?.Phone || ""}
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                // defaultValue={""}
                isInvalid={hasErrors(errors, errors?.Phone)}
                // required={true}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrors(errors, errors?.Phone)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Col xs={12} md={4}>
            <div className="h-100 button-row d-flex flex-row gap-2 justify-content-start align-items-center">
              <Button variant="outline-primary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // handleSubmit(formSubmitProvider, formSubmitSuccessProvider);
                  if (validateLocally()) {
                    postForm();
                  }
                }}
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
        {errors && Object.values(errors).filter((o) => !!o).length > 0 && (
          <Row>
            <Col className="col-12 ">
              <FormErrors />
            </Col>
          </Row>
        )}
      </Container>
    </Form>
  );
}

type EditPhoneNumberFSProps = IEditPhoneNumberFormProps & IFSContextInitializer;

export function EditPhoneNumberWithFormSupport(props: EditPhoneNumberFSProps) {
  const AddEditPhoneNumber = withFSContextFormSupport(EditPhoneNumberForm);
  return <AddEditPhoneNumber {...props}></AddEditPhoneNumber>;
}
