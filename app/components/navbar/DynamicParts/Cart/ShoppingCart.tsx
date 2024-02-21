import { useCart } from "../../../../contexts/Cart/Context";
import { useAuth } from "../../../../contexts/Auth/Context";
import CartItem from "./CartItem";
import React from "react";
import router from "next/router";

import { Container, Modal, Button } from "react-bootstrap";
import Image from "next/image";
// import cartIcon from "../../../../public/static/images/cart-white.svg";

// import carti from "../../../../../public/static/images/cart-white.svg";
interface ShoppingCartProps { }

export default function ShoppingCart({ }: ShoppingCartProps) {
  const { cart, isCartVisible, openCart, closeCart, isLoading } = useCart();
  const { checkIsLoggedIn, openLoginModal, setIsFromCheckout } = useAuth();

  function proceedToCheckout() {
    closeCart();
    if (checkIsLoggedIn()) {
      //   go to checkout page
      router.push("/store/checkout");
    } else {
      //   go to login page
      setIsFromCheckout(true);
      openLoginModal("/store/checkout");
    }
  }

  return (
    <>
      {/* Shopping Cart Icon */}
      <button
        onClick={openCart}
        className="btn nav-link btn-icon-only cart-link"
      >
        <span>{cart?.ItemList?.length}</span>
      </button>

      {/* Shopping Cart Modal */}
      <Modal className="modal-lg" dialogClassName="mb-0" show={isCartVisible} onHide={closeCart}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>View Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Cart Total */}
          <h6 className="text-uppercase text-center">
            {`Cart subtotal (${cart?.ItemList?.length} 
            item${cart?.ItemList?.length === 1 ? "" : "s"}): $${cart?.ItemList?.reduce((sum, item) => sum + item.Product.Price, 0)
                .toFixed(2)}`}
          </h6>
          {/* Cart Items */}
          {isLoading ? (
            <>loading...</>
          ) : (
            <Container className="cart-items">
              {cart?.ItemList?.length ? (
                cart.ItemList.map(item => (
                  <CartItem key={item.Product.Id} item={item.Product} quantity={1} />
                ))
              ) : (
                <div>No items in cart</div>
              )}
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="btn btn-outline-dark" onClick={closeCart}>
            Continue Shopping
          </Button>
          {
            //only show this button if items are in the cart
            cart?.ItemList?.length ? (
              <Button
                variant="primary"
                onClick={proceedToCheckout}
                className=""
              >
                Proceed to Checkout
              </Button>
            ) : ""
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}
