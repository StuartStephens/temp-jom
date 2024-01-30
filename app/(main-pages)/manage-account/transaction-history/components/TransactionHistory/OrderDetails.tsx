import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import {
  IOrderHeader,
  IShoppingCartItem,
} from "../../../../../contexts/Common/TransactionDetailsTypes";
import { useAuth } from "../../../../../contexts/Auth/Context";
import {
  formatDate,
  formatPrice,
  printPage,
} from "../../../../../contexts/utilities/FormatUtils";
import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import { getOrderStatus } from "./OrderUtils";
import Link from "next/link";

export interface ITransactionHistoryProps {
  order: IOrderHeader | undefined;
  onClose: (orderDetails: IOrderHeader) => void;
}

export function OrderDetails(props: ITransactionHistoryProps) {
  // const { getOrderDetails } = useTransactionDetailsAPI();
  const [orderDetails, setOrderDetails] = useState<IOrderHeader>();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchAPI } = useAuth();
  const { order, onClose } = props;

  function updateOrderDetails(id: string) {
    async function getOrderDetails(id: string) {
      setIsLoading(true);
      try {
        const response = await fetchAPI(`Contact/Order/${id}`, undefined, "GET")
          .then((response: any) => response.json())
          .then((data: any) => {
            setOrderDetails(data);
          });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    getOrderDetails(id);
  }
  useEffect(() => {
    order && order.Id && updateOrderDetails(order.Id);
  }, []);
  useEffect(() => {
    order && order.Id && updateOrderDetails(order.Id);
  }, [order]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!orderDetails) {
    return <Container>SELECT AN ORDER BELOW TO VIEW DETAILS</Container>;
  }
  return (
    <Container>
      <Row>
        <Breadcrumb>
          {/* eslint-disable-next-line */}
          <BreadcrumbItem
            onClick={() => {
              onClose(orderDetails);
            }}
          >
            &lt; Transaction History
            {/* <Link href="/manage-account/transaction-history">
              &lt; Transaction History
            </Link> */}
          </BreadcrumbItem>
        </Breadcrumb>
      </Row>

      {orderDetails && (
        <>
          <Container>
            <Row>
              <h2>Order Number {orderDetails?.OrderNumber}</h2>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <Table borderless striped={false}>
                  <tbody>
                    <tr>
                      <th>
                        <strong>
                          {orderDetails?.OrderItems?.length} Items
                        </strong>
                      </th>
                      <td>
                        {formatPrice(
                          orderDetails.ProductTotal,
                          orderDetails.Currency
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <strong>Order Status</strong>
                      </th>
                      <td>{getOrderStatus(orderDetails.Status)}</td>
                    </tr>
                    <tr>
                      <th>
                        <strong>Order Date</strong>
                      </th>
                      <td>{formatDate(orderDetails.OrderDate)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col
                xs={12}
                md={4}
                className="d-flex flex-row align-content-start flex-wrap justify-content-end"
              >
                <Button
                  variant="primary"
                  href="#"
                  onClick={() => {
                    printPage();
                  }}
                >
                  Print Receipt
                </Button>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <h3>Transaction History</h3>
            </Row>
            {orderDetails.OrderItems && (
              <Row>
                <Col xs={12}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    {orderDetails.OrderItems.map((o: IShoppingCartItem) => {
                      return (
                        <tbody key={`ITEM_${o.Id}`}>
                          <tr>
                            <td>{o?.Product?.Name}</td>
                            <td>{o?.Product?.Type}</td>
                            <td>{o?.Quantity}</td>
                            <td>{o?.Amount}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </Table>
                </Col>
              </Row>
            )}
          </Container>
          <Table borderless striped={false}>
            <tbody>
              <tr>
                <th>
                  <strong>Currency</strong>
                </th>
                <td>{orderDetails.Currency.Iso3Code}</td>
              </tr>
              <tr>
                <th>
                  <strong>Purchase Subtotal</strong>
                </th>
                <td>
                  {formatPrice(
                    orderDetails.ProductTotal,
                    orderDetails.Currency
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <strong>Shipping</strong>
                </th>
                <td>
                  {formatPrice(orderDetails.Shipping, orderDetails.Currency)}
                </td>
              </tr>
              <tr>
                <th>
                  <strong>Tax</strong>
                </th>
                <td>{formatPrice(orderDetails.Tax, orderDetails.Currency)}</td>
              </tr>
              <tr>
                <th>
                  <strong>Discounts</strong>
                </th>
                <td>
                  -{formatPrice(orderDetails.Discount, orderDetails.Currency)}
                </td>
              </tr>
              <tr>
                <th>
                  <strong>Total</strong>
                </th>
                <td>
                  {formatPrice(orderDetails.Total, orderDetails.Currency)}
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
