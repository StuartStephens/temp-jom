import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { IOrderHeader } from "../../../../../contexts/Common/TransactionDetailsTypes";
import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import { useAuth } from "../../../../../contexts/Auth/Context";
import {
  formatDate,
  formatPrice,
} from "../../../../../contexts/utilities/FormatUtils";
import { getOrderStatus } from "./OrderUtils";

export interface ITransactionHistoryProps {
  onSelectTransaction: (order: IOrderHeader) => void;
}

export function TransactionHistory(props: ITransactionHistoryProps) {
  const { fetchAPI } = useAuth();
  const { onSelectTransaction } = props;
  // const { getOrderHeaders } = useTransactionHistoryAPI();
  const [transactions, setTransactions] = useState<IOrderHeader[]>([]);

  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [pagesLoaded, setPagesLoaded] = useState(1);

  const [pageCount, setPageCount] = useState(0);

  function updateOrderHeaders(page: number, count: number) {
    async function getOrderHeaders(page: number, count: number) {
      //if (checkIsLoggedIn()) {
      setIsLoading(true);
      try {
        const response = await fetchAPI(
          `Contact/Orders/${page}/${count}`,
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
    getOrderHeaders(page, count);
  }

  useEffect(() => {
    // const apiResults: IOrderHeadersAPIResult = getOrderHeaders();
    // if (
    //   !apiResults.errors ||
    //   (apiResults.errors.length < 1 && apiResults.results)
    // ) {
    //   setTransactions(apiResults.results);
    // }
    updateOrderHeaders(1, 20);
    // eslint-disable-next-line
  }, []);

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
  return (
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
          <p>You currently have no transacitons</p>
        </Container>
      )}
    </div>
  );
}
