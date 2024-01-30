import { IAddressesAPIResult, IDashboardHeroAPIResult } from "./AddressesTypes";

export const SPOOFED_GET_Addresses: IAddressesAPIResult = JSON.parse(
  JSON.stringify({
    results: [
      {
        Id: "c809bbd9-ff6d-ee11-8df0-0022482720c1",
        CustomerId: "a33eb962-1b1d-e811-80e6-000d3a7075d4",
        FirstName: "Billy",
        LastName: " Muffin",
        IsPrimary: false,
        IsDefaultBilling: false,
        IsDefaultShipping: false,
        IsSelected: false,
        City: "Annandale",
        StateDetail: {
          Name: "Virginia",
          Iso2Code: "VA",
          Country: {
            Name: "UNITED STATES",
            Iso2Code: "US",
            Iso3Code: "USA",
            IsSelected: false,
            CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
            Id: "752029fe-6ea9-df11-9532-005056954cab",
          },
          IsSelected: false,
        },
        DoNotMail: false,
        State: "Virginia",
        CountryDetail: {
          Name: "UNITED STATES",
          Iso2Code: "US",
          Iso3Code: "USA",
          IsSelected: false,
          CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
          Id: "752029fe-6ea9-df11-9532-005056954cab",
        },
        Country: "UNITED STATES",
        Summary:
          "7619 Little River Turnpike, , Annandale, Virginia, 22003, UNITED STATES",
        Latitude: 0.0,
        Longitude: 0.0,
        Line1: "7619 Little River Turnpike",
        Line2: "",
        Person: "Billy Muffin",
        Name: "",
        PostalCode: "22003",
        HasBasicData: true,
      },
      {
        Id: "5ce3083e-d721-4344-b6c6-06ee059152a4",
        CustomerId: "a33eb962-1b1d-e811-80e6-000d3a7075d4",
        FirstName: null,
        LastName: null,
        IsPrimary: false,
        IsDefaultBilling: false,
        IsDefaultShipping: true,
        IsSelected: false,
        City: "Nashville",
        StateDetail: {
          Name: "Tennessee",
          Iso2Code: "TN",
          Country: {
            Name: "UNITED STATES",
            Iso2Code: "US",
            Iso3Code: "USA",
            IsSelected: false,
            CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
            Id: "752029fe-6ea9-df11-9532-005056954cab",
          },
          IsSelected: false,
        },
        DoNotMail: false,
        State: "Tennessee",
        CountryDetail: {
          Name: "UNITED STATES",
          Iso2Code: "US",
          Iso3Code: "USA",
          IsSelected: false,
          CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
          Id: "752029fe-6ea9-df11-9532-005056954cab",
        },
        Country: "UNITED STATES",
        Summary:
          "116 Rep. John Lewis Way North, , Nashville, Tennessee, 37219, UNITED STATES",
        Latitude: 0.0,
        Longitude: 0.0,
        Line1: "116 Rep. John Lewis Way North",
        Line2: "",
        Person: null,
        Name: "",
        PostalCode: "37219",
        HasBasicData: true,
      },
      {
        Id: "d43f7264-8ba7-4dd2-97ca-2f4353cca170",
        CustomerId: "a33eb962-1b1d-e811-80e6-000d3a7075d4",
        FirstName: null,
        LastName: null,
        IsPrimary: false,
        IsDefaultBilling: true,
        IsDefaultShipping: false,
        IsSelected: false,
        City: "Nashville",
        StateDetail: {
          Name: "Tennessee",
          Iso2Code: "TN",
          Country: {
            Name: "UNITED STATES",
            Iso2Code: "US",
            Iso3Code: "USA",
            IsSelected: false,
            CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
            Id: "752029fe-6ea9-df11-9532-005056954cab",
          },
          IsSelected: false,
        },
        DoNotMail: false,
        State: "Tennessee",
        CountryDetail: {
          Name: "UNITED STATES",
          Iso2Code: "US",
          Iso3Code: "USA",
          IsSelected: false,
          CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
          Id: "752029fe-6ea9-df11-9532-005056954cab",
        },
        Country: "UNITED STATES",
        Summary:
          "116 Rep. John Lewis Way North, , Nashville, Tennessee, 37219, UNITED STATES",
        Latitude: 0.0,
        Longitude: 0.0,
        Line1: "116 Rep. John Lewis Way North",
        Line2: "",
        Person: null,
        Name: "",
        PostalCode: "37219",
        HasBasicData: true,
      },
      {
        Id: "8cf1ea5c-7159-42ab-8877-6d916988968a",
        CustomerId: "a33eb962-1b1d-e811-80e6-000d3a7075d4",
        FirstName: null,
        LastName: null,
        IsPrimary: true,
        IsDefaultBilling: false,
        IsDefaultShipping: false,
        IsSelected: false,
        City: "Nashville",
        StateDetail: {
          Name: "Tennessee",
          Iso2Code: "TN",
          Country: {
            Name: "UNITED STATES",
            Iso2Code: "US",
            Iso3Code: "USA",
            IsSelected: false,
            CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
            Id: "752029fe-6ea9-df11-9532-005056954cab",
          },
          IsSelected: false,
        },
        DoNotMail: false,
        State: "Tennessee",
        CountryDetail: {
          Name: "UNITED STATES",
          Iso2Code: "US",
          Iso3Code: "USA",
          IsSelected: false,
          CurrencyId: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
          Id: "752029fe-6ea9-df11-9532-005056954cab",
        },
        Country: "UNITED STATES",
        Summary:
          "116 Rep. John Lewis Way North, , Nashville, Tennessee, 37219, UNITED STATES",
        Latitude: 0.0,
        Longitude: 0.0,
        Line1: "116 Rep. John Lewis Way North",
        Line2: "",
        Person: null,
        Name: "",
        PostalCode: "37219",
        HasBasicData: true,
      },
    ],
  })
);

