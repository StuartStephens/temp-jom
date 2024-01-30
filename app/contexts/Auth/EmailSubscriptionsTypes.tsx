import { APIError } from "../Common/CommonTypes";

export interface IEmailSubscription {
  ListName: string;
  IsSubscribed: boolean;
  EmailAddress: string;
  OptedIn: boolean;
  OptedOut: boolean;
  Status: string;
  Description: string;
  ListTitle: string;
  Organization: string;
  IsInterest: boolean;
  Site: any;
}

export interface IEmailSubscription_Post {
  EmailAddress: string;
  EmailListsToAdd: string[];
  EmailListsToRemove: string[];
}

export interface IEmailSubscriptionsAPIResult {
  success: boolean;
  errors?: APIError[];
  results: IEmailSubscription[];
}
