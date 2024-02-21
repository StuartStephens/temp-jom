"use client";
import { Container } from "react-bootstrap";
import { OrderDetails } from "../../components/TransactionHistory/OrderDetails";
import { useState } from "react";
import { TransactionHistory } from "./TransactionHistory";
import { IOrderHeader } from "../../../../../contexts/Common/TransactionDetailsTypes";

export interface ITransactionHistoryProps {}

export function TransactionHistoryContents(props: ITransactionHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<
    IOrderHeader | undefined
  >();

  return (
    <Container>
      {selectedOrder ? (
        <OrderDetails
          order={selectedOrder}
          onClose={() => {
            setSelectedOrder(undefined);
          }}
        />
      ) : (
        <TransactionHistory
          onSelectTransaction={(order: IOrderHeader) => {
            setSelectedOrder(order);
          }}
        />
      )}
    </Container>
  );
}