export const SPOOFED_GET_DashboardHero: IDashboardHeroAPIResult = JSON.parse(
  JSON.stringify({
    Contact: {
      Id: "3302a646-1536-ee11-bdf4-000d3a190fe1",
      IsLoggedIn: true,
      IsGuest: false,
      IsPartner: false,
      Security: {
        IsAdmin: false,
        SecurityRoles: null,
        SecurityFlags: null,
        SecurityAuthority: null,
      },
      Address: {
        Id: "b8063c8c-6264-4fec-aee0-238d9a8718f5",
        FirstName: "Don",
        LastName: "Test",
        IsPrimary: true,
        IsDefaultBilling: false,
        IsDefaultShipping: false,
        IsSelected: false,
        City: "INDIAN TRAIL",
        StateDetail: {
          Name: "North Carolina",
          Iso2Code: "NC",
          Country: null,
          IsSelected: false,
        },
        State: "NC",
        CountryDetail: {
          Name: "UNITED STATES",
          Iso2Code: "US",
          Iso3Code: "USA",
          IsSelected: false,
          Id: "752029fe-6ea9-df11-9532-005056954cab",
        },
        Country: "UNITED STATES",
        Latitude: 0,
        Longitude: 0,
        Line1: "5507 Fulton Ridge Drive",
        Line2: "Suite 4",
        Person: null,
        Name: null,
        PostalCode: "28079",
        HasBasicData: true,
      },
      BirthDate: null,
      DoNotEmail: false,
      DoNotPhone: true,
      DoNotPostalMail: false,
      PrimaryEmailAddress: "ven-dobrien@lakewood.cc",
      FirstName: "Don",
      LastName: "Test",
      FullName: "Don Test",
      Gender: 3,
      Acno: "C011006381",
      Discount: 0,
      Facebook: null,
      Instagram: null,
      Twitter: null,
      LastLogin: "2023-11-02T17:14:21Z",
      IsPrivate: false,
      PhoneNumber: null,
      SiteCode: "JOM",
      Sourcecode: "2300JW",
      CreatedOn: "2023-08-08T17:59:18Z",
      LastDonationAmount: 0,
      HighestDonationAmount: 0,
      AverageDonationAmount: 0,
      GiftAskLow: 10,
      GiftAskMid: 15,
      GiftAskHigh: 25,
      JOMMobile: null,
      LWCMobile: null,
      DonorFrequency: "",
      DonorType: "",
      GivingHistory: [
        {
          Key: "2023",
          Value: 0,
        },
      ],
      AuthToken: null,
      RedirectUrl: null,
      DefaultCurrency: {
        Id: "2910ccf8-ec75-e611-80ca-000d3a7075d4",
        Name: "US Dollar",
        Symbol: "$",
        Iso3Code: "USD",
        IsSelected: false,
      },
      Church: null,
    },
    EmailMD5Hash: "b3ba76850de38f3f8e76ce639dac6b7f",
  })
);

