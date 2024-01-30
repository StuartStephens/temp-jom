import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  IContactAddress,
  IContactInformation,
} from "../contexts/Auth/AccountTypes";
import { ICountryDetail, IStateDetail } from "../contexts/Common/CommonTypes";
import {
  AddressForm,
  IAddressForm,
  IAddressFormProps,
} from "../components/AddressForm";
import { useAccountInfoContext } from "../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../contexts/Auth/Context";
import { RowActionButton } from "../layouts/AccountLayout/RowActionButton";
// import { IFSFormConfiguration } from "../utilities/FormSupport/FSBehaviors";
import { deepCopy, makeContextConfig } from "../contexts/utilities/FormSupport/FSUtils";
// import { FormConfiguration } from "../utilities/FormSupport/FormFieldPropConstants";
import { withFSContextFormSupport } from "../contexts/utilities/FormSupport/FormSupport";
import { IFSContextInitializer } from "../contexts/utilities/FormSupport/FormSupportContext";
import { ADDRESS_FORM } from "../contexts/utilities/FormSupport/deprecate_FormValidationConstants";
import { AddressDisplay } from "./AddressDisplay";

enum FORM_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
}
export interface IStoredAddressesProps {
  // addresses?: IAddressForm[];
  onRemoveAddress: (indexToRemove: number) => void;
  onEditAddress: (address: IAddressForm, indexToUpdate: number) => void;
  onAddAddress: (address: IAddressForm) => void;
}

