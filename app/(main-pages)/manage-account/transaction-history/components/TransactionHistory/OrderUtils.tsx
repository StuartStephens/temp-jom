export enum ORDER_STATUS {
  PROCESSING = "Processing",
  SUBMITTED = "Submitted",
  COMPLETED = "Completed",
}
//TODO: need to know the true values of these
export const getOrderStatus = (status: number): string => {
  let orderStatusText: string = "";
  switch (status) {
    case 1:
      orderStatusText = ORDER_STATUS.PROCESSING;
      break;
    case 2:
      orderStatusText = ORDER_STATUS.SUBMITTED;
      break;
    case 3:
      orderStatusText = ORDER_STATUS.COMPLETED;
      break;
    default:
      orderStatusText = "";
  }
  return orderStatusText;
};
