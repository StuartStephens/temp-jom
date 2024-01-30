import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { IProductDetails } from "../../contexts/Common/TransactionDetailsTypes";
import { useAuth } from "../../contexts/Auth/Context";
import { hasErrors } from "../../contexts/utilities/FormSupport/FSUtils";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { formatPrice } from "../../contexts/utilities/FormatUtils";

export interface IDonationFormProps { }

export type IACODonationForm = {
  id: string;
  donationAmount: string;
  productOption: string;
  monthlyPartnerAgreement?: boolean;
  otherAmount?: string;
};

export function DonationForm(props: IDonationFormProps) {
  const {
    form,
    errors,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleSelectBlur,
    validateLocally,
    initForm,
  } = useFormSupportContext();
  const { contactInfo } = useAuth();
  const [donationAmounts, setDonationAmounts] = useState<number[]>();
  const [productOptions, setProductOptions] = useState<IProductDetails[]>();

  // const [contactInfo, setContactInfo] = useState<IContactInformation>();

  const generateDonationOptions = (): number[] => {
    return [50, 75, 100, 250];
  };

  const generateProductOptions = (): IProductDetails[] => {
    return [
      {
        Id: "PRODUCT__1",
        Description: "Think This, Not That Book",
      },
    ] as IProductDetails[];
  };

  useEffect(() => {
    initializeForm();
    // eslint-disable-next-line
  }, []);

  function initializeForm(): void {
    // const contactAPIResults: IContactInformationAPIResult = getContact();
    // if (
    //   !contactAPIResults.errors ||
    //   (contactAPIResults.errors.length < 1 && contactAPIResults.results)
    // ) {
    //   setContactInfo(contactAPIResults.results);
    // }
    const dOPtions: number[] = generateDonationOptions();
    setDonationAmounts(dOPtions);

    const pOptions: IProductDetails[] = generateProductOptions();
    setProductOptions(pOptions);

    const oData: IACODonationForm = {
      id: (pOptions && pOptions[0].Id) || "IDUNKNOWN",
      donationAmount: "" + (dOPtions && dOPtions[0]) || "",
      productOption: (pOptions && pOptions[0].Id) || "NONE",
      monthlyPartnerAgreement: false,
      otherAmount: "",
    };

    initForm(oData);
  }

  function postForm() {
    alert(JSON.stringify(form));
    // TODO: convert this to whatever type the API expects
  }

  return (
    <Container>
      {/* {JSON.stringify(productOptions)} */}
      <Container className="border-bottom">
        <Row>
          <Col xs={12} className=" text-center">
            <h3>Our Gifts to you this month!</h3>
            <p>Fill in your donation and select your preferred resource!</p>
          </Col>
        </Row>
      </Container>

      <Form>
        <Container>
          <Row>
            {donationAmounts && (
              <Form.Group as={Col} className="col-12 col-md-12 mt-3">
                <FloatingLabel
                  controlId="donationAmount"
                  label="Donation Amount"
                >
                  <Form.Select
                    id="donationAmount"
                    name="donationAmount"
                    aria-label="Donation Amount"
                    onChange={handleSelectChange}
                    onBlur={handleSelectBlur}
                    value={form?.donationAmount || ""}
                  // defaultValue={(donationAmounts && donationAmounts[0]) || ""}
                  >
                    {donationAmounts.map((c: number) => (
                      <option key={c} value={c}>
                        {formatPrice(c, contactInfo?.DefaultCurrency)}
                      </option>
                    ))}
                    <option value="OTHER">Other</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            )}
          </Row>
          <Row>
            {form && form.donationAmount && form.donationAmount === "OTHER" && (
              <Form.Group as={Col} className="col-12 col-md-12 mt-4">
                <FloatingLabel controlId="otherAmount" label="Other Amount">
                  <Form.Control
                    type="text"
                    placeholder="Other Amount"
                    name="otherAmount"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={form.otherAmount}
                    value={form?.otherAmount || ""}
                    isInvalid={hasErrors(errors, errors?.otherAmount)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.otherAmount && errors?.otherAmount?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            )}
          </Row>

          <Row>
            {productOptions && (
              <Form.Group as={Col} className="col-12 col-md-12 mt-3">
                <FloatingLabel controlId="productOption" label="And Receive">
                  <Form.Select
                    id="productOption"
                    name="productOption"
                    aria-label="And Receive"
                    onChange={handleSelectChange}
                    onBlur={handleSelectBlur}
                    value={form?.Id}
                  // defaultValue={
                  //   (productOptions && productOptions[0].Id) || ""
                  // }
                  >
                    {productOptions.map((c: IProductDetails) => (
                      <option key={c.Id} value={c.Id}>
                        {c.Description}
                      </option>
                    ))}
                    <option value="NONE">No Products, Donation Only</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            )}
          </Row>
          <Row>
            <Col sm={12}>
              <Form.Check
                className="col-12 col-md-12 mt-3"
                inline
                name="monthlyPartnerAgreement"
                // defaultValue={form.monthlyPartnerAgreement}
                value={form?.monthlyPartnerAgreement || false}
                type="checkbox"
                onChange={handleInputChange}
                label="Yes, I want to partner with you on a monthly basis as a Champion of Hope"
              />
            </Col>
          </Row>
          <Row>
            {form?.monthlyPartnerAgreement && (
              <Form.Group as={Col} className="col-12 col-md-12 mt-3">
                <FloatingLabel
                  controlId="billDayOfMonth"
                  label="Bill me on this day of the month: "
                >
                  <Form.Select
                    id="billDayOfMonth"
                    name="billDayOfMonth"
                    aria-label="Bill me on this day of the month: "
                    onChange={handleSelectChange}
                    onBlur={handleSelectBlur}
                    value={form?.billDayOfMonth}
                  >
                    {(() => {
                      let td = [];
                      for (let i = 1; i <= 28; i++) {
                        let val = i < 4 ? i + "rd" : i + "th";
                        if (i == 1) val = "1st";
                        td.push(
                          <option key={i} value={i}>
                            {val}
                          </option>
                        );
                      }
                      return td;
                    })()}
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            )}
          </Row>
          <Row>
            <Container className="d-flex flex-row justify-content-end">
              <Button
                onClick={() => {
                  if (validateLocally()) {
                    postForm();
                  }
                }}
              >
                Submit
              </Button>
            </Container>
          </Row>
        </Container>
      </Form>
    </Container>
  );
}
