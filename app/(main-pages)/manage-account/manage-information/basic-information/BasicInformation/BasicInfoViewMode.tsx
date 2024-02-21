import { Col, Container, Row } from "react-bootstrap";
import { IBasicInfoForm } from "./BasicInfoEditMode";
import { formatDateForPicker } from "../../../../../contexts/utilities/FormSupport/FSUtils";

export interface IBasicInfoViewModeProps {}

export enum GENDER {
  UNSPECIFIED = "Unspecified",
  MALE = "Male",
  FEMALE = "Female",
}

// export interface IBasicInfo {
//   firstName: string;
//   lastName: string;
//   dateO: string;
//   gender?: GENDER;
// }

export function BasicInfoViewMode(
  props: IBasicInfoForm & IBasicInfoViewModeProps
) {
  const { firstName, lastName, gender, dateOfBirth } = props;
  return (
    <Container fluid className="full-width">
      <Container fluid className="full-width">
        <Row>
          <Col xs={12} md={4}>
            <strong>Name:</strong>
          </Col>
          <Col xs={12} md={8}>
            {firstName} {lastName}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            Help us get to know you so that we can better serve you. (optional)
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <strong>When were you born?:</strong>
          </Col>
          <Col xs={12} md={8}>
            {formatDateForPicker(dateOfBirth)}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <strong>What is your Gender?:</strong>
          </Col>
          <Col xs={12} md={8}>
            {"" + gender}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
