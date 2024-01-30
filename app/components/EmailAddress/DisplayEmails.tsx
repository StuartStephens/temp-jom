import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IEmailAddress } from "../../contexts/Auth/EmailAddressTypes";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { EMAIL_ADDRESS_FORM } from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import { DisplayEmail } from "./DisplayEmail";
import { DisplayPrimaryEmail } from "./DisplayPrimaryEmail";
import { EditEmailWithFormSupport } from "./EditEmailForm";

export interface IDisplayEmailsProps { }

export function DisplayEmails(props: IDisplayEmailsProps) {
  const {
    emailAddresses: emails,
    updateEmailAddress,
    removeEmailAddress,
  } = useAccountInfoContext();
  //   const [emails, setEmails] = useState<IEmailAddress[]>([]);
  const [currentEditEmailId, setCurrentEditEmailId] = useState<
    string | undefined
  >();
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  function handleEditEmail(email: IEmailAddress) {
    setCurrentEditEmailId(email.Id);
  }

  function handleRemoveEmail(email: IEmailAddress) {
    removeEmailAddress(email, (email: IEmailAddress) => { });
  }

  return (
    <Container fluid className="full-width d-flex flex-column border-bottom ">
      <Container fluid className="full-width mb-2">
        <Row>
          <Col>
            <h3>Saved Email Addresses</h3>
          </Col>
          <Col xs={12} md={4}>
            {isAddMode ? null : (
              <div className="h-100 button-row d-flex flex-row gap-2 justify-content-end align-items-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    // handleSubmit(formSubmitProvider, formSubmitSuccessProvider);
                    setIsAddMode(true);
                  }}
                >
                  Add Email Address
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {emails &&
        emails
          .filter((email: IEmailAddress) => email.IsPrimary)
          .map((email: IEmailAddress) => {
            return <DisplayPrimaryEmail key={email.Id} emailAddress={email} />;
          })}

      {isAddMode && (
        <Container fluid className="full-width ">
          <EditEmailWithFormSupport
            // key={`ADDXXXX`}
            // emailAddress={
            //   {
            //     Email: "",
            //     DoNotEmail: false,
            //     IsPrimary: false,
            //     Id: undefined,
            //   } as IEmailAddress
            // }
            onCancel={(email: IEmailAddress) => {
              setIsAddMode(false);
            }}
            onSaveSuccess={(newEmail: IEmailAddress) => {
              updateEmailAddress(newEmail);
            }}
            defaultForm={{
              Email: "",
              IsPrimary: false,
              Id: undefined,
              DoNotEmail: false,
            }}
            formConfiguration={{ formFields: EMAIL_ADDRESS_FORM }}
          />
        </Container>
      )}
      {emails &&
        emails
          .filter((email: IEmailAddress) => !email.IsPrimary)
          .map((email: IEmailAddress, index: number) => {
            return (
              <Container fluid className="full-width" key={email.Id}>
                <DisplayEmail
                  emailAddress={email}
                  index={index}
                  onToggleEdit={(email) => {
                    handleEditEmail(email);
                  }}
                  onRemove={(email) => {
                    handleRemoveEmail(email);
                  }}
                />
                {currentEditEmailId == email.Id && (
                  <Container fluid className="full-width ">
                    <EditEmailWithFormSupport
                      // emailAddress={email}
                      onCancel={(email: IEmailAddress) => {
                        setCurrentEditEmailId(undefined);
                      }}
                      onSaveSuccess={(newEmail: IEmailAddress) => {
                        setCurrentEditEmailId(undefined);
                        updateEmailAddress(newEmail);
                      }}
                      defaultForm={
                        {
                          Email: email.Email,
                          IsPrimary: email.IsPrimary,
                          Id: email.Id,
                          DoNotEmail: email.DoNotEmail,
                        } as IEmailAddress
                      }
                      formConfiguration={{ formFields: EMAIL_ADDRESS_FORM }}
                    />
                  </Container>
                )}
              </Container>
            );
          })}
    </Container>
  );
}
