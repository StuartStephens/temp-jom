import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
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
import { IEmailAddress } from "../../contexts/Auth/EmailAddressTypes";

export interface IEditEmailFormProps {
  onSaveSuccess: (email: IEmailAddress) => void;
  onCancel: (email: IEmailAddress) => void;
}

export function EditEmailForm(props: IEditEmailFormProps) {
  const {
    handleInputBlur,
    handleInputChange,
    validateLocally,
    form,
    resetForm,
    errors,
  } = useFormSupportContext();
  const { updateEmailAddress } = useAccountInfoContext();
  const { onSaveSuccess, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);
  // const [originalData, setOriginalData] = useState<IEmailAddress>();

  function handleCancel() {
    resetForm();
    if (form) {
      props.onCancel(form);
    }
  }

  function postForm() {
    setIsLoading(true);
    const newVal: IEmailAddress = deepCopy(form);
    updateEmailAddress(newVal, (email: IEmailAddress) => {
      setIsLoading(false);
      handleCancel();
    });
    // setOriginalData(deepCopy(emailAddress));
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Form noValidate>
      <Container fluid className="full-width mb-3">
        <Row>
          <Form.Group as={Col} className="col-12 col-md-8 ">
            <FloatingLabel
              controlId={`EDIT EMAIL_${form.Id}`}
              label="Email Address"
            >
              <Form.Control
                // ref={emailAddress}
                type="text" //there is an issue using email in react, it populates the value with wrong values
                placeholder="yourname@domain.com"
                name="Email"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={form?.Email || ""}
                // defaultValue={""}
                isInvalid={hasErrors(errors, errors?.Email)}
                // required={true}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrors(errors, errors?.Email)}
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

type EditEmailFSProps = IEditEmailFormProps & IFSContextInitializer;

export function EditEmailWithFormSupport(props: EditEmailFSProps) {
  const AddEditEmail = withFSContextFormSupport(EditEmailForm);
  return <AddEditEmail {...props}></AddEditEmail>;
}
