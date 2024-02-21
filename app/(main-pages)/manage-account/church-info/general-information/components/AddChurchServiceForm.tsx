import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import { ChangeEvent, FocusEvent, useEffect } from "react";
import { EnhancedTextArea } from "../../../../../components/EnhancedTextArea";
import { useAuth } from "../../../../../contexts/Auth/Context";
import { IPaymentMethod } from "../../../../../contexts/Auth/PaymentMethodTypes";
import { useChurchInfoContext } from "../../../../../contexts/ChurchInfoContext/ChurchInfoContext";
import {
  FORM_MODE,
  IChurchService,
} from "../../../../../contexts/ChurchInfoContext/ChurchInfoTypes";
import { FormErrors } from "../../../../../contexts/utilities/FormSupport/FormErrors";
import { withFSContextFormSupport } from "../../../../../contexts/utilities/FormSupport/FormSupport";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../../../../contexts/utilities/FormSupport/FormSupportContext";
import {
  IDayOfWeek,
  IHour,
  getDaysOfWeek,
  getHourValues,
  getMinuteValuesIn5MinuteIncrements,
} from "../../../../../contexts/utilities/FormSupport/FSUtils";

export type IAddEditChurchServiceForm = {
  ServiceId?: string;
  Description?: string;
  Day?: string;
  Hour?: string;
  Minute?: string;
  Meridium?: string; // AM | PM
  ChurchId?: string;
};

export interface IAddEditChurchServiceFormProps {
  mode: FORM_MODE;
  formData?: IAddEditChurchServiceForm;
  onCancel: (formData: IAddEditChurchServiceForm) => void;
  onSaveSuccess: (
    data: IChurchService
    // formData: IAddChurchServiceForm,
    // onSaveCallback?: (form: IAddChurchServiceForm) => void
  ) => void;
}

export function formatDateTimeForSave(
  day?: string,
  hour?: string,
  minute?: string,
  meridium?: string
) {
  return !!day || !!hour || !!minute || !!meridium
    ? `${day} @ ${hour}:${minute}${meridium}`
    : "";
}

export function convertAddChurchServiceFormToChurchService(
  serviceForm: IAddEditChurchServiceForm
): IChurchService {
  const saveDateTime: string = formatDateTimeForSave(
    serviceForm.Day,
    serviceForm.Hour,
    serviceForm.Minute,
    serviceForm.Meridium
  );

  //TODO: THERE IS AN ISSUE SAVING HERE - NOT SURE WHAT DATA IT EXPECTS
  const serviceTime: IChurchService = {
    Location: serviceForm.Description, // (string, optional): the location of the service ,
    Time: saveDateTime, // (string, optional): the times of the service ,
    ChurchId: serviceForm?.ChurchId, // (string, optional): the associated church id ,
    ServiceId: serviceForm.ServiceId, // (string, optional): OPTIONAL: the associated serivce id if updating an existing service
    // Description: serviceForm.Description,
  };

  return serviceTime;
}

