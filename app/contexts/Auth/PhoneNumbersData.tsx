import { IPhoneNumbersAPIResult } from "./PhoneNumbersTypes";

export const SPOOFED_GET_PhoneNumbers: IPhoneNumbersAPIResult = JSON.parse(
  JSON.stringify({
    results: [
      {
        Phone: "15456456456",
        IsPrimary: false,
        AllowSMS: false,
        DoNotCall: false,
        IsMobile: false,
        Id: "ef339f78-5769-ee11-9ae7-0022482724a8",
      },
      {
        Phone: "15555555556",
        IsPrimary: false,
        AllowSMS: false,
        DoNotCall: false,
        IsMobile: false,
        Id: "25101831-3b69-ee11-9ae7-000d3a1cac28",
      },
      {
        Phone: "15555555555",
        IsPrimary: false,
        AllowSMS: false,
        DoNotCall: false,
        IsMobile: false,
        Id: "8d661425-3b69-ee11-9ae7-000d3a1cac28",
      },
    ],
  })
);

