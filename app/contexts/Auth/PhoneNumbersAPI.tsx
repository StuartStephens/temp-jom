import { SPOOFED_GET_PhoneNumbers } from "./PhoneNumbersData";
import { IPhoneNumbersAPIResult } from "./PhoneNumbersTypes";

const usePhoneNumbersAPI = () => {
  // NOTE: Contact API gets the primary addresses, but there is also an addresses API that gets all the addresses

  const getPhoneNumbers = (): IPhoneNumbersAPIResult => {
    return SPOOFED_GET_PhoneNumbers;
  };

  return {
    getPhoneNumbers,
    // savePhoneNumbers,
  };
};

export default usePhoneNumbersAPI;

