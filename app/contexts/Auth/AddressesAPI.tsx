import {
  SPOOFED_GET_Addresses,
  SPOOFED_GET_DashboardHero,
} from "./AddressesData";
import { IAddressesAPIResult, IDashboardHeroAPIResult } from "./AddressesTypes";

const useAddressesAPI = () => {
  // NOTE: Contact API gets the primary addresses, but there is also an addresses API that gets all the addresses

  const getAddresses = (): IAddressesAPIResult => {
    return SPOOFED_GET_Addresses;
  };

  return {
    getAddresses,
  };
};

export default useAddressesAPI;

