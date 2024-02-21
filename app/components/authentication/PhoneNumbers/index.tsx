import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { IPhoneNumber } from "../../contexts/Auth/PhoneNumbersTypes";
import { PHONE_NUMBER_FORM } from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import { DisplayPrimaryPhone } from "./DisplayPrimaryPhone";
import { DisplaySecondaryPhone } from "./DisplaySecondaryPhone";
import { EditPhoneNumberWithFormSupport } from "./EditPhoneNumberForm";

export interface IPhoneNumbersProps {}

export function PhoneNumbers(props: IPhoneNumbersProps) {
  const {
    phoneNumbers: phoneNumbers,
    updatePhoneNumber,
    removePhoneNumber,
  } = useAccountInfoContext();
  //   const [emails, setEmails] = useState<IEmailAddress[]>([]);
  const [currentEditPhone, setCurrentEditPhone] = useState<
    string | undefined
  >();
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  function handleEditPhone(phone: IPhoneNumber) {
    setCurrentEditPhone(phone.Id);
  }

  function handleRemovePhone(phone: IPhoneNumber) {
    removePhoneNumber(phone, (phone: IPhoneNumber) => {});
  }

  return (
    <Container fluid className="full-width d-flex flex-column border-bottom">
      {/* {JSON.stringify(phoneNumbers)} */}
      <Container fluid className="full-width mb-2">
        {/* <Row>
              <Col>
                <h2>Contact Information</h2>
              </Col>
            </Row> */}
        <Row>
          <Col>
            <h3>Saved Phone Numbers</h3>
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
                  Add Phone Number
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {phoneNumbers &&
        phoneNumbers
          .filter((phone: IPhoneNumber) => phone.IsPrimary)
          .map((phone: IPhoneNumber) => {
            return <DisplayPrimaryPhone key={phone.Id} phoneNumber={phone} />;
          })}

      {isAddMode && (
        <Container fluid className="full-width ">
          <EditPhoneNumberWithFormSupport
            // key={`ADDXXXX`}
            // emailAddress={
            //   {
            //     Email: "",
            //     DoNotEmail: false,
            //     IsPrimary: false,
            //     Id: undefined,
            //   } as IEmailAddress
            // }
            onCancel={(phone: IPhoneNumber) => {
              setIsAddMode(false);
            }}
            onSaveSuccess={(newPhone: IPhoneNumber) => {
              updatePhoneNumber(newPhone);
            }}
            defaultForm={
              {
                Phone: "",
                IsPrimary: false,
                AllowSMS: false,
                DoNotCall: false,
                IsMobile: false,
                Id: undefined,
              } as IPhoneNumber
            }
            formConfiguration={{ formFields: PHONE_NUMBER_FORM }}
          />
        </Container>
      )}
      {phoneNumbers &&
        phoneNumbers
          .filter((phone: IPhoneNumber) => !phone.IsPrimary)
          .map((phone: IPhoneNumber, index: number) => {
            return (
              <Container fluid className="full-width" key={phone.Id}>
                <DisplaySecondaryPhone
                  phoneNumber={phone}
                  index={index}
                  onToggleEdit={(phone: IPhoneNumber) => {
                    handleEditPhone(phone);
                  }}
                  onRemove={(phone: IPhoneNumber) => {
                    handleRemovePhone(phone);
                  }}
                />
                {currentEditPhone == phone.Id && (
                  <Container fluid className="full-width ">
                    <EditPhoneNumberWithFormSupport
                      // emailAddress={email}
                      onCancel={(phone: IPhoneNumber) => {
                        setCurrentEditPhone(undefined);
                      }}
                      onSaveSuccess={(newPhone: IPhoneNumber) => {
                        setCurrentEditPhone(undefined);
                        updatePhoneNumber(newPhone);
                      }}
                      defaultForm={
                        {
                          Phone: phone.Phone,
                          IsPrimary: phone.IsPrimary,
                          AllowSMS: phone.AllowSMS,
                          DoNotCall: phone.DoNotCall,
                          IsMobile: phone.IsMobile,
                          Id: phone.Id,
                        } as IPhoneNumber
                      }
                      formConfiguration={{
                        formFields: PHONE_NUMBER_FORM,
                      }}
                    />
                  </Container>
                )}
              </Container>
            );
          })}
    </Container>
  );
}
