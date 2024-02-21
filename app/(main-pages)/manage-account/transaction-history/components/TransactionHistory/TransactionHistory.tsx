import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingSpinner } from "../../../../../../app/components/LoadingSpinner";
import { useAuth } from "../../../../../../app/contexts/Auth/Context";
import { LoginRequired } from "../../../../../components/LoginRequired";
import { IOrderHeader } from "../../../../../contexts/Common/TransactionDetailsTypes";
import {
  formatDate,
  formatPrice,
} from "../../../../../contexts/utilities/FormatUtils";
import { getOrderStatus } from "./OrderUtils";

export interface ITransactionHistoryProps {
  onSelectTransaction: (order: IOrderHeader) => void;
  churchId?: string;
}

export function TransactionHistory(props: ITransactionHistoryProps) {
  const { checkIsLoggedIn, contactInfo } = useAuth();
  const { fetchAPI } = useAuth();
  const { onSelectTransaction } = props;
  // const { getOrderHeaders } = useTransactionHistoryAPI();
  const [transactions, setTransactions] = useState<IOrderHeader[]>([]);

  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [churchId, setChurchId] = useState<string | undefined>(props?.churchId);

  const [pageCount, setPageCount] = useState(0);

  function updateOrderHeaders(page: number, count: number, churchId?: string) {
    async function getOrderHeaders(
      page: number,
      count: number,
      churchId?: string
    ) {
      //if (checkIsLoggedIn()) {

      setIsLoading(true);
      try {
        //calls a different url depending on the church id
        const response = await fetchAPI(
          `Contact/Orders/${page}/${count}${
            churchId ? "?churchId=" + churchId : ""
          }`,
          undefined,
          "GET"
        )
          .then((response: any) => response.json())
          .then((data: any) => {
            setTransactions(data);
          });
        //}
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (!page) {
      page = 1;
    }
    if (!count) {
      count = 10;
    }
    getOrderHeaders(page, count, churchId);
  }

  useEffect(() => {
    updateOrderHeaders(1, 20, props.churchId);
    setChurchId(props?.churchId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateOrderHeaders(1, 20, props.churchId);
    setChurchId(props?.churchId);
    // eslint-disable-next-line
  }, [contactInfo]);

  useEffect(() => {
    setPageCount(
      transactions ? Math.ceil(transactions.length / rowsPerPage) : 1
    );
  }, [transactions, rowsPerPage]);

  const canLoadNextPage = () => {
    return rowsPerPage * (pagesLoaded + 1) <= transactions.length;
  };

  function handleShowMore() {
    if (canLoadNextPage()) {
      setPagesLoaded(pagesLoaded + 1);
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return !checkIsLoggedIn() ? (
    <LoginRequired />
  ) : (
    <div>
      <Container>
        <h2>Transaction History</h2>
      </Container>
      {transactions && transactions.length > 0 ? (
        <Container>
          <Table>
            <thead>
              <tr>
                <th id="#top">Order #</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Order Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions
                  .slice(0, pagesLoaded * rowsPerPage)
                  .map((transaction: IOrderHeader) => {
                    return (
                      <tr key={transaction.Id}>
                        <td>
                          <Button
                            variant="Link"
                            onClick={() => {
                              onSelectTransaction(transaction);
                            }}
                            className="btn-link"
                          >
                            {transaction.OrderNumber}
                          </Button>
                        </td>
                        <td>{formatDate(transaction.OrderDate)}</td>
                        <td>{getOrderStatus(transaction.Status)}</td>
                        <td>
                          {formatPrice(transaction.Total, transaction.Currency)}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
          <Container>
            <Row>
              <Col>
                <p>
                  Showing {pagesLoaded} of {pageCount}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-row justify-content-center gap-3">
                {canLoadNextPage() && (
                  <Button variant="outline-primary" onClick={handleShowMore}>
                    Show More
                  </Button>
                )}

                <Button variant="outline-primary" href="#top">
                  Back to Top
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      ) : (
        <Container>
          <p>You currently have no transactions</p>
        </Container>
      )}
    </div>
  );
}
