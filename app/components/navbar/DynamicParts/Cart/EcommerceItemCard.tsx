import {
  useState,
  KeyboardEvent,
  FocusEvent,
  MouseEvent,
  useId,
  useEffect,
  useRef,
  Fragment,
  ReactNode,
} from "react";
import Image from "next/image";
import defaultStorePic from "/public/static/images/joelosteen-default-store.png";
import StoreItemQuickViewModal from "../../../../cms/page/StoreListPage/StoreItemQuickViewModal";
import { useCart } from "@components/shared/Context/Cart/Context";
import { Dialog, Transition } from "@headlessui/react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Fade } from "react-bootstrap";
import { defaultShouldDehydrateMutation } from "@tanstack/react-query";
import { getTimestamp } from "swr/_internal";

export interface EcommerceItem {
  AuthorOrProducer: string;
  AvailableQuantity: number;
  CreatedOn: string;
  CurrentCategory: string;
  Description: string;
  Detail1: string;
  Detail2: string;
  DisplayOrder: number;
  DownloadURL: string;
  EndDate: string;
  Id: string;
  Images: ImageObject[];
  IsBackordered: boolean;
  IsDiscountAllowed: boolean;
  IsDonation: boolean;
  IsDownloadable: boolean;
  IsFeatured: boolean;
  IsNew: boolean;
  IsOnSale: boolean;
  IsPreorder: boolean;
  MSRP: number;
  ModifedOn: string;
  Name: string;
  Price: number;
  SKU: string;
  Type: string;
}

interface ImageObject {
  Id: string;
  Type: number;
}

export default function EcommerceItemCard({ item }: { item: EcommerceItem }) {
  const commerceCardId = "commerce-card-id" + useId();
  const actionsMenuRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<EcommerceItem | null>(null);
  const [open, setOpen] = useState(false);

  const { addToCart, openCart } = useCart();
  if (!item || !item.Images) {
    return null; // Or some fallback UI
  }

  function handleAddToCart() {
    setOpen(false);
    addToCart(item);
    openCart();
  }

  function handleOpenModal() {
    setOpen(false);
    setCurrentItem(item);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleBlur = (e: FocusEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleMouseOut = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleClick = (e: MouseEvent) => {
    setOpen(true);
  };

  const handleActionsEntered = () => {
    if (actionsMenuRef && actionsMenuRef.current) {
      actionsMenuRef?.current?.focus();
    }
  };

  const handleKeyDownEvent = (e: KeyboardEvent) => {
    console.log("master keydoa", e);
    if (e.key === "Escape") {
      setOpen(false);
      if (cardRef && cardRef.current) {
        cardRef.current.focus();
      }
    } else if (e.key === "Enter") {
      setOpen(true);
    }
  };

  function navigateToProductPage() {
    //TODO: this should open a product page, but unsure of where to get the link, as the pages here do not have that
    //looks like it navigates to /store/product/${item.SKU}
    handleOpenModal();
  }

  const handleTitleKeyDown = (e: KeyboardEvent) => {
    console.log("title ekydown", e);
    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      navigateToProductPage();
    }
  };

  const handleTitleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigateToProductPage();
  };

  return (
    <Card className="e-commerce-item-card shadow">
      <Container fluid className="p-0 position-relative text-center">
        <div
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onKeyDown={handleKeyDownEvent}
          onBlur={handleBlur}
          tabIndex={0}
          className="ps-0 pe-0 e-commerce-item-card-overlay container-fluid justify-content-center align-items-center "
          aria-controls={`${commerceCardId}-actions`}
          aria-expanded={open}
          aria-labelledby={`${commerceCardId}-menu-instructions ${commerceCardId}-cardbody`}
          role="button"
          ref={cardRef}
        >
          <label
            className="e-commerce-item-card-overlay-instructions"
            id={`${commerceCardId}-menu-instructions`}
          >
            Press enter to view available actions
          </label>
          <Fade in={open} onEntered={handleActionsEntered}>
            <div
              id={`${commerceCardId}-actions`}
              ref={actionsMenuRef}
              tabIndex={0}
              aria-label="Actions Menu - press escape to return to product information"
              role="menu"
              className={`${open ? "" : "e-commerce-item-card-overlay-bg-hidden"
                } ps-0 pe-0 e-commerce-item-card-overlay-bg container-fluid justify-content-center align-items-center`}
            >
              <div
                role="presentation"
                aria-label={`Actions for ${item.Name} `}
                className="e-commerce-item-card-actions"
              >
                <Button
                  role="menuitem"
                  variant="jombutton"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  role="menuitem"
                  variant="outline-light"
                  onClick={handleOpenModal}
                >
                  Quick View
                </Button>
              </div>
            </div>
          </Fade>
        </div>
        <Card.Img
          variant="top"
          src={
            item.Images?.[0]?.Id
              ? `https://lwcrmapi-mig2.lakewoodchurch.com/api/Product/ImageSrc/${item.Images[0].Id}`
              : defaultStorePic.src
          }
          alt={item.Name}
          className="mx-auto"
        />
      </Container>

      <Card.Body id={`${commerceCardId}-cardbody`}>
        <Card.Text>
          <Container
            className="clickable-area"
            tabIndex={0}
            fluid
            onKeyDown={handleTitleKeyDown}
            onClick={handleTitleClick}
          >
            <Row>
              <Col className=" pt-2">
                <div className="d-flex text-nowrap">
                  <span className="text-truncate flex-fill">
                    {item.IsNew && <span className="text-hilite">New - </span>}
                    <span className="fw-medium">{item.Name}</span>
                  </span>
                  <span className=" text-nowrap flex-fill text-end ">
                    {item.IsOnSale && (
                      <>
                        <span className="fs-6 text-decoration-line-through text-muted pe-1">
                          ${item.MSRP}
                        </span>
                      </>
                    )}
                    <span>${item.Price}</span>
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="flex justify-between items-center">
                  <p className="text-left text-muted">
                    {item.AuthorOrProducer}
                  </p>
                  <p className=" text-muted">{item.Detail1}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Text>
      </Card.Body>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-50 inset-0 overflow-y-auto"
          open={showModal}
          onClose={setShowModal}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <StoreItemQuickViewModal
              item={currentItem}
              onClose={handleCloseModal}
            />
          </div>
        </Dialog>
      </Transition.Root>
    </Card>
  );
}