export function StoredAddresses({
  onRemoveAddress,
  onEditAddress,
  onAddAddress,
}: IStoredAddressesProps) {
  const {
    addresses,
    setAddresses,
    updateAddress,
    removeAddress,
    selectedCountryDetails,
    selectedStateDetails,
  } = useAccountInfoContext();

  const { contactInfo, setContactInfo, refreshContactInformation } = useAuth();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditForm, setCurrentEditForm] = useState<IAddressForm>();
  const [isAddMode, setIsAddMode] = useState(false);
  const [addressForms, setAddressForms] = useState<IAddressForm[]>([]);

  //const [contextState, setContextState] = useState<FormConfiguration>();

  useEffect(() => {
    //createAddressForms();
    //setContextState(makeContextConfig(ADDRESS_FORM, "TODO_FILL_LATER"));
  }, []);

  function addressToForm(addr: IContactAddress | undefined): IAddressForm {
    return {
      id: addr?.Id || "",
      firstName: addr?.FirstName || "",
      lastName: addr?.LastName || "",
      address1: addr?.Line1 || "",
      address2: addr?.Line2 || "",
      country: addr?.CountryDetail?.Iso3Code || "USA",
      city: addr?.City || "",
      state: addr?.State || "VI",
      zipCode: addr?.PostalCode || "",
      isPrimary: addr?.IsPrimary,
      isDefaultBilling: addr?.IsDefaultBilling,
      isDefaultShipping: addr?.IsDefaultShipping,
    } as IAddressForm;
  }

  function createAddressForms() {
    let replaceForms: IAddressForm[] = deepCopy(addressForms);
    replaceForms = !!addresses
      ? addresses.reduce((accum: IAddressForm[], addr: IContactAddress) => {
        accum = [...accum, addressToForm(addr)];
        return accum;
      }, [])
      : [];
    setAddressForms(replaceForms);
  }

  useEffect(() => {
    createAddressForms();

    // eslint-disable-next-line
  }, [addresses]);

  function updateContactInfo() {
    if (contactInfo && contactInfo.Address) {
      const copy: IContactInformation = deepCopy(contactInfo);

      addresses.forEach((o: IContactAddress) => {
        if (o.IsPrimary) {
          copy.Address = { ...copy.Address, ...o };
        } else if (o.IsDefaultBilling) {
          copy.DefaultBillingAddress = {
            ...copy.DefaultBillingAddress,
            ...o,
          };
        } else if (o.IsDefaultShipping) {
          copy.DefaultShippingAddress = {
            ...copy.DefaultShippingAddress,
            ...o,
          };
        }
      });
      setContactInfo(copy);
    }
  }

  // eslint-disable-next-line
  function prepPutData(form: IAddressForm): IContactAddress {
    const countryDetails: ICountryDetail | undefined = selectedCountryDetails;
    const stateDetails: IStateDetail | undefined = selectedStateDetails;
    return {
      Id: form.id,
      Line1: form.address1,
      Line2: form.address2,
      City: form.city,
      Country: countryDetails?.Iso3Code || undefined, //this expects the country name
      State: stateDetails?.Iso2Code || undefined,
      PostalCode: form.zipCode,
      LastName: form.lastName,
      FirstName: form.firstName,
      IsPrimary: form.isPrimary,
      IsDefaultBilling: form.isDefaultBilling,
      IsDefaultShipping: form.isDefaultShipping,
    } as IContactAddress;
  }

  function getContactAddressFromForm(form: IAddressForm): IContactAddress {
    //THIS represents the GET data coming back from the server
    //https://lwcrmapi.lakewoodchurch.com/api/Contact/Addresses
    const countryDetails: ICountryDetail | undefined = selectedCountryDetails;
    const stateDetails: IStateDetail | undefined = selectedStateDetails;
    return {
      Id: (form.id !== "" && form.id) || undefined,
      Line1: form.address1,
      Line2: form.address2,
      City: form.city,
      Country: countryDetails?.Iso3Code || "", //this expects the country name
      State: stateDetails?.Name || "",
      PostalCode: form.zipCode,
      LastName: form.lastName,
      FirstName: form.firstName,
      CustomerId: "a33eb962-1b1d-e811-80e6-000d3a7075d4",
      IsPrimary: form.isPrimary,
      IsDefaultBilling: form.isDefaultBilling,
      IsDefaultShipping: form.isDefaultShipping,
      StateDetail: stateDetails || null,
      DoNotMail: false,
      CountryDetail: countryDetails || null,
      Latitude: 0.0,
      Longitude: 0.0,
      Person: form.firstName + " " + form.lastName,
      HasBasicData: false,
    } as IContactAddress;
  }

  function handleRemoveAddress(form: IAddressForm) {
    // const updatedValue: IContactAddress[] = deepCopy(addresses);
    // updatedValue.reduce((accum: IContactAddress[], o: IContactAddress) => {
    //   return form.id !== o.Id ? [...accum, o] : accum;
    // }, []);
    //setAddresses(updatedValue);
    form.id && removeAddress(form.id);
    // }
    closeAddEdit();
  }

  function handleAddressSaved(form: IAddressForm) {
    //TODO: not all this code is needed, we don't really need to do anything with the accumilated value anymore, sop we can probably just use find now insteead of a reducer
    let updatedValue: IContactAddress[] = deepCopy(addresses);
    if (updatedValue) {
      updatedValue = updatedValue.reduce(
        (accum: IContactAddress[], currValue: IContactAddress) => {
          if (currValue.Id === form.id) {
            let replacementAddress: IContactAddress = deepCopy(currValue);
            replacementAddress = {
              ...replacementAddress,
              ...getContactAddressFromForm(deepCopy(form)),
            };
            accum.push(replacementAddress);
            updateAddress(replacementAddress);
          } else {
            accum.push(deepCopy(currValue));
          }
          return accum;
        },
        []
      );

      //setAddresses(updatedValue);
    }
    closeAddEdit();
  }

  function handleAddressCancelled(address: IAddressForm) {
    closeAddEdit();
  }

  function handleEditMode(address: IAddressForm) {
    setIsEditMode(true);
    setIsAddMode(false);
    setCurrentEditForm(address);
  }

  function handleAddNewAddress(form: IAddressForm) {
    const replacementAddress = getContactAddressFromForm(form); //
    updateAddress(replacementAddress);
    closeAddEdit();
  }

  function closeAddEdit() {
    setIsAddMode(false);
    setIsEditMode(false);
  }

  return (
    <>
      <Container fluid className="full-width border-bottom">
        <Row>
          <Col xs={12} md={8}>
            <h3>Saved Addresses</h3>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            {!isAddMode && (
              <Button
                variant="primary"
                onClick={() => {
                  setIsAddMode(true);
                  setIsEditMode(false);
                }}
              >
                Add New Address
              </Button>
            )}
          </Col>
        </Row>
        {/* {isEditMode ? "EDIT MODE" : "VIEW MODE"} */}
        {isAddMode && (
          <AddressWithFormSupport
            defaultForm={
              {
                id: "",
                firstName: "",
                lastName: "",
                address1: "",
                address2: "",
                country: "USA",
                city: "",
                state: "VI",
                zipCode: "",
                isDefaultBilling: false,
                isDefaultShipping: false,
                isPrimary: false,
              } as IAddressForm
            }
            formConfiguration={{ formFields: ADDRESS_FORM }}
            mode={FORM_MODE.ADD}
            onSave={(newAddressForm: IAddressForm) => {
              handleAddNewAddress(newAddressForm);
            }}
            onCancel={() => {
              closeAddEdit();
            }}
          />
        )}

        <Container fluid className="full-width">
          <Row className="pb-1">
            <Col>
              <h3>Default Address</h3>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col xs={12} md={10}>
              <AddressDisplay
                form={
                  contactInfo?.Address
                    ? addressToForm(contactInfo?.Address)
                    : undefined
                }
              />
            </Col>
            <Col xs={12} md={2} className="d-flex flex-column">
              <div className=" d-flex flex-column gap-1">
                <RowActionButton
                  onClick={() => {
                    handleEditMode(addressToForm(contactInfo?.Address));
                  }}
                >
                  EDIT
                </RowActionButton>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="pb-1">
              <h3>Default Billing Address</h3>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col xs={12} md={10}>
              <AddressDisplay
                form={
                  contactInfo?.Address
                    ? addressToForm(contactInfo?.DefaultBillingAddress)
                    : undefined
                }
              />
            </Col>
            <Col xs={12} md={2} className="d-flex flex-column">
              <div className=" d-flex flex-column gap-1">
                <RowActionButton
                  onClick={() => {
                    handleEditMode(
                      addressToForm(contactInfo?.DefaultBillingAddress)
                    );
                  }}
                >
                  EDIT
                </RowActionButton>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="pb-1">
              <h3>Default Shipping Address</h3>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col xs={12} md={10}>
              <AddressDisplay
                form={
                  contactInfo?.Address
                    ? addressToForm(contactInfo?.DefaultShippingAddress)
                    : undefined
                }
              />
            </Col>
            <Col xs={12} md={2} className="d-flex flex-column">
              <div className=" d-flex flex-column gap-1">
                <RowActionButton
                  onClick={() => {
                    handleEditMode(
                      addressToForm(contactInfo?.DefaultShippingAddress)
                    );
                  }}
                >
                  EDIT
                </RowActionButton>
              </div>
            </Col>
          </Row>
        </Container>

        {addressForms && addressForms.length > 0 && (
          <Container fluid className="full-width">
            <Row className="pb-1">
              <Col>
                <h3>Other Addresses</h3>
              </Col>
            </Row>
          </Container>
        )}

        {addressForms &&
          addressForms.length > 0 &&
          addressForms
            .filter(
              (o: IAddressForm) =>
                !o.isPrimary && !o.isDefaultShipping && !o.isDefaultBilling
            )
            .map((form: IAddressForm, index) => {
              return (
                <Container
                  key={index}
                  fluid
                  className="full-width border-bottom pt-1 mb-1"
                >
                  {!isEditMode && (
                    <Container fluid className="full-width">
                      <Row>
                        <Col xs={12} md={10} className="pb-1 ">
                          <AddressDisplay form={form} />
                        </Col>
                        <Col xs={12} md={2} className="d-flex flex-column ">
                          <div className=" d-flex flex-column gap-1">
                            <RowActionButton
                              onClick={() => {
                                handleEditMode(form);
                              }}
                            >
                              EDIT
                            </RowActionButton>
                            <RowActionButton
                              onClick={() => {
                                handleRemoveAddress(form);
                              }}
                            >
                              REMOVE
                            </RowActionButton>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  )}
                </Container>
              );
            })}
        {isEditMode && (
          <Container fluid className="full-width">
            <Row>
              <Col xs={12} md={12}>
                {/* // <FormSupportProvider 
                // config={makeContextConfig(ADDRESS_FORM, "TODO_FILL_LATER")}
                //defaultForm={currentEditForm}
                // defaultForm={
                //   {
                //     id: "",
                //     firstName: "",
                //     lastName: "",
                //     address1: "",
                //     address2: "",
                //     country: "USA",
                //     city: "",
                //     state: "VI",
                //     zipCode: "",
                //     isDefaultBilling: false,
                //     isDefaultShipping: false,
                //     isPrimary: false,
                //   } as IAddressForm
                // }
                // > */}
                <AddressWithFormSupport
                  defaultForm={currentEditForm}
                  formConfiguration={{ formFields: ADDRESS_FORM }}
                  // dataSourceProvider={}
                  // dataSourceReducer={}
                  mode={FORM_MODE.EDIT}
                  formData={currentEditForm}
                  onSave={(form: IAddressForm) => {
                    handleAddressSaved(form);
                  }}
                  onCancel={handleAddressCancelled}
                />
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}

type AddressFSProps = IAddressFormProps & IFSContextInitializer;

export function AddressWithFormSupport(props: AddressFSProps) {
  const AddAddress = withFSContextFormSupport(AddressForm);
  return <AddAddress {...props}>Hello</AddAddress>;
}
