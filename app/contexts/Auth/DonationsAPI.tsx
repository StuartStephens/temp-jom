import { SPOOFED_GET_Donations } from "./DonationsData";
import { IDonationsAPIResult } from "./DonationsTypes";

const useDonationAPI = () => {
  // NOTE: Contact API gets the primary addresses, but there is also an addresses API that gets all the addresses

  const getDonations = (): IDonationsAPIResult => {
    return SPOOFED_GET_Donations;
  };

  return {
    getDonations,
    // saveDonation,
  };
};

export default useDonationAPI;

