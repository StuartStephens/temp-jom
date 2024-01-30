import {
    ICountryDetailsAPIResult,
    IStateDetailsAPIResult,
} from "../Common/CommonTypes";
import { SPOOFED_GET_CountryDetails } from "./CountriesData";
import {
    SPOOFED_GET_StateDetails_CANADA,
    SPOOFED_GET_StateDetails_USA,
} from "./StatesData";

const useMetaDataAPI = () => {
    // NOTE: Contact API gets the primary addresses, but there is also an addresses API that gets all the addresses

    const getStateDetails = (countryIso3Code: string): IStateDetailsAPIResult => {
        let retVal: IStateDetailsAPIResult = {
            success: true,
            errors: undefined,
            results: [],
        };
        switch (countryIso3Code) {
            case "USA":
                retVal = SPOOFED_GET_StateDetails_USA;
                break;
            case "CAN":
                retVal = SPOOFED_GET_StateDetails_CANADA;
                break;
            default:
                retVal = {
                    success: true,
                    errors: undefined,
                    results: [],
                };
        }
        return retVal;
    };

    const getCountryDetails = (Iso3Code?: string): ICountryDetailsAPIResult => {
        if (Iso3Code && Iso3Code.length) {
            //GET THE SPECIFIC COUNTRY
            return {
                success: true,
                errors: undefined,
                results: [],
            };
        } else {
            //return all the countries
            return SPOOFED_GET_CountryDetails;
        }
    };

    return {
        getStateDetails,
        getCountryDetails,
        // saveAddresses,
    };
};

export default useMetaDataAPI;

