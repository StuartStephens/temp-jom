import { APIError } from "../Common/CommonTypes";
import { IContactAddress, IDashboardHero } from "./AccountTypes";

export interface IAddressesAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IContactAddress[];
}
export interface IDashboardHeroAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IDashboardHero;
}

