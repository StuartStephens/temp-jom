"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { LoadingSpinner } from "../../components/LoadingSpinner";
import {
  IContactAddress,
  IContactInformation,
  IDashboardHero,
} from "../../contexts/Auth/AccountTypes";
import { IDashboardHeroAPIResult } from "../../contexts/Auth/AddressesTypes";
import useContactInformationAPI from "../../contexts/Auth/ContactInformationAPI";
import { IDonation } from "../../contexts/Auth/DonationsTypes";
import { IEmailAddress } from "../../contexts/Auth/EmailAddressTypes";
import { IPaymentMethod } from "../../contexts/Auth/PaymentMethodTypes";
import { IPhoneNumber } from "../../contexts/Auth/PhoneNumbersTypes";
import {
  ICountryDetail,
  ICountryDetailsAPIResult,
  IStateDetail,
  IStateDetailsAPIResult,
} from "../../contexts/Common/CommonTypes";
import useMetaDataAPI from "../../contexts/Common/MetaDataAPI";
import { useAuth } from "../Auth/Context";
import { RemovePaymentMethodDialog } from "../../components/PaymentInfo/RemovePaymentMethodDialog";
import { CancelDonationDialog } from "../../components/ManageDonations/CancelDonationDialog";
import { IChurch } from "../../components/FindChurchesContainer/SearchForChurch";

export interface IUpdatePaymentMethod {
  type: string;
  id: string;
}

export interface ICancelDonation {
  donation: IDonation;
  church?: IChurch;
}

interface AccountInfoContextData {
  setIsLoading: (isLoading: boolean) => void;
  emailAddresses: IEmailAddress[];
  setEmailAddresses: (emailAddresses: IEmailAddress[]) => void;
  addresses: IContactAddress[];
  setAddresses: (contactAddresses: IContactAddress[]) => void;
  updateEmailAddress: (
    emailAddress: IEmailAddress,
    successCallback?: (email: IEmailAddress) => void
  ) => void;
  removeEmailAddress: (
    email: IEmailAddress,
    successCallback?: (email: IEmailAddress) => void
  ) => void;
  updateAddress: (contactAddresses: IContactAddress) => void;
  removeAddress: (addressID: string) => void;
  phoneNumbers: IPhoneNumber[];
  setPhoneNumbers: (phoneNumbers: IPhoneNumber[]) => void;
  updatePhoneNumber: (
    phone: IPhoneNumber,
    successCallback?: (phone: IPhoneNumber) => void
  ) => void;
  removePhoneNumber: (
    phone: IPhoneNumber,
    successCallback?: (phone: IPhoneNumber) => void
  ) => void;
  updateContactInfo: (
    contactInformation: IContactInformation,
    successCallback?: (contactInformation?: IContactInformation) => void
  ) => void;

  paymentMethods: IPaymentMethod[];
  paymentInfoBeingUpdated: IUpdatePaymentMethod | undefined;
  setPaymentMethods: (paymentMethods: IPaymentMethod[]) => void;
  updatePaymentMethods: () => void;
  donations: IDonation[];
  setDonations: (donations: IDonation[]) => void;
  donationBeingCancelled: ICancelDonation | undefined;
  setDonationBeingCancelled: (donation: ICancelDonation | undefined) => void;
  cancelDonation: (successCallback?: Function) => void;
  countries: ICountryDetail[];
  setCountries: (countries: ICountryDetail[]) => void;
  states: IStateDetail[];
  setStates: (states: IStateDetail[]) => void;
  setSelectedCountry: (countryIso3Code: string) => void;
  setSelectedState: (stateIso2Code: string) => void;
  selectedCountryDetails: ICountryDetail | undefined;
  selectedStateDetails: IStateDetail | undefined;
  dashboardHero: IDashboardHero | undefined;
  addNewPaymentMethod: (
    paymentMethod: IPaymentMethod,
    successCallback: Function
  ) => void;
  confirmRemoveBankAccount: (id: string | undefined) => void;
  confirmRemoveCreditCard: (id: string | undefined) => void;
}

