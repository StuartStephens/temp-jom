"use client";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  ContentListItem,
  IContentListItem,
} from "../ContentList/ContentListItem";
import SearchSortFilter, { SortOption } from "./SearchSortFilter";
import { useEffect, useState } from "react";
import { CONTENT_TYPES } from "../../types";

export interface IGrowingListProps {
  contentType: CONTENT_TYPES; // "MESSAGE" | "BLOG" | "ARTICLE"
  contentList: IContentListItem[];
  showSearchControls?: boolean;
  itemsPerRow?: number;
  itemsPerPage?: number;
}

export default function GrowingList({
  contentType,
  contentList,
  showSearchControls = true,
  itemsPerRow = 3, //at medium or larger
  itemsPerPage = 9,
}: IGrowingListProps) {
  const [displayList, setDisplayList] = useState<IContentListItem[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState("");
  const [prayerPropertyFilter, setPrayerPropertyFilter] = useState("");
  const [topicsFilter, setTopicsFilter] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(itemsPerPage);
  const [filteredList, setFilteredList] = useState<IContentListItem[]>([]);

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  function handleAuthorChange(value: string) {
    if (value === "Any") {
      setAuthorFilter("");
    } else {
      setAuthorFilter(value);
    }
  }

  function handlePrayerPropertyChanged(value: string) {
    if (value === "Any") {
      setPrayerPropertyFilter("");
    } else {
      setPrayerPropertyFilter(value);
    }
  }

  function handleFormatChange(value: string) {
    if (value === "Any") {
      setFormatFilter("");
    } else {
      setFormatFilter(value);
    }
  }

  //TODO: this will need to handle several facets
  function handleTopicsChange(topics: string[]) {
    setTopicsFilter(topics);
  }
  function handleSortChange(value: string) {
    setSortOrder(value);
  }

  function showMoreContentItems() {
    const newItems = contentList.slice(currentIndex, currentIndex + 9);
    setCurrentIndex((prevIndex) => prevIndex + 9);
    setDisplayList((prevDisplayList) => [...prevDisplayList, ...newItems]);
  }

  function handleClearFilters() {
    setSearchTerm("");
    setAuthorFilter("");
    setFormatFilter("");
    setTopicsFilter([]);
    setSortOrder("newest");
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // TODO: need to determine how these filters are calculated. Making an educated guess here.
  function filterPrayerProperty(product: IContentListItem) {
    switch (prayerPropertyFilter) {
      case "newer":
        return (
          new Date(product.date).valueOf() >
          Date.now() - 5 * (1000 * 60 * 60 * 24).valueOf()
        );
        break;
      case "likes":
        return (
          product.prayerProperties && product.prayerProperties.likeCount > 0
        );
        break;
      case "user":
        return (
          product.prayerProperties &&
          product.prayerProperties.likedByCurrentUser
        );
        break;
      case "followed":
        return (
          product.prayerProperties &&
          product.prayerProperties.repliedToByCurrentUser
        );
        break;
      default:
        return true;
        break;
    }
  }

  useEffect(() => {
    console.log("GROWING LIST contentList", contentList);
    let filteredProducts = contentList
      .filter((contentItem) =>
        contentItem.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        authorFilter ? product.speaker === authorFilter : true
      )
      .filter((product) =>
        formatFilter ? product.format === formatFilter : true
      )
      .filter(
        (product) =>
          topicsFilter.length === 0 ||
          !product.topics ||
          product.topics.some(
            (topic) => topicsFilter && topicsFilter.indexOf(topic) > -1
          )
      );
    if (contentType === CONTENT_TYPES.PRAYER) {
      filteredProducts = filteredProducts.filter(filterPrayerProperty);
    }

    switch (sortOrder) {
      case "oldest":
        filteredProducts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "newest":
        filteredProducts.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "AtoZ":
        filteredProducts.sort();
        break;
      case "ZtoA":
        filteredProducts.sort();
        filteredProducts.reverse();
        break;

      default:
    }
    setFilteredList(filteredProducts);
    setDisplayList(filteredProducts.slice(0, currentIndex));
  }, [
    contentList,
    currentIndex,
    authorFilter,
    prayerPropertyFilter,
    formatFilter,
    topicsFilter,
    searchTerm,
    sortOrder,
  ]);
  if (displayList.length > 9) {
    window.scrollTo({
      top: window.scrollY + 295, // scroll down 295px aka the height of an image
      behavior: "smooth",
    });
  }

  let filters: string[] = [];
  let sortOptions: SortOption[] = [];
  switch (contentType) {
    case CONTENT_TYPES.BLOG:
      filters = ["author", "topic", "search"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
    case CONTENT_TYPES.ARTICLE:
      filters = ["author", "topic", "search"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
    case CONTENT_TYPES.MESSAGE:
      filters = ["author", "topic", "search"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
    case CONTENT_TYPES.WALLPAPER:
      filters = ["topic", "search"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "AtoZ", displayValue: "A - Z" },
        { value: "ZtoA", displayValue: "Z - A" },
      ];
      break;
    case CONTENT_TYPES.PRAISE:
      filters = ["search"];
      sortOptions = [];
      break;
    case CONTENT_TYPES.PRAYER:
      filters = ["prayerProperties", "search"];
      // sortOptions = [
      //   { value: "newest", displayValue: "Newest" },
      //   { value: "likes", displayValue: "Requests that Need Prayers" },
      //   { value: "user", displayValue: "Prayers" },
      //   { value: "followed", displayValue: "Followed Prayers" },
      // ];

      break;
    case CONTENT_TYPES.BOOK:
      filters = ["author", "search", "format"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
    case CONTENT_TYPES.MUSIC:
      filters = ["author", "search", "format"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
    case CONTENT_TYPES.SERIES:
      filters = ["author", "search", "format"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
    case CONTENT_TYPES.GIFT:
      filters = ["author", "search", "format"];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
    default:
      filters = [];
      sortOptions = [
        { value: "newest", displayValue: "Newest" },
        { value: "oldest", displayValue: "Oldest" },
      ];
      break;
  }

  return (
    <Container fluid className="full-width growing-list">
      {showSearchControls && (
        <SearchSortFilter
          filters={filters}
          sortOptions={sortOptions}
          contentList={contentList}
          onSearchChange={handleSearchChange}
          onAuthorChange={handleAuthorChange}
          onFormatChange={handleFormatChange}
          onTopicsChange={handleTopicsChange}
          onPrayerPropertyChanged={handlePrayerPropertyChanged}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />
      )}

      {displayList && displayList.length > 0 && (
        <Container
          fluid
          className="content-list mb-2 page-gutter page-gutter-small"
        >
          <Row className="gy-0 gx-3 gy-md-3" xs={1} md={itemsPerRow}>
            {displayList.map((contentItem, index) => {
              return (
                <Col key={contentItem.messageID} className="">
                  <ContentListItem contentListItem={contentItem} />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}

      {showSearchControls && (
        <Container fluid className="full-width py-2">
          {(!filteredList || filteredList.length < 1) && (
            <Container fluid className="full-width">
              <Row className="gy-0 gx-3 gy-md-3" xs={1}>
                <Col className="text-center fs-5">
                  <strong>
                    There are no items available with your current filter
                    selections.
                  </strong>
                </Col>
              </Row>
            </Container>
          )}
          {displayList && displayList.length > 0 && (
            <Container fluid className="full-width">
              <Row>
                <Col className="text-center fs-5 ">
                  <strong>
                    {`Showing ${currentIndex / itemsPerPage} of ${Math.ceil(
                      filteredList && filteredList.length / itemsPerPage
                    )}`}
                  </strong>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center mt-2 mb-5">
                  {displayList.length < contentList.length &&
                    currentIndex / itemsPerPage <
                    Math.ceil(
                      filteredList && filteredList.length / itemsPerPage
                    ) && (
                      <Button
                        variant="outline-primary"
                        className="mx-3"
                        onClick={showMoreContentItems}
                      >
                        Show More
                      </Button>
                    )}
                  <Button
                    variant="outline-primary"
                    className="mx-3"
                    onClick={scrollToTop}
                  >
                    Back to Top
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
}
