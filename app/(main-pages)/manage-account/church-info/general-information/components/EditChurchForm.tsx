"use client";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";

import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { EnhancedTextArea } from "../../../../../components/EnhancedTextArea";
import { IChurch } from "../../../../../components/FindChurchesContainer/SearchForChurch";
import { LoginRequired } from "../../../../../components/LoginRequired";
import { IImage } from "../../../../../components/cms/types/core/CoreTypes";
import { useAccountInfoContext } from "../../../../../contexts/AccountInformationContext/AccountInformationContext";
import { IContactAddress } from "../../../../../contexts/Auth/AccountTypes";
import { useAuth } from "../../../../../contexts/Auth/Context";
import { useChurchInfoContext } from "../../../../../contexts/ChurchInfoContext/ChurchInfoContext";
import { IChurchService } from "../../../../../contexts/ChurchInfoContext/ChurchInfoTypes";
import { hasErrors } from "../../../../../contexts/utilities/FormSupport/FSUtils";
import { FormErrors } from "../../../../../contexts/utilities/FormSupport/FormErrors";
import { withFSContextFormSupport } from "../../../../../contexts/utilities/FormSupport/FormSupport";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../../../../contexts/utilities/FormSupport/FormSupportContext";
import {
  FormField,
  VALIDATION_TYPES,
} from "../../../../../contexts/utilities/FormSupport/FormSupportTypes";
import { formatYear } from "../../../../../contexts/utilities/FormatUtils";
import { RowActionButton } from "../../../../../layouts/AccountLayout/RowActionButton";
import { ChurchSelector } from "./ChurchSelector";

enum FORM_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
}

export const EDIT_CHURCH_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "Name",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Church Name is Required",
        },
      ],
    },
  ],
  [
    "Website",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        // {
        //   validationType: VALIDATION_TYPES.REQUIRED,
        //   message: "Church Website is Required",
        // },
      ],
    },
  ],
  [
    "Email",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.EMAIL_ADDRESS,
          message: "A valid Email Address is Required",
        },
      ],
    },
  ],
  [
    "Phone",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.PHONE_NUMBER,
          message: "A valid Church Phone number is Required",
        },
      ],
    },
  ],
  [
    "PastorName",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Pastor Name(s) is a required field",
        },
      ],
    },
  ],
  [
    "Founded",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.VALID_YEAR,
          message: "Founded must be a valid year",
        },
      ],
    },
  ],
]);

export interface IEditChurchForm {
  Id?: string;
  Name?: string;
  Website?: string;
  Email?: string;
  Phone?: string;
  Image?: IImage;
  PastorName?: string;
  PastorImage?: IImage;
  Addr_Id?: string;
  Addr_City?: string;
  Addr_Country?: string;
  Addr_FirstName?: string;
  Addr_IsPrimary?: boolean;
  Addr_IsDefaultBilling?: boolean;
  Addr_IsDefaultShipping?: boolean;
  Addr_LastName?: string;
  Addr_Line1?: string;
  Addr_Line2?: string;
  Addr_PostalCode?: string;
  Addr_State?: string;
  MemberCount?: string;
  Founded?: string;
  ServiceTimes?: IChurchService[];
  Invitation?: string;
  Description?: string;
  WorshipStyle?: string;

  // Addr_CustomerId?: "",
  // Addr_IsSelected?: boolean;
  // Addr_StateDetail?: IStateDetail;
  // Addr_DoNotMail?: boolean;
  // Addr_CountryDetail?: ICountryDetail;
  // Addr_Summary?: "",
  // Addr_Latitude?: number; //0.0
  // Addr_Longitude?: number; //0.0
  // Addr_Person?: "",
  // Addr_Name?: "",
  // Addr_HasBasicData?: boolean;
}

export interface IEditChurchFormProps {}

