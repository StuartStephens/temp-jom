import { IEmailAddressesAPIResult } from "./EmailAddressTypes";

export const SPOOFED_GET_EmailAddresses: IEmailAddressesAPIResult = JSON.parse(
  JSON.stringify({
    results: [
      {
        Email: "Test@123.com",
        IsPrimary: false,
        Id: "3812c220-3569-ee11-9ae7-00224827241c",
        DoNotEmail: false,
      },
      {
        Email: "test@joelosteen.com",
        IsPrimary: true,
        Id: "a93eb962-1b1d-e811-80e6-000d3a7075d4",
        DoNotEmail: false,
      },
    ],
  })
);

