"use client";
import { useState, ChangeEvent, useEffect } from "react";

import {
  Container,
  Form,
  FloatingLabel,
  Col,
  Row,
  InputGroup,
  Button,
} from "react-bootstrap";
import { IContentListItem } from "../ContentList/ContentListItem";

export type SortOption = {
  value: string;
  displayValue: string;
};
type SearchProps = {
  contentList: IContentListItem[];
  filters: string[];
  sortOptions: SortOption[];
  onSearchChange: (search: string) => void;
  onAuthorChange: (author: string) => void;
  onFormatChange: (format: string) => void;
  onTopicsChange: (topics: string[]) => void;
  onSortChange: (sort: string) => void;
  onPrayerPropertyChanged: (prayerProperty: string) => void;
  onClearFilters: () => void;
};

export default function SearchSortFilter({
  onSearchChange,
  onAuthorChange,
  onFormatChange,
  onTopicsChange,
  onSortChange,
  onPrayerPropertyChanged,
  onClearFilters,
  contentList,
  filters,
  sortOptions,
}: SearchProps) {
  const [author, setAuthor] = useState<string>("");
  const [format, setFormat] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [prayerProperty, setPrayerProperty] = useState<string>("");
  const [sortFilterColumnWidth, setSortFilterColumnWidth] = useState<number>(3);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleFilterChange(e.currentTarget.name, e.currentTarget.value);
  }
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    handleFilterChange(e.currentTarget.name, e.currentTarget.value);
  }
  function handleFilterChange(filterName: string, value: string) {
    switch (filterName) {
      case "author":
        setAuthor(value);
        onAuthorChange(value);
        break;
      case "format":
        setFormat(value);
        onFormatChange(value);
        break;
      case "sort":
        setSortBy(value);
        onSortChange(value);
        break;
      case "search":
        setSearch(value);
        onSearchChange(value);
        break;
      case "prayerProperty":
        setPrayerProperty(value);
        onPrayerPropertyChanged(value);
        break;
      default:
        break;
    }
  }

  function reduceTopicsList(total: string[], currentValue: IContentListItem) {
    currentValue &&
      currentValue.topics &&
      currentValue.topics.map((topic: string) => {
        if (!total.includes(topic)) {
          total = [...total, topic];
        }
      });
    return total;
  }

  function handleTopicChanged(topic: string, isChecked: boolean) {
    let updatedTopics: string[] = [];
    if (!isChecked) {
      updatedTopics = topics.filter((word) => word != topic);
    } else {
      updatedTopics = [...topics, ...[topic]];
    }
    setTopics(updatedTopics);
    onTopicsChange(updatedTopics);
  }

  function handleClearFilters() {
    setSearch("");
    setAuthor("");
    setFormat("");
    setPrayerProperty("");
    setSortBy("");
    setTopics([]);
    onClearFilters();
  }

  useEffect(() => {
    let sortAndFilterCount =
      (filters && filters.length ? filters.length : 0) +
      (sortOptions && sortOptions.length > 0 ? 1 : 0);

    if (!topics || topics.length < 1) {
      sortAndFilterCount++;
    }
    if (sortAndFilterCount > 4) {
      sortAndFilterCount = 4;
    }
    setSortFilterColumnWidth(Math.floor(12 / sortAndFilterCount));
  }, [filters, sortOptions, topics, prayerProperty]);

  if (!contentList) {
    return null; // or fallback UI
  }

  return (
    <>
      {/* TODO: pass the aria-label in to the component to make it more specific.  e.g. filter blogs */}
      <div className="border-top search-sort-filter" aria-label="Filter">
        <Container fluid className="full-width">
          <Form className="">
            <Row className="py-4 page-gutter page-gutter-small">
              {filters && filters.includes("author") && (
                <Col xs={12} md={sortFilterColumnWidth} className="pb-2">
                  <FloatingLabel controlId="author" label="Author">
                    <Form.Select
                      id="author"
                      aria-label="Select Author"
                      value={author}
                      name="author"
                      onChange={handleSelectChange}
                    >
                      <option key="Any" value="">
                        {"Any"}
                      </option>
                      {Array.from(
                        new Set(
                          contentList.map((contentItem) => contentItem.speaker)
                        )
                      ).map((speaker) => (
                        <option key={speaker} value={speaker}>
                          {speaker}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              )}
              {filters && filters.includes("format") && (
                <Col xs={12} md={sortFilterColumnWidth} className="pb-2">
                  <FloatingLabel controlId="format" label="Format">
                    <Form.Select
                      id="format"
                      aria-label="Select Format"
                      value={format}
                      name="format"
                      onChange={handleSelectChange}
                    >
                      <option key="Any" value="">
                        {"Any"}
                      </option>
                      {Array.from(
                        new Set(
                          contentList.map((contentItem) => contentItem.format)
                        )
                      ).map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              )}

              {sortOptions && sortOptions.length > 0 && (
                <Col xs={12} md={sortFilterColumnWidth} className="pb-2">
                  <FloatingLabel controlId="floatingSelect" label="Sort by">
                    <Form.Select
                      aria-label="Select Sort by"
                      value={sortBy}
                      name="sort"
                      onChange={handleSelectChange}
                    >
                      {sortOptions.map((sort) => (
                        <option key={sort.value} value={sort.value}>
                          {sort.displayValue}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              )}

              {filters && filters.includes("prayerProperties") && (
                <Col xs={12} md={sortFilterColumnWidth} className="pb-2">
                  <FloatingLabel controlId="prayerProperty" label="SHOW ONLY">
                    <Form.Select
                      id="prayerProperty"
                      aria-label="Show Only"
                      value={prayerProperty}
                      name="prayerProperty"
                      onChange={handleSelectChange}
                    >
                      <option key="newest" value="newest">
                        {"Newest"}
                      </option>
                      <option key="likes" value="likes">
                        {"Requests That Need Prayers"}
                      </option>
                      <option key="user" value="user">
                        {"Prayers"}
                      </option>
                      <option key="followed" value="followed">
                        {"Followed Prayers"}
                      </option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              )}

              {filters && filters.includes("search") && (
                <Col xs={12} md={sortFilterColumnWidth} className="pb-2">
                  <InputGroup>
                    <FloatingLabel controlId="floatingInput" label="Search">
                      <Form.Control
                        className="border-end-0"
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={search || ""}
                        onChange={handleInputChange}
                      />
                    </FloatingLabel>

                    <InputGroup.Text>
                      <i className="bi bi-search fs-sm c-black fw-bolder " />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              )}
              {!(filters && filters.includes("topic")) && (
                <Col
                  xs={12}
                  md={sortFilterColumnWidth}
                  className="text-right pt-2"
                >
                  <div className="button-row">
                    <Button
                      variant="outline-primary full-width"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Col>
              )}
            </Row>

            {filters && filters.includes("topic") && (
              <Row className="pt-4 pb-1  border-top page-gutter page-gutter-small">
                <Col xs={12}>Topics</Col>
              </Row>
            )}
            {filters && filters.includes("topic") && (
              <Row className="pt-1 pb-4  border-bottom page-gutter page-gutter-small">
                <Col
                  xs={12}
                  md={9}
                  className="pb-2 d-flex flex-row gap-2 flex-wrap"
                >
                  {contentList
                    .reduce(reduceTopicsList, [])
                    .map((topic: any, index: number) => {
                      return topic ? (
                        <Form.Group
                          key={`topic_${topic}`}
                          controlId={`topic_${topic}`}
                        >
                          <Form.Check
                            className="facet-checkbox"
                            inline
                            name={topic}
                            checked={topics && topics.includes(topic)}
                            type="checkbox"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              handleTopicChanged(topic, e.target.checked);
                            }}
                          />
                          <Form.Label>{topic}</Form.Label>
                        </Form.Group>
                      ) : null;
                    })}
                </Col>
                <Col xs={12} md={3}>
                  <div className="button-row  ">
                    <Button
                      variant="outline-primary w-100"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Form>
        </Container>
      </div>
    </>
  );
}
