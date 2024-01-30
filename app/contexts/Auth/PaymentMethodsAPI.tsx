import { IPaymentMethodsAPIResult } from "./PaymentMethodTypes";
import { SPOOFED_GET_PaymentMethods } from "./PaymentMethodsData";

const usePaymentMethodsAPI = () => {
  //   const getPaymentMethods = (): IPaymentMethodsAPIResult => {
  //     return SPOOFED_GET_PaymentMethods;
  //   };

  const getPaymentMethods = (): IPaymentMethodsAPIResult => {
    return SPOOFED_GET_PaymentMethods;
  };
  return {
    getPaymentMethods,
    // savePaymentMethods,
  };
};

export default usePaymentMethodsAPI;

