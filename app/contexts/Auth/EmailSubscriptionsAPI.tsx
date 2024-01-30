import {
  SPOOFED_GET_EmailSubscriptions_EMAIL_1,
  SPOOFED_GET_EmailSubscriptions_EMAIL_2,
  SPOOFED_GET_EmailSubscriptions_EMAIL_3,
} from "./EmailSubscriptionsData";
import {
  IEmailSubscription_Post,
  IEmailSubscriptionsAPIResult,
} from "./EmailSubscriptionsTypes";

const useEmailSubscriptionAPI = () => {
  //   const getEmailSubscriptions = (): IEmailSubscriptionsAPIResult => {
  //     return SPOOFED_GET_EmailSubscriptions;
  //   };

  const getEmailSubscriptionsByEmail = (
    emailAddress: string
  ): IEmailSubscriptionsAPIResult => {
    alert("why using this?");
    // return emailAddress !== "test@joelosteen.com";
    switch (emailAddress) {
      case "test@joelosteen.com":
        return SPOOFED_GET_EmailSubscriptions_EMAIL_1;
      case "ven-dobrien@lakewood.cc":
        return SPOOFED_GET_EmailSubscriptions_EMAIL_3;
      default:
        return SPOOFED_GET_EmailSubscriptions_EMAIL_2;
    }
    return SPOOFED_GET_EmailSubscriptions_EMAIL_2;
  };

  const postSubsciptions = (
    value: IEmailSubscription_Post,
    callback: Function
  ): void => {
    //TODO: call API POST /api/Contact/Subscriptions
    //TODO: callback - update the local state with new values
    callback().apply(null);
  };

  return {
    getEmailSubscriptionsByEmail,
    // saveEmailSubscription,
  };
};

export default useEmailSubscriptionAPI;
