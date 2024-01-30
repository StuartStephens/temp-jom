"use client";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IContactInformation } from "../../../../../contexts/Auth/AccountTypes";
import { useAuth } from "../../../../../contexts/Auth/Context";
import { formatDateForPicker } from "../../../../../contexts/utilities/FormSupport/FSUtils";
import { BASIC_INFORMATION } from "../../../../../contexts/utilities/FormSupport/FormFieldPropConstants";
import { BasicInfoWithFormSupport, IBasicInfoForm } from "./BasicInfoEditMode";
import { BasicInfoViewMode, GENDER } from "./BasicInfoViewMode";

export interface IBasicInformationProps { }
export function getGender(gender: number | undefined) {
  if (!gender) return GENDER.UNSPECIFIED;
  if (gender == 1) {
    return GENDER.MALE;
  } else if (gender == 2) {
    return GENDER.FEMALE;
  } else {
    return GENDER.UNSPECIFIED;
  }
}

export function BasicInformation(props: IBasicInformationProps) {
  const { contactInfo } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const dummydata = {
  //     firstName: "Billy",
  //     lastName: "The Kid",
  //     dateOfBirth: "10/31/2000",
  //     gender: GENDER.UNSPECIFIED,
  //   } as IBasicInfo;

  //   const { FirstName, LastName, Birthdate, Gender } = contactInfo;

  return (
    <Container fluid className="full-width">
      <Container fluid className="full-width">
        <Row>
          <Col xs={12} md={8}>
            <h2>Basic Information</h2>
          </Col>
          <Col xs={12} md={4}>
            {!editMode && (
              <Button
                variant="outline-primary"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      {editMode ? (
        <BasicInfoWithFormSupport
          defaultForm={
            {
              firstName: contactInfo?.FirstName,
              lastName: contactInfo?.LastName,
              dateOfBirth: formatDateForPicker(contactInfo?.BirthDate),
              gender: getGender(contactInfo?.Gender),
            } as IBasicInfoForm
          }
          formConfiguration={{ formFields: BASIC_INFORMATION }}
          onSave={(formData: IContactInformation) => {
            setEditMode(false);
          }}
          onCancel={(formData: IContactInformation) => {
            setEditMode(false);
          }}
        />
      ) : (
        <BasicInfoViewMode
          firstName={contactInfo?.FirstName || ""}
          lastName={contactInfo?.LastName || ""}
          dateOfBirth={formatDateForPicker(contactInfo?.BirthDate)}
          gender={getGender(contactInfo?.Gender)}
        />
      )}
    </Container>
  );
}
