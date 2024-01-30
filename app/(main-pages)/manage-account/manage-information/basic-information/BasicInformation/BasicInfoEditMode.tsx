import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { IContactInformation } from "../../../../../contexts/Auth/AccountTypes";
import { useAccountInfoContext } from "../../../../../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../../../../contexts/Auth/Context";
import {
  deepCopy,
  hasErrors,
} from "../../../../../contexts/utilities/FormSupport/FSUtils";
import { withFSContextFormSupport } from "../../../../../contexts/utilities/FormSupport/FormSupport";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../../../../contexts/utilities/FormSupport/FormSupportContext";
import { GENDER } from "./BasicInfoViewMode";

export interface IBasicInfoForm {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: GENDER;
}

export interface IBasicInfoEditModeProps {
  onCancel: (data: IContactInformation) => void;
  onSave: (data: IContactInformation) => void;
}

export function BasicInfoEditMode(props: IBasicInfoEditModeProps) {
  const { updateContactInfo } = useAccountInfoContext();
  const { contactInfo } = useAuth();
  const { onCancel, onSave } = props;
  const {
    form,
    errors,
    resetForm,
    handleInputBlur,
    handleInputChange,
    handleSelectChange,
    handleSelectBlur,
    validateLocally,
    setIsLoading,
  } = useFormSupportContext();

  function handleCancel() {
    resetForm();
    onCancel(form);
  }

  function postForm() {
    // alert("SAVING FORM" + JSON.stringify(form));
    const payload: IContactInformation | undefined = convertFormToContactInfo();
    if (payload) {
      setIsLoading(true);
      updateContactInfo(payload, () => {
        setIsLoading(false);
        onSave(form);
      });
    }
  }

  function getGenderByText(gender: GENDER): number {
    switch (gender) {
      case "" + GENDER.MALE:
        return 1;
      case "" + GENDER.FEMALE:
        return 2;
      case "" + GENDER.UNSPECIFIED:
        return 3;
      default:
        return 3;
    }
  }

  function convertFormToContactInfo() {
    const formCopy: IBasicInfoForm = deepCopy(form);
    const payload: IContactInformation | undefined = contactInfo && {
      ...contactInfo,
      ...{
        FirstName: formCopy.firstName || "",
        LastName: formCopy.lastName || "",
        BirthDate: formCopy?.dateOfBirth
          ? new Date(formCopy.dateOfBirth).toISOString()
          : "",
        Gender: getGenderByText(formCopy.gender || GENDER.UNSPECIFIED),
      },
    };
    return payload;

    // {
    //     "Id": "3302a646-1536-ee11-bdf4-000d3a190fe1",
    //     "Acno": "C011006381",
    //     "IsLoggedIn": true,
    //     "DoNotEmail": false,
    //     "DoNotPostalMail": false,
    //     "Address": {
    //       "Id": "b8063c8c-6264-4fec-aee0-238d9a8718f5",
    //       "FirstName": "Don",
    //       "LastName": "Test",
    //       "IsPrimary": true,
    //       "IsDefaultBilling": false,
    //       "IsDefaultShipping": false,
    //       "City": "INDIAN TRAIL",
    //       "State": "(U.S.) Virgin Islands",
    //       "Country": "UNITED STATES",
    //       "PostalCode": "28079",
    //       "Line1": "5507 Fulton Ridge Drive",
    //       "Line2": "Suite 4"
    //     },
    //     "PrimaryEmailAddress": "ven-dobrien@lakewood.cc",
    //     "FirstName": "Don",
    //     "LastName": "Test",
    //     "FullName": "Don Test",
    //     "PhoneNumber": null,
    //     "Gender": "2",
    //     "GenderText": "Female",
    //     "BirthDate": "1969-12-31T00:00:00"
    //   }
  }

  return (
    <Container fluid className="full-width">
      <Form>
        <Container fluid className="full-width">
          <Row>
            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="firstName" label="First Name">
                <Form.Control
                  //   ref={firstName}
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.firstName || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.firstName)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {hasErrors(errors, errors?.firstName) &&
                    errors?.firstName?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="lastName" label="Last Name">
                <Form.Control
                  //   ref={firstName}
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.lastName || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.lastName)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {hasErrors(errors, errors?.lastName) &&
                    errors?.lastName?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="dateOfBirth" label="Date of Birth">
                <Form.Control
                  //   ref={firstName}
                  type="date"
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.dateOfBirth || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.dateOfBirth)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {hasErrors(errors, errors?.dateOfBirth) &&
                    errors?.dateOfBirth?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="col-12 col-md-6 mt-3">
              <FloatingLabel controlId="gender" label="Gender">
                <Form.Select
                  id="gender"
                  name="gender"
                  aria-label="Select Gender"
                  onChange={(e) => {
                    handleSelectChange(e);
                  }}
                  onBlur={handleSelectBlur}
                  value={form?.gender || GENDER.UNSPECIFIED}
                // defaultValue={countries && countries[0].Iso3Code}
                >
                  {Object.entries(GENDER).map(([key, value]: [string, any]) => {
                    return (
                      <option
                        key={key}
                        value={value}
                      // selected={c.Iso2Code === "USA"}
                      >
                        {value}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              Thank you so much for sharing. We will only use this information
              to provide you with a better experience on JoelOsteen.com.
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
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
        </Container>
      </Form>
    </Container>
  );
}

type BasicInfoFSProps = IBasicInfoEditModeProps & IFSContextInitializer;

export function BasicInfoWithFormSupport(props: BasicInfoFSProps) {
  const AddBasicInfo = withFSContextFormSupport(BasicInfoEditMode);
  return <AddBasicInfo {...props}></AddBasicInfo>;
}
