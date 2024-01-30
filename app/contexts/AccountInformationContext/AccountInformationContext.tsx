"use client";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    IContactAddress,
    IContactInformation,
    IDashboardHero,
} from "../../contexts/Auth/AccountTypes";
import useAddressesAPI from "../../contexts/Auth/AddressesAPI";
import {
    IAddressesAPIResult,
    IDashboardHeroAPIResult,
} from "../../contexts/Auth/AddressesTypes";
import useContactInformationAPI from "../../contexts/Auth/ContactInformationAPI";
import useDonationAPI from "../../contexts/Auth/DonationsAPI";
import { IDonation } from "../../contexts/Auth/DonationsTypes";
import useEmailAddressAPI from "../../contexts/Auth/EmailAddressAPI";
import { IEmailAddress } from "../../contexts/Auth/EmailAddressTypes";
import {
    CREDIT_CARD_TYPES,
    CreditCardType,
    IPaymentMethod,
} from "../../contexts/Auth/PaymentMethodTypes";
import usePaymentMethodsAPI from "../../contexts/Auth/PaymentMethodsAPI";
import usePhoneNumbersAPI from "../../contexts/Auth/PhoneNumbersAPI";
import {
    IPhoneNumber,
    IPhoneNumbersAPIResult,
} from "../../contexts/Auth/PhoneNumbersTypes";
import {
    ICountryDetail,
    ICountryDetailsAPIResult,
    IStateDetail,
    IStateDetailsAPIResult,
} from "../../contexts/Common/CommonTypes";
import useMetaDataAPI from "../../contexts/Common/MetaDataAPI";
import { useAuth } from "../Auth/Context";
import { LoadingSpinner } from "../../components/LoadingSpinner";

interface AccountInfoContextData {
    emailAddresses: IEmailAddress[];
    setEmailAddresses: (emailAddresses: IEmailAddress[]) => void;
    // contactInfo: IContactInformation;
    // setContactInfo: (contactInfo: IContactInformation) => void;
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
    setPaymentMethods: (paymentMethods: IPaymentMethod[]) => void;
    donations: IDonation[];
    setDonations: (donations: IDonation[]) => void;
    countries: ICountryDetail[];
    setCountries: (countries: ICountryDetail[]) => void;
    states: IStateDetail[];
    setStates: (states: IStateDetail[]) => void;
    setSelectedCountry: (countryIso3Code: string) => void;
    setSelectedState: (stateIso2Code: string) => void;
    selectedCountryDetails: ICountryDetail | undefined;
    selectedStateDetails: IStateDetail | undefined;
    getCreditCardBrand: (
        cardType: string | undefined
    ) => CreditCardType | undefined;
    dashboardHero: IDashboardHero | undefined;
}

const AccountInfoContext = createContext<AccountInfoContextData>(
    {} as AccountInfoContextData
);

interface AccountInfoProviderProps {
    children: ReactNode;
}

