import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth/Context";
import { SPOOFED_GET_EmailAddresses } from "./EmailAddressData";
import { IEmailAddress, IEmailAddressesAPIResult } from "./EmailAddressTypes";

const useEmailAddressAPI = () => {
  const { fetchAPI } = useAuth();
  // NOTE: Contact API gets the primary addresses, but there is also an addresses API that gets all the addresses

  const getEmailAddresses_spoofed = (): IEmailAddressesAPIResult => {
    return SPOOFED_GET_EmailAddresses;
  };

  const getEmailAddresses = () => fetchAPI("Contact/EmailAddresses", {}, "GET");

  return {
    getEmailAddresses,
    getEmailAddresses_spoofed,
    // saveEmailAddress,
  };
};

export default useEmailAddressAPI;

