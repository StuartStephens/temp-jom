import { IContactInformationAPIResult } from "./AccountTypes";
import { SPOOFED_GET_Contact } from "./AccountData";
import { SPOOFED_GET_DashboardHero } from "./AddressesData";
import { IDashboardHeroAPIResult } from "./AddressesTypes";

// NOTE: Contact API gets the primary addresses, but there is also an addresses API that gets all the addresses

const useContactInformationAPI = () => {
  //   const [contactInformation, setContactInformation] =
  //     useState<IContactInformationAPIResult>();

  //   useEffect(() => {
  //     //
  //     setContactInformation(SPOOFED_GET_Contact);
  //   }, []);

  const getContact = (): IContactInformationAPIResult => {
    return SPOOFED_GET_Contact;
  };

  const getDashboardHero = (): IDashboardHeroAPIResult => {
    return SPOOFED_GET_DashboardHero;
  };
  // const saveContact = (form: EmailAddressForm) => {}

  return {
    getContact,
    getDashboardHero,
  };
};

export default useContactInformationAPI;

