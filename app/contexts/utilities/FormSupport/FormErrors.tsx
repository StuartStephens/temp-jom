import { Button, Col, Container, Row } from "react-bootstrap";
import { FieldReference, useFormSupportContext } from "./FormSupportContext";
import { FormField } from "./FormSupportTypes";

export interface IFormErrorsProps {}

export function FormErrors(props: IFormErrorsProps) {
  // const { errors } = props;

  const { errors, state } = useFormSupportContext();
  const { fieldRefs, remoteErrorMessage } = state;

  function handleErrorClicked(fieldName: string) {
    const ref: FieldReference | undefined = fieldRefs.find(
      (o: FormField) => o.name == fieldName
    );
    ref?.value && ref?.value.focus();
  }

  if (
    errors &&
    Object.entries(errors).some(
      ([key, value]: [string, any]) =>
        value && value.message && value.message.length > 0
    )
  ) {
    return (
      <Container>
        <Row>
          <Col className="col-12 ">
            <strong className="text-danger">{remoteErrorMessage}</strong>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 fs-6">
            {/* {Object.values(errors)} {Object.values(errors).length} */}
            <div className="pb-5 d-flex flex-column gap-2">
              <strong className="text-danger">
                You must resolve the following errors before proceeding:
              </strong>
              {Object.entries(errors).map(([key, value]: [string, any]) => {
                const messageString: string = value.message; //some error form objects have the message as the value where some keep an entire FormError
                return messageString && messageString !== "" ? (
                  <div key={key}>
                    {fieldRefs &&
                    fieldRefs.find((o: FieldReference) => {
                      return o.name === key;
                    }) ? (
                      <Button
                        className="w-100"
                        variant="outline-danger"
                        onClick={() => {
                          handleErrorClicked(key);
                        }}
                      >
                        <small>{`${messageString}`}</small>
                      </Button>
                    ) : (
                      <small>
                        <a href={`#${key}`}>{`${messageString}`}</a>
                      </small>
                    )}
                    {/* <a href={`#${key}`}>{`${messageString}`}</a> */}
                    {/* <Button
                      onClick={() => {
                        handleErrorClicked(key);
                      }}
                    >{`${messageString}`}</Button> */}
                  </div>
                ) : null;
              })}
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else if (remoteErrorMessage) {
    return (
      <Container className="full-width pt-5" fluid>
        <Row>
          <Col className="col-12 text-danger">
            <h6>There was an error validating the form:</h6>
            <p>
              <strong className="text-danger">{remoteErrorMessage}</strong>
            </p>
          </Col>
        </Row>
      </Container>
    );
  } else return null;
}