export function AccountInfoProvider({ children }: AccountInfoProviderProps) {
    const { getDonations } = useDonationAPI();
    const { fetchAPI, checkIsLoggedIn, contactInfo, refreshContactInformation } =
        useAuth();
    // const {
    //   getContact,
    //   // setEmailAddresses: storeEmailAddresses,
    // } = useContactInformationAPI();

    const {
        getAddresses,
        // setEmailAddresses: storeEmailAddresses,
    } = useAddressesAPI();
    const {
        getPhoneNumbers,
        // setEmailAddresses: storeEmailAddresses,
    } = usePhoneNumbersAPI();
    const {
        getPaymentMethods,
        // setEmailAddresses: storeEmailAddresses,
    } = usePaymentMethodsAPI();
    const { getEmailAddresses } = useEmailAddressAPI();

    const { getCountryDetails, getStateDetails } = useMetaDataAPI();
    const [isLoading, setIsLoading] = useState(false);

    const [emailAddresses, setEmailAddresses] = useState<IEmailAddress[]>([]);
    const [addresses, setAddresses] = useState<IContactAddress[]>([]);

    const [phoneNumbers, setPhoneNumbers] = useState<IPhoneNumber[]>([]);
    // const [contactInfo, setContactInfo] = useState<IContactInformation>(
    //   {} as IContactInformation
    // );
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);

    const [donations, setDonations] = useState<IDonation[]>([]);

    const [states, setStates] = useState<IStateDetail[]>([]);
    const [countries, setCountries] = useState<ICountryDetail[]>([]);

    const [selectedStateDetails, setSelectedStateDetails] =
        useState<IStateDetail>();
    const [selectedCountryDetails, setSelectedCountryDetails] =
        useState<ICountryDetail>();

    const { getDashboardHero } = useContactInformationAPI();
    const [dashboardHero, setDashboardHero] = useState<IDashboardHero>();

    // Call getToken when the component mounts
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [contactInfo]);

    async function fetchAddresses() {
        try {
            const addressesAPI = await fetchAPI("Contact/Addresses", undefined, "GET")
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

    function getData() {
        if (!checkIsLoggedIn() || !contactInfo || !contactInfo.IsLoggedIn) {
            return;
        }
        const donationAPIResults = getDonations();
        if (
            !donationAPIResults.errors ||
            (donationAPIResults.errors.length < 1 && donationAPIResults.results)
        ) {
            setDonations(donationAPIResults.results);
        }
        // const contactAPIResults: IContactInformationAPIResult = getContact();
        // if (
        //   !contactAPIResults.errors ||
        //   (contactAPIResults.errors.length < 1 && contactAPIResults.results)
        // ) {
        //   setContactInfo(contactAPIResults.results);
        // }

        fetchAddresses();

        // const addressAPIResults: IAddressesAPIResult = getAddresses();
        // if (
        //   !addressAPIResults.errors ||
        //   (addressAPIResults.errors.length < 1 && addressAPIResults.results)
        // ) {
        //   setAddresses(addressAPIResults.results);
        // }
        // const phoneNumbersAPIResults: IPhoneNumbersAPIResult = getPhoneNumbers();
        // if (
        //   !phoneNumbersAPIResults.errors ||
        //   (phoneNumbersAPIResults.errors.length < 1 &&
        //     phoneNumbersAPIResults.results)
        // ) {
        //   setPhoneNumbers(phoneNumbersAPIResults.results);
        // }

        async function updatePhoneNumbers() {
            //if (checkIsLoggedIn()) {
            const promise = await fetchAPI("Contact/PhoneNumbers", undefined, "GET")
                .then((response) => response.json())
                .then((data) => {
                    setPhoneNumbers(data);
                });
            //}
        }
        updatePhoneNumbers();

        async function updatePaymentMethods() {
            //if (checkIsLoggedIn()) {
            const promise = await fetchAPI("Contact/PaymentMethods", undefined, "GET")
                .then((response) => response.json())
                .then((response) => {
                    setPaymentMethods(response);
                });
            //}
        }
        updatePaymentMethods();
        // const emails: IEmailAddressesAPIResult = getEmailAddresses();
        // if (!emails.errors || (emails.errors.length < 1 && emails.results)) {
        //   setEmailAddresses(emails.results);
        // }
        async function updateEmailAddresses() {
            //if (checkIsLoggedIn()) {
            const emailsAPI = await fetchAPI(
                "Contact/EmailAddresses",
                undefined,
                "GET"
            )
                .then((response) => response.json())
                .then((data) => {
                    setEmailAddresses(data);
                });
            //}
        }
        updateEmailAddresses();
        const countries: ICountryDetailsAPIResult = getCountryDetails();
        if (
            !countries.errors ||
            (countries.errors.length < 1 && countries.results)
        ) {
            setCountries(countries.results);
            // const countryDetails: ICountryDetail | undefined = countries.results.find(
            //   (o: ICountryDetail) => o.Iso3Code === "USA"
            // );
        }
        setSelectedCountry("USA");

        const dashboardHeroAPIResults: IDashboardHeroAPIResult = getDashboardHero();
        if (
            !dashboardHeroAPIResults.errors ||
            (dashboardHeroAPIResults.errors.length < 1 &&
                dashboardHeroAPIResults.results)
        ) {
            setDashboardHero(dashboardHeroAPIResults.results);
        }
    }

    const setSelectedCountry = (countryIso3Code: string) => {
        const newStatesAPIResult: IStateDetailsAPIResult =
            getStateDetails(countryIso3Code);

        if (
            !newStatesAPIResult.errors ||
            (newStatesAPIResult.errors.length < 1 && newStatesAPIResult.results)
        ) {
            setStates(newStatesAPIResult.results);
            setSelectedStateDetails(newStatesAPIResult.results[0]);
            const countryDetails: ICountryDetail | undefined = countries.find(
                (o: ICountryDetail) => o.Iso3Code === countryIso3Code
            );
            if (countryDetails) {
                setSelectedCountryDetails(countryDetails);
            }
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

    const getCreditCardBrand = (
        cardType: string | undefined
    ): CreditCardType | undefined => {
        return cardType && CREDIT_CARD_TYPES.get(cardType)
            ? CREDIT_CARD_TYPES.get(cardType)
            : undefined;
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
                countries,
                setCountries,
                states,
                setStates,
                setSelectedCountry,
                setSelectedState,
                selectedCountryDetails,
                selectedStateDetails,
                getCreditCardBrand,
                dashboardHero,
                updateContactInfo,
            }}
        >
            {/* {dashboardHero ? JSON.stringify(dashboardHero) : "no here"} */}

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