export function AddChurchServiceForm(props: IAddEditChurchServiceFormProps) {
  const {
    state,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleSelectBlur,
    resetForm,
    initForm,
    handleSubmit,
  } = useFormSupportContext();
  const { fetchAPI, contactInfo } = useAuth();
  const { selectedChurch } = useChurchInfoContext();

  const { errors, form } = state;
  const { onSaveSuccess } = props;

  const formSubmitProvider = () => {
    const newService: IChurchService =
      convertAddChurchServiceFormToChurchService({ ...form });
    alert(JSON.stringify(newService));
    return fetchAPI("Church/SaveService", newService, "POST");
  };

  const formSubmitSuccessProvider = (data: IPaymentMethod) => {
    // const newForm = {
    //   acctID: "",
    //   bankName: "",
    //   accountType: "Checking",
    //   routingNumber: "",
    // };
    if (FORM_MODE.ADD === props.mode) {
      resetForm();
    } else {
      //initForm(JSON.parse(JSON.stringify(newForm)));
    }
    onSaveSuccess(data);
  };

  useEffect(() => {
    // form;
    // initializeContext(defaultForm, formConfigProvider, undefined, undefined);
    // eslint-disable-next-line
  }, []);

  function handleCancel() {
    resetForm();
    props.onCancel(form);
  }

  // ServiceId: string;
  // Description?: string;
  // Day?: string;
  // Hour?: string;
  // Minute?: string;
  // Meridium?: string; // AM | PM
  // ChurchId?: string;
  return (
    <div>
      {JSON.stringify(form)}
      <Form>
        <Container fluid className="full-width">
          <Row>
            <Col xs={12} md={6}>
              <Form.Group as={Col} xs={12} md={12} className=" mt-4">
                <EnhancedTextArea
                  controlId="Description"
                  maxCount={300}
                  required={true}
                  value={form?.Description || ""}
                  onMessageChanged={(
                    e: ChangeEvent<HTMLInputElement>,
                    message
                  ) => {
                    const foo = { ...form, Description: message };
                    handleInputChange(e, foo);
                  }}
                  onFieldBlurred={(
                    e: FocusEvent<HTMLInputElement>,
                    message
                  ) => {
                    const foo = { ...form, Description: message };
                    handleInputBlur(e, foo);
                  }}
                  fieldLabel={`Service Description`}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Container fluid>
                <Row>
                  <Form.Group as={Col} xs={12} md={12} className="  mt-4">
                    <FloatingLabel controlId="Day" label="Day">
                      <Form.Select
                        id="Day"
                        aria-label="Day"
                        value={form?.Day}
                        name="Day"
                        onChange={handleSelectChange}
                        onBlur={handleSelectBlur}
                      >
                        {getDaysOfWeek().map((day: IDayOfWeek) => {
                          return (
                            <option key={`DAY_${day.value}`} value={day.value}>
                              {day.displayValue}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4} className="  mt-4">
                    <FloatingLabel controlId="Time" label="Hour">
                      <Form.Select
                        id="Time"
                        aria-label="Hour"
                        value={form?.Time}
                        name="Time"
                        onChange={handleSelectChange}
                        onBlur={handleSelectBlur}
                      >
                        {getHourValues().map((time: IHour) => {
                          return (
                            <option
                              key={`TIME_${time.value}`}
                              value={time.value}
                            >
                              {time.displayValue}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4} className="  mt-4">
                    <FloatingLabel controlId="Minute" label="Minute">
                      <Form.Select
                        id="Minute"
                        aria-label="Minute"
                        value={form?.Minute}
                        name="Minute"
                        onChange={handleSelectChange}
                        onBlur={handleSelectBlur}
                      >
                        {getMinuteValuesIn5MinuteIncrements().map(
                          (time: string) => {
                            return (
                              <option key={`TIME_${time}`} value={time}>
                                {time}
                              </option>
                            );
                          }
                        )}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4} className="  mt-4">
                    <FloatingLabel controlId="Meridium" label="AM/PM">
                      <Form.Select
                        id="Meridium"
                        aria-label="AM/PM"
                        value={form?.Meridium}
                        name="Meridium"
                        onChange={handleSelectChange}
                        onBlur={handleSelectBlur}
                      >
                        <option key="AM" value="AM">
                          AM
                        </option>{" "}
                        <option key="PM" value="PM">
                          PM
                        </option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
              </Container>
            </Col>
          </Row>
          <FormErrors />

          <Row>
            <Col className="col-12 ">
              <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-start">
                <Button variant="outline-primary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSubmit(formSubmitProvider, formSubmitSuccessProvider);
                  }}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
      {/* </FSBehaviors> */}
    </div>
  );
}

type AddChurchServiceFSProps = IAddEditChurchServiceFormProps &
  IFSContextInitializer;

export function AddChurchServiceWithFormSupport(
  props: AddChurchServiceFSProps
) {
  const AddAddChurchService = withFSContextFormSupport(AddChurchServiceForm);
  return <AddAddChurchService {...props}></AddAddChurchService>;
}
