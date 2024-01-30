import { IDonationsAPIResult } from "./DonationsTypes";

export const SPOOFED_GET_Donations: IDonationsAPIResult = JSON.parse(
  JSON.stringify({
    results: [
      {
        donationId: "1",
        paymentMethod: "VISA ***-1234",
        donationDate: "10-23-2023",
        donationAmount: "100 USD",
      },
      {
        donationId: "2",
        paymentMethod: "VISA ***-2335",
        donationDate: "10-23-2022",
        donationAmount: "10 USD",
      },
    ],
  })
);