export function EditChurchForm(props: IEditChurchFormProps) {
  const {
    state,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleSelectBlur,
    resetForm,
    initForm,
    validateLocally,
  } = useFormSupportContext();
  const { checkIsLoggedIn, contactInfo, fetchAPI } = useAuth();
  const {
    countries,
    states,
    setSelectedCountry,
    setSelectedState,
    selectedCountryDetails,
    selectedStateDetails,
  } = useAccountInfoContext();
  const {
    saveChurch,
    selectedChurch,
    setSelectedChurch,
    getOwnedChurchById,
    setIsAddingChurchService,
    setEditingChurchService,
  } = useChurchInfoContext();
  const [churchImage, setChurchImage] = useState<File>();
  const [pastorImage, setPastorImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const { errors, form } = state;

  const [workaroundChurch, setWorkaroundChurch] = useState<IChurch>();

  useEffect(() => {
    selectedChurch && initForm(convertIChurchtoEditChurchForm(selectedChurch));
    const workaroung = getOwnedChurchById(selectedChurch?.Id);
    workaroung && setWorkaroundChurch(workaroung);
  }, [selectedChurch]);

  useEffect(() => {
    function saveChurchImageFile(churchId: string) {
      async function postChurchImage(churchId: string) {
        if (!churchId || !churchImage) return;
        setIsLoading(true);
        const url = `https://lwcrmapi-mig2-east.azurewebsites.net/api/Church/ChurchImage/${churchId}`;
        let formData = new FormData();
        formData.set("File", churchImage);
        const token = localStorage.getItem("authToken") || "";
        let headers = new Headers();
        // headers.append("Content-Type", "multipart/form-data");
        headers.append("Authorization", `${token}`);
        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData,
            headers: headers,
          });

          if (response.ok) {
            const data = await response.json();
            setSelectedChurch(data);
            setChurchImage(undefined);
          } else {
            throw new Error("Failed to update Image");
          }
        } catch (e) {
          throw new Error("UNEXPECTED ERROR WHILE UPLOADING IMAGE");
        } finally {
          setIsLoading(false);
        }
      }
      postChurchImage(churchId);
    }

    selectedChurch?.Id && saveChurchImageFile(selectedChurch?.Id);
  }, [churchImage]);

  useEffect(() => {
    function savePastorImageFile(churchId: string) {
      async function postPastorImage(churchId: string) {
        if (!churchId || !pastorImage) return;
        setIsLoading(true);
        const url = `https://lwcrmapi-mig2-east.azurewebsites.net/api/Church/PastorImage/${churchId}`;
        let formData = new FormData();
        formData.set("File", pastorImage);
        const token = localStorage.getItem("authToken") || "";
        let headers = new Headers();
        headers.append("Authorization", `${token}`);
        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData,
            headers: headers,
          });

          if (response.ok) {
            const data = await response.json();
            setSelectedChurch(data);
            setPastorImage(undefined);
          } else {
            throw new Error("Failed to update Image");
          }
        } catch (e) {
          throw new Error("UNEXPECTED ERROR WHILE UPLOADING IMAGE");
        } finally {
          setIsLoading(false);
        }
      }
      postPastorImage(churchId);
    }

    selectedChurch?.Id && savePastorImageFile(selectedChurch?.Id);
  }, [pastorImage]);

  function handleCancel() {
    resetForm();
  }

  function handleSaveChurch() {
    if (!validateLocally()) return;
    const saveValue: IChurch = convertEditChurchFormToIChurch({ ...form });
    console.log("handleSaveChurch saveValue", saveValue);
    saveChurch(
      saveValue,
      (newData: IChurch) => {
        alert("church saved");
      },
      (originalData: IChurch) => {
        alert("church saved");
      }
    );
  }

  const convertEditChurchFormToIChurch = (form: IEditChurchForm): IChurch => {
    console.log("convertEditChurchFormToIChurch form", form);
    let membercount = 0;
    try {
      if (form && form.MemberCount && form.MemberCount.trim() != "") {
        membercount = Number.parseInt(form.MemberCount);
      }
    } catch (e) {
      membercount = 0;
    }

    const church: IChurch = {
      Id: form.Id || "",
      Address: {
        Id: form.Addr_Id || "",
        City: form.Addr_City || "",
        Country: form.Addr_Country,
        CountryDetail: selectedCountryDetails,
        FirstName: form.Addr_FirstName || "",
        IsPrimary: form.Addr_IsPrimary || "",
        IsDefaultBilling: form.Addr_IsDefaultBilling || "",
        IsDefaultShipping: form.Addr_IsDefaultShipping || "",
        LastName: form.Addr_LastName || "",
        Line1: form.Addr_Line1 || "",
        Line2: form.Addr_Line2 || "",
        PostalCode: form.Addr_PostalCode || "",
        StateDetail: selectedStateDetails,
        State: form.Addr_State,
      } as IContactAddress,
      Name: form.Name || "",
      MemberCount: membercount,
      Founded: form.Founded || "",
      Description: form.Description || "",
      Email: form.Email || "",
      Invitation: form.Invitation || "",
      PastorName: form.PastorName || "",
      Phone: form.Phone || "",
      Website: form.Website || "",
      ServiceTimes: [],
      WorshipStyle: form.WorshipStyle || "",
      // Image: IChurchImage,
      // PastorImage: IChurchImage,
      // ChurchDistance: undefined,
    };
    return church;
  };

  const convertIChurchtoEditChurchForm = (church: IChurch): IEditChurchForm => {
    let membercount = "";
    try {
      if (church && church.MemberCount && !isNaN(church.MemberCount)) {
        membercount = "" + church.MemberCount;
      }
    } catch (e) {
      membercount = "";
    }

    const newForm: IEditChurchForm = {
      Id: church.Id,
      Name: church?.Name,
      Website: church.Website,
      Email: church.Email,
      Phone: church.Phone,
      PastorName: church.PastorName,
      Addr_Id: church?.Address?.Id || "",
      Addr_City: church?.Address?.City || "",
      Addr_Country: church?.Address?.CountryDetail?.Iso3Code || "USA",
      Addr_FirstName: church?.Address?.Id || "",
      Addr_IsPrimary: church?.Address?.IsPrimary == true,
      Addr_IsDefaultBilling: church?.Address?.IsDefaultBilling == true,
      Addr_IsDefaultShipping: church?.Address?.IsDefaultShipping == true,
      Addr_LastName: church?.Address?.LastName || "",
      Addr_Line1: church?.Address?.Line1 || "",
      Addr_Line2: church?.Address?.Line2 || "",
      Addr_PostalCode: church?.Address?.PostalCode || "",
      Addr_State: church?.Address?.StateDetail?.Iso2Code || "VI",
      MemberCount: membercount,
      Founded: formatYear(church?.Founded) || "",
      Invitation: church?.Invitation || "",
      Description: church?.Description || "",
      WorshipStyle: church?.WorshipStyle || "",
      ServiceTimes: [],
      // Image: {
      //   Url: `https://lwcrmapi-mig2-east.azurewebsites.net/api/Church/ChurchImage/${church.Image?.Id}`,
      // },
      // PastorImage: IImage,
    };
    return newForm;
  };

  function handleChurchImageChanged(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const files = (e.target as HTMLInputElement).files;
    files && files[0] && setChurchImage(files[0]);
  }

  function handlePastorImageChanged(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const files = (e.target as HTMLInputElement).files;
    files && files[0] && setPastorImage(files[0]);
  }

  return !checkIsLoggedIn() ? (
    <LoginRequired />
  ) : (
    <div>
      <ChurchSelector>
        <Form method="GET">
          <Container fluid className="full-width">
            <Row>
              <Col xs={12} md={12} className=" mt-4">
                <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-start">
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert(
                        "Form submitted" +
                          " donating as :" +
                          selectedChurch?.Id +
                          (form && JSON.stringify(form))
                      );
                    }}
                  >
                    Donate as an Organization
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Name" label="Church Name">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Church Name"
                    name="Name"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Name && form?.Name.length > 0 ? form?.Name : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Name)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Name?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Website" label="Church Website">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Church Website"
                    name="Website"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Website && form?.Website.length > 0
                        ? form?.Website
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Website)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Website?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Email" label="Church Email">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Church Email"
                    name="Email"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Email && form?.Email.length > 0 ? form?.Email : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Email)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Email?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Phone" label="Church Phone">
                  <Form.Control
                    size="sm"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    placeholder="Church Phone"
                    name="Phone"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Phone && form?.Phone.length > 0 ? form?.Phone : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Phone)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Phone?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row>
              <Col xs={12} md={12} className=" mt-4">
                <Container fluid className="d-flex flex-column flex-md-row ">
                  {selectedChurch?.Image?.Id && (
                    <>
                      {/* {selectedChurch?.Image?.Id} */}
                      <Image
                        height={206}
                        fluid
                        src={`https://lwcrmapi-mig2-east.azurewebsites.net/api/Church/ImageSrc/${selectedChurch?.Image?.Id}`}
                        alt="Church Logo"
                      />
                    </>
                  )}

                  <div className="p-5">
                    <Form.Group controlId="Image" className="mt-4">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="Image"
                        accept=".png"
                        onChange={handleChurchImageChanged}
                      />
                    </Form.Group>
                  </div>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col className=" mt-4">
                <p>
                  Logo must be solid white. The file should be formatted as a
                  transparent PNG with maximum dimensions of 500x206. Click the
                  logo thumbnail to upload a new version.
                </p>
              </Col>
            </Row>
            <Row>
              <Form.Group as={Col} xs={12} md={8} className=" mt-4">
                <FloatingLabel controlId="PastorName" label="Pastor Name(s)">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="PastorName"
                    name="PastorName"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.PastorName && form?.PastorName.length > 0
                        ? form?.PastorName
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.PastorName)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.PastorName?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row className="">
              <Col xs={12} md={12} className=" mt-4">
                <Container fluid className="d-flex flex-column flex-md-row ">
                  {selectedChurch?.PastorImage?.Id && (
                    <Image
                      width={192}
                      fluid
                      roundedCircle
                      src={`https://lwcrmapi-mig2-east.azurewebsites.net/api/Church/ImageSrc/${selectedChurch?.PastorImage?.Id}`}
                    />
                  )}

                  <div className="p-5">
                    <Form.Group controlId="PastorImage" className="mt-4">
                      <Form.Label>Pastor Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="PastorImage"
                        accept=".png"
                        onChange={handlePastorImageChanged}
                      />
                    </Form.Group>
                  </div>
                </Container>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={12} className=" mt-4">
                <p>
                  Photo should be 180h x 180w JPEG or PNG. Click the photo
                  thumbnail to upload a new photo.
                </p>
              </Col>
            </Row>
            <Row>
              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Addr_Line1" label="Address line 1">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Address Line 1"
                    name="Addr_Line1"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Addr_Line1 && form?.Addr_Line1.length > 0
                        ? form?.Addr_Line1
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Addr_Line1)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Addr_Line1?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Addr_Line2" label="Address line 2">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Address Line 2"
                    name="Addr_Line2"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Addr_Line2 && form?.Addr_Line2.length > 0
                        ? form?.Addr_Line2
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Addr_Line2)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Addr_Line2?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Addr_City" label="City">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="City"
                    name="Addr_City"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Addr_City && form?.Addr_City.length > 0
                        ? form?.Addr_City
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Addr_City)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Addr_City?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              {countries && (
                <Form.Group as={Col} className="col-12 col-md-6 mt-3">
                  <FloatingLabel controlId="Addr_Country" label="Country">
                    <Form.Select
                      name="Addr_Country"
                      aria-label="Select Country"
                      onChange={(e) => {
                        handleSelectChange(e);
                        setSelectedCountry(e.target.value);
                      }}
                      onBlur={handleSelectBlur}
                      value={
                        form?.Addr_Country ||
                        (countries && countries[0]?.Iso3Code) ||
                        "USA"
                      }
                      // defaultValue={countries && countries[0].Iso3Code}
                    >
                      {countries.map((c) => (
                        <option
                          key={c.Name}
                          value={c.Iso3Code}
                          // selected={c.Iso2Code === "USA"}
                        >
                          {c.Name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              )}
            </Row>

            <Row>
              {states && (
                <Form.Group as={Col} className="col-12 col-md-6 mt-3">
                  <FloatingLabel controlId="Addr_State" label="State">
                    <Form.Select
                      name="Addr_State"
                      aria-label="Select State"
                      onChange={(e) => {
                        handleSelectChange(e);
                        setSelectedState(e.target.value);
                      }}
                      onBlur={(e) => {
                        handleSelectChange(e);
                        setSelectedState(e.target.value);
                      }}
                      value={
                        form?.Addr_State ||
                        (states && states[0]?.Iso2Code) ||
                        "VI"
                      }
                      // defaultValue={states && states[0].Iso2Code}
                      // defaultValue={form.state || "VI"}
                    >
                      {states.map((c) => (
                        <option key={c.Name} value={c.Iso2Code}>
                          {c.Name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              )}
              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel controlId="Addr_PostalCode" label="Postal Code">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Postal Code"
                    name="Addr_PostalCode"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Addr_PostalCode && form?.Addr_PostalCode.length > 0
                        ? form?.Addr_PostalCode
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Addr_PostalCode)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Addr_PostalCode?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row>
              <Col xs={12} md={12} className=" mt-4">
                <p>
                  This address will be used for your placement on our Partner
                  Church map and in your listing on the "Find a Church" page at
                  JoelOsteen.com.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} className=" mt-4">
                <h3>
                  Help us tell our constituents a little more about your church
                </h3>
              </Col>
            </Row>

            <Row>
              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel
                  controlId="MemberCount"
                  label="How many members does your church have?"
                >
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="How many members does your church have?"
                    name="MemberCount"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.MemberCount && form?.MemberCount.length > 0
                        ? form?.MemberCount
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.MemberCount)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.MemberCount?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6} className=" mt-4">
                <FloatingLabel
                  controlId="Founded"
                  label="When were you founded?"
                >
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="When were you founded?"
                    name="Founded"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Founded && form?.Founded.length > 0
                        ? form?.Founded
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Founded)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Founded?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row>
              <Col xs={12} md={9}>
                <h3>When are your church services?</h3>
              </Col>
              <Col xs={12} md={3}>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    //alert("add service");
                    setIsAddingChurchService(true);
                  }}
                >
                  Add Service
                </Button>
              </Col>
            </Row>
            {/* {JSON.stringify(selectedChurch?.ServiceTimes)} */}
            {/* {JSON.stringify(o)} */}

            {selectedChurch?.Id &&
              workaroundChurch?.ServiceTimes &&
              workaroundChurch?.ServiceTimes.map((service: IChurchService) => {
                return (
                  <Row key={`${service.Id}`}>
                    <Col xs={12} md={9}>
                      {service?.Description}
                    </Col>
                    <Col xs={12} md={3}>
                      <Container className="d-flex flex-column justify-content-end">
                        <RowActionButton
                          onClick={() => {
                            //handleEditService();
                          }}
                        >
                          Add Service
                        </RowActionButton>
                        <RowActionButton
                          onClick={() => {
                            //handleEditService();
                            setEditingChurchService(service);
                          }}
                        >
                          Remove
                        </RowActionButton>
                      </Container>
                    </Col>
                  </Row>
                );
              })}

            <Row>
              <Form.Group as={Col} xs={12} md={12} className=" mt-4">
                <EnhancedTextArea
                  controlId="Invitation"
                  maxCount={300}
                  required={true}
                  value={form?.Invitation || ""}
                  onMessageChanged={(
                    e: ChangeEvent<HTMLInputElement>,
                    message
                  ) => {
                    const foo = { ...form, Invitation: message };
                    handleInputChange(e, foo);
                  }}
                  onFieldBlurred={(
                    e: FocusEvent<HTMLInputElement>,
                    message
                  ) => {
                    const foo = { ...form, Invitation: message };
                    handleInputBlur(e, foo);
                  }}
                  fieldLabel={`Invitation`}
                />
              </Form.Group>
              <p>
                The invitation is one or two short sentences inviting the user
                to visit your church. 300 characters maximum.
              </p>
            </Row>

            <Row>
              <Form.Group as={Col} xs={12} md={12} className=" mt-4">
                <EnhancedTextArea
                  controlId="Description"
                  maxCount={4000}
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
                  fieldLabel={`Description`}
                />
              </Form.Group>
              <p>
                The description is a short paragraph inviting the user to visit
                your church. 4000 characters maximum.
              </p>
            </Row>

            <FormErrors />

            <Row>
              <Col xs={12} md={12} className=" mt-4">
                <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-start">
                  <Button variant="outline-primary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSaveChurch}>
                    Save
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
        {/* </FSBehaviors> */}
      </ChurchSelector>
    </div>
  );
}

type EditChurchFSProps = IEditChurchFormProps & IFSContextInitializer;

export function EditChurchWithFormSupport(props: EditChurchFSProps) {
  const AddEditChurch = withFSContextFormSupport(EditChurchForm);
  return <AddEditChurch {...props}></AddEditChurch>;
}
