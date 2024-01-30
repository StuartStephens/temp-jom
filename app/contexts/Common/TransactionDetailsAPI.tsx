import {
    SPOOFED_GET_OrderHeaders,
    SPOOFED_GET_OrderDetails,
} from "./TransactionDetailsData";
import {
    IOrderHeadersAPIResult,
    IOrderDetailsAPIResult,
} from "./TransactionDetailsTypes";

const useTransactionDetailsAPI = () => {
    const getOrderDetails = (): IOrderDetailsAPIResult => {
        return SPOOFED_GET_OrderDetails;
    };
    const getOrderHeaders = (): IOrderHeadersAPIResult => {
        return SPOOFED_GET_OrderHeaders;
    };
    return {
        getOrderDetails,
        getOrderHeaders,
    };
};

export default useTransactionDetailsAPI;

