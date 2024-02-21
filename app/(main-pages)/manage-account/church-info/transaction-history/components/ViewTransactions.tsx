"use client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../../../../contexts/Auth/Context";
import { useChurchInfoContext } from "../../../../../contexts/ChurchInfoContext/ChurchInfoContext";
import { IOrderHeader } from "../../../../../contexts/Common/TransactionDetailsTypes";
import { OrderDetails } from "../../../transaction-history/components/TransactionHistory/OrderDetails";
import { TransactionHistory } from "../../../transaction-history/components/TransactionHistory/TransactionHistory";
import { ChurchSelector } from "../../general-information/components/ChurchSelector";
import { LoginRequired } from "../../../../../components/LoginRequired";

export interface IViewTransactionsProps {}

export function ViewTransactions(props: IViewTransactionsProps) {
  const { checkIsLoggedIn } = useAuth();
  const { selectedChurch, setSelectedChurch } = useChurchInfoContext();
  const [selectedOrder, setSelectedOrder] = useState<
    IOrderHeader | undefined
  >();
  return !checkIsLoggedIn() ? (
    <LoginRequired />
  ) : (
    <ChurchSelector>
      {!selectedChurch ? (
        <div>No church selected</div>
      ) : (
        <Container className="full-width mt-3">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onClose={() => {
                setSelectedOrder(undefined);
              }}
              churchId={selectedChurch?.Id}
            />
          ) : (
            <TransactionHistory
              churchId={selectedChurch?.Id}
              onSelectTransaction={(order: IOrderHeader) => {
                setSelectedOrder(order);
              }}
            />
          )}
        </Container>
      )}
    </ChurchSelector>
  );
}
