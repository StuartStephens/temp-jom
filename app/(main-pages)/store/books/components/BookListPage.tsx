"use client";
import { useEffect, useState } from "react";
import { getPastContentFilterString } from "../../../../components/cms/utilities/ContentUtils";
import { ProductList } from "../../../../components/ProductList";
import { IContentListItem } from "../../../../components/ContentList/ContentListItem";
import {
  CONTENT_TYPES,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";

export interface IBookListPageProps {}

export function BookListPage(props: IBookListPageProps) {
  const [books, setBooks] = useState<IContentListItem[]>();
  const [filterValues, setFilterValues] = useState<IPastContentFilter>({
    page: 0,
    recordCount: 9,
  });

  function updateBooks(filterValues?: IPastContentFilter) {
    async function getBooksBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(
          `http://localhost:4000/jomapi/book${getPastContentFilterString(
            filterValues
          )}`,
          {
            next: {
              revalidate: 0, // millis frequency of cache
            },
          }
        );
        if (res.ok) {
          const content = await res.json();
          setBooks(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return booksblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getBooksBlock(filterValues);
  }

  useEffect(() => {
    updateBooks();
  }, []);

  useEffect(() => {
    updateBooks(filterValues);
  }, [filterValues]);

  return (
    <ProductList
      heading="Books"
      contentType={CONTENT_TYPES.BOOK}
      viewAllLinkText="View all Books"
      viewAllLink="/store/store-books"
      displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      content={books}
    />
  );
}
