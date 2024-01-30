export interface APIError {
    errorId: string;
    errorMessage: string;
}

export interface IStateDetailsAPIResult {
    success: boolean;
    errors?: APIError[];
    results: IStateDetail[];
}

export interface ICountryDetailsAPIResult {
    success: boolean;
    errors?: APIError[];
    results: ICountryDetail[];
}

export interface ICountryDetail {
    Name: string;
    Iso2Code: string;
    Iso3Code: string;
    IsSelected: boolean;
    CurrencyId: string;
    Id: string;
}

export interface IStateDetail {
    Name: string;
    Iso2Code: string;
    Country: string;
    IsSelected: boolean;
}