const AccountInfoContext = createContext<AccountInfoContextData>(
  {} as AccountInfoContextData
);

interface AccountInfoProviderProps {
  children: ReactNode;
}

export function AccountInfoProvider({ children }: AccountInfoProviderProps) {
  const { fetchAPI, checkIsLoggedIn, contactInfo, refreshContactInformation } =
    useAuth();

  //const { getCountryDetails, getStateDetails } = useMetaDataAPI();
  const [isLoading, setIsLoading] = useState(false);

  const [emailAddresses, setEmailAddresses] = useState<IEmailAddress[]>([]);
  const [addresses, setAddresses] = useState<IContactAddress[]>([]);

  const [phoneNumbers, setPhoneNumbers] = useState<IPhoneNumber[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [donationBeingCancelled, setDonationBeingCancelled] =
    useState<ICancelDonation>();
  const [states, setStates] = useState<IStateDetail[]>([]);
  const [countries, setCountries] = useState<ICountryDetail[]>([]);
  const [selectedStateDetails, setSelectedStateDetails] =
    useState<IStateDetail>();
  const [selectedCountryDetails, setSelectedCountryDetails] =
    useState<ICountryDetail>();

  const { getDashboardHero } = useContactInformationAPI();
  const [dashboardHero, setDashboardHero] = useState<IDashboardHero>();

  const [paymentInfoBeingUpdated, setPaymentInfoBeingUpdated] = useState<
    IUpdatePaymentMethod | undefined
  >(undefined);

  // Call getToken when the component mounts
  useEffect(() => {
    //getData(); //TODO: can we get rid of this call?
  }, []);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [contactInfo]);

  async function fetchAddresses() {
    if (checkIsLoggedIn()) {
      try {
        const addressesAPI = await fetchAPI(
          "Contact/Addresses",
          undefined,
          "GET"
        )
          .then((response) => response.json())
          .then((data) => {
            setAddresses(data);
          });
      } catch (e) {
        console.error("ERROR", e);
      } finally {
        //
      }
    }
  }

  function addNewPaymentMethod(
    paymentMethod: IPaymentMethod,
    successCallback: Function
  ) {
    async function postNewPaymentMethod(
      paymentMethod: IPaymentMethod,
      successCallback: Function
    ) {
      try {
        const paymentMethodsAPI = await fetchAPI(
          "Contact/PaymentMethod",
          paymentMethod,
          "POST"
        )
          .then((response) => response.json())
          .then((data) => {
            //setPaymentMethods(data);
            refreshContactInformation();
            successCallback && successCallback(data);
          });
      } catch (e) {
        console.error("ERROR", e);
      } finally {
        //
      }
    }

    postNewPaymentMethod(paymentMethod, successCallback);
  }

  function confirmRemoveBankAccount(id: string | undefined) {
    id &&
      setPaymentInfoBeingUpdated({
        type: "BankAccount",
        id: id,
      } as IUpdatePaymentMethod);
  }

  function confirmRemoveCreditCard(id: string | undefined) {
    id &&
      setPaymentInfoBeingUpdated({
        type: "CreditCard",
        id: id,
      } as IUpdatePaymentMethod);
  }

  async function postCancelDonation(successCallback?: Function) {
    if (checkIsLoggedIn()) {
      setIsLoading(true);
      const newDonation = { ...donationBeingCancelled?.donation };
      newDonation.IsActive = false;
      const url = !!donationBeingCancelled?.church?.Id
        ? `Church/RecurringGift/${donationBeingCancelled?.church?.Id}`
        : `Contact/RecurringGift`;

      try {
        const postCancelDonationAPI = await fetchAPI(url, newDonation, "POST");
        const data = await postCancelDonationAPI.json();
        setDonationBeingCancelled(undefined);
        updateDonations();
        successCallback && successCallback(data as IDonation);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function cancelDonation(successCallback?: Function) {
    if (!donationBeingCancelled) {
      alert("no donation selected");
    } else {
      postCancelDonation(successCallback);
    }
  }

  function removePaymentMethod(type: string, id: string) {
    async function postRemovePaymentMethod(type: string, id: string) {
      if (id) {
        switch (type) {
          case "BankAccount":
            setPaymentInfoBeingUpdated({
              type: "BankAccount",
              id: id,
            } as IUpdatePaymentMethod);

            break;

          case "CreditCard":
            setPaymentInfoBeingUpdated({
              type: "CreditCard",
              id: id,
            } as IUpdatePaymentMethod);
            break;
        }
        const removePaymentMethod = (paymentMethodID: string) => {
          const url = `Contact/PaymentMethod/${paymentMethodID}`;
          return fetchAPI(url, null, "DELETE");
        };
        try {
          const response: Response = await removePaymentMethod(id);

          if (!response.ok) {
            const errorData = await response.json();
            console.debug("Error from removePaymentMethod:", errorData);
            throw new Error(
              "removePaymentMethod ERROR--",
              errorData.ExceptionMessage ||
                `HTTP error! status: ${response.status}`
            );
          } else {
            updatePaymentMethods();
          }
        } catch (e) {
          let result = "";
          if (typeof e === "string") {
            result = e.toUpperCase(); // works, `e` narrowed to string
          } else if (e instanceof Error) {
            result = e.message; // works, `e` narrowed to Error
          }
          // setPaymentInfoBeingUpdated("");
          console.error("ERROR OCURRED: while removing Payment Method", result);
        } finally {
          setPaymentInfoBeingUpdated(undefined);
        }
      }
    }
    postRemovePaymentMethod(type, id);
  }

  async function updateDonations() {
    if (checkIsLoggedIn()) {
      try {
        const promise = await fetchAPI(
          "Contact/RecurringGifts",
          undefined,
          "GET"
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setDonations(data);
            if (data) {
              setDonations(data);
            } else {
              setDonations([]);
            }
          });
      } catch (e) {
        console.error("ERROR FETCHING DONATIONS in updateDonations");
      }
    }
  }

  async function updatePaymentMethods() {
    //if (checkIsLoggedIn()) {
    const promise = await fetchAPI("Contact/PaymentMethods", undefined, "GET")
      .then((response) => response.json())
      .then((response) => {
        setPaymentMethods(response);
      });
    //}
  }
  async function updatePhoneNumbers() {
    const promise = await fetchAPI("Contact/PhoneNumbers", undefined, "GET")
      .then((response) => response.json())
      .then((data) => {
        setPhoneNumbers(data);
      });
  }
  async function updateEmailAddresses() {
    if (checkIsLoggedIn()) {
      const emailsAPI = await fetchAPI(
        "Contact/EmailAddresses",
        undefined,
        "GET"
      )
        .then((response) => response.json())
        .then((data) => {
          setEmailAddresses(data);
        });
    }
  }

  async function updateCountries() {
    // if (checkIsLoggedIn()) {
    const emailsAPI = await fetchAPI("Metadata/Countries", undefined, "POST")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        !selectedCountryDetails && setSelectedCountry("USA");
      });
    // }
  }

  function getData() {
    if (!checkIsLoggedIn()) {
      return;
    }

    updateDonations();
    fetchAddresses();
    updatePhoneNumbers();
    updatePaymentMethods();
    updateEmailAddresses();
    // const countries: ICountryDetailsAPIResult = getCountryDetails();
    // if (
    //   !countries.errors ||
    //   (countries.errors.length < 1 && countries.results)
    // ) {
    //   setCountries(countries.results);
    //   // const countryDetails: ICountryDetail | undefined = countries.results.find(
    //   //   (o: ICountryDetail) => o.Iso3Code === "USA"
    //   // );
    // }
    updateCountries();

    const dashboardHeroAPIResults: IDashboardHeroAPIResult = getDashboardHero();
    if (
      !dashboardHeroAPIResults.errors ||
      (dashboardHeroAPIResults.errors.length < 1 &&
        dashboardHeroAPIResults.results)
    ) {
      setDashboardHero(dashboardHeroAPIResults.results);
    }
  }

  const updateStateDetails = (countryIso3Code: string) => {
    async function fetchStates(countryIso3Code: string) {
      const stateDetailsAPI = await fetchAPI(
        `Metadata/States/${countryIso3Code}`,
        undefined,
        "POST"
      )
        .then((response) => response.json())
        .then((data) => {
          setStates(data || []);
          !!selectedStateDetails && setSelectedState(data[0] || "");
        })
        .catch((e) => {
          console.error(
            "COULD NOT FIND STATE DETAILS FOR COUNTRY: ",
            countryIso3Code
          );
          setStates([]);
          setSelectedState("");
        });
    }
    fetchStates(countryIso3Code);
  };

  const setSelectedCountry = (countryIso3Code: string) => {
    console.log("setSelectedCountry", countryIso3Code);
    const countryDetails: ICountryDetail | undefined = countries.find(
      (o: ICountryDetail) => o.Iso3Code === countryIso3Code
    );
    console.log("setSelectedCountry", countryIso3Code, countryDetails);
    if (countryDetails) {
      setSelectedCountryDetails(countryDetails);
      updateStateDetails(countryIso3Code);
    }
  };

  const setSelectedState = (stateIso2Code: string) => {
    const stateDetails: IStateDetail | undefined = states.find(
      (o: IStateDetail) => o.Iso2Code === stateIso2Code
    );
    if (stateDetails) {
      setSelectedStateDetails(stateDetails);
    }
  };

  function removeEmailAddress(
    email: IEmailAddress,
    successCallback?: (email: IEmailAddress) => void
  ) {
    // setIsLoading(true);
    async function deleteEmailAddress() {
      //setIsLoading(true);

      try {
        const url = `Contact/EmailAddress/${email.Id}`;
        const putEmailAddress = await fetchAPI(url, undefined, "PUT");
        refreshContactInformation();
        successCallback && successCallback(email);
      } catch (e) {
        console.error(e);
      } finally {
        //setIsLoading(false);
      }
    }
    deleteEmailAddress();
  }

  function updateEmailAddress(
    emailAddress: IEmailAddress,
    successCallback?: (email: IEmailAddress) => void
  ) {
    // setIsLoading(true);
    async function postEmailAddress() {
      //setIsLoading(true);

      try {
        const postEmailAddress = await fetchAPI(
          "Contact/EmailAddress",
          emailAddress,
          "POST"
        );
        const data = await postEmailAddress.json();
        refreshContactInformation();
        successCallback && successCallback(data as IEmailAddress);
      } catch (e) {
        console.error(e);
      } finally {
        //setIsLoading(false);
      }
    }
    postEmailAddress();
  }

  function updateContactInfo(
    contactInformation: IContactInformation,
    successCallback?: (contactInformation?: IContactInformation) => void
  ) {
    // setIsLoading(true);
    async function postContactInfo() {
      //setIsLoading(true);

      try {
        const resp = await fetchAPI(
          "Contact",
          { Contact: contactInformation, Sku: "", Subscriptions: "" },
          "PUT"
        );
        refreshContactInformation();
        //nothing is returned
        // const data = await resp.json();
        successCallback && successCallback();
      } catch (e) {
        console.error(e);
      } finally {
        //setIsLoading(false);
      }
    }
    postContactInfo();
  }

  function removePhoneNumber(
    phone: IPhoneNumber,
    successCallback?: (phone: IPhoneNumber) => void
  ) {
    // setIsLoading(true);
    async function deletePhoneNumber() {
      //setIsLoading(true);

      try {
        const url = `Contact/PhoneNumber/${phone.Id}`;
        const putEmailAddress = await fetchAPI(url, undefined, "PUT");
        refreshContactInformation();
        successCallback && successCallback(phone);
      } catch (e) {
        console.error(e);
      } finally {
        //setIsLoading(false);
      }
    }
    deletePhoneNumber();
  }

  function updatePhoneNumber(
    phone: IPhoneNumber,
    successCallback?: (phone: IPhoneNumber) => void
  ) {
    // setIsLoading(true);
    async function postPhoneNumber() {
      //setIsLoading(true);

      try {
        const postPhoneNumber = await fetchAPI(
          "Contact/PhoneNumber",
          phone,
          "POST"
        );
        const data = await postPhoneNumber.json();
        refreshContactInformation();
        successCallback && successCallback(data as IPhoneNumber);
      } catch (e) {
        console.error(e);
      } finally {
        //setIsLoading(false);
      }
    }
    postPhoneNumber();
  }

  function updateAddress(address: IContactAddress) {
    // setIsLoading(true);
    async function putAddress() {
      try {
        const addressesAPI = await fetchAPI("Contact/Address", address, "POST")
          .then((response) => response.json())
          .then((data) => {
            //setAddresses(data);
            //fetchAddresses();
            refreshContactInformation();
          });
      } catch (e) {
        console.error("ERROR", e);
      } finally {
        //setIsLoading(false);
      }
    }
    putAddress();
  }
  function removeAddress(addressID: string) {
    setIsLoading(true);
    async function deleteAddress() {
      try {
        const addressesAPI = await fetchAPI(
          `Contact/Address/${addressID}`,
          undefined,
          "DELETE"
        ).then((response) => {
          if (response.ok) {
            refreshContactInformation();
          }
        });
      } catch (e) {
        console.error("ERROR", e);
      } finally {
        setIsLoading(false);
      }
    }
    deleteAddress();
  }

  return (
    <AccountInfoContext.Provider
      value={{
        setIsLoading,
        emailAddresses,
        setEmailAddresses,
        updateEmailAddress,
        removeEmailAddress,
        // contactInfo,
        // setContactInfo,
        addresses,
        setAddresses,
        updateAddress,
        removeAddress,
        phoneNumbers,
        setPhoneNumbers,
        updatePhoneNumber,
        removePhoneNumber,
        paymentMethods,
        setPaymentMethods,
        donations,
        setDonations,
        donationBeingCancelled,
        setDonationBeingCancelled,
        cancelDonation,
        countries,
        setCountries,
        states,
        setStates,
        setSelectedCountry,
        setSelectedState,
        selectedCountryDetails,
        selectedStateDetails,
        dashboardHero,
        updateContactInfo,
        addNewPaymentMethod,
        confirmRemoveBankAccount,
        confirmRemoveCreditCard,
        paymentInfoBeingUpdated,
        updatePaymentMethods,
      }}
    >
      <CancelDonationDialog
        show={!!donationBeingCancelled}
        onCancel={() => {
          setDonationBeingCancelled(undefined);
        }}
        onConfirm={() => {
          setDonationBeingCancelled(undefined);
        }}
      />
      <RemovePaymentMethodDialog
        type={paymentInfoBeingUpdated?.type}
        idToDelete={paymentInfoBeingUpdated?.id}
        // title="Remove Credit Card"
        // message="Are you sure you want to remove this Credit Card?"
        show={
          !!paymentInfoBeingUpdated && paymentInfoBeingUpdated.id !== ""
          //  &&
          // !!paymentInfoBeingUpdated.type &&
          // paymentInfoBeingUpdated.type === "CreditCard"
        }
        onCancel={() => {
          setPaymentInfoBeingUpdated(undefined);
        }}
        onConfirm={() => {
          paymentInfoBeingUpdated &&
            removePaymentMethod(
              paymentInfoBeingUpdated?.type,
              paymentInfoBeingUpdated?.id
            );
        }}
      />
      {JSON.stringify(paymentInfoBeingUpdated)}
      {isLoading ? <LoadingSpinner /> : children}
    </AccountInfoContext.Provider>
  );
}

export function useAccountInfoContext(): AccountInfoContextData {
  const context = useContext(AccountInfoContext);

  if (!context) {
    throw new Error(
      "useAccountInfoContext must be used within an AccountInfoContextProvider"
    );
  }

  return context;
}
