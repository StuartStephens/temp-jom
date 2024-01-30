"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  CONTENT_TYPES,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";
import { IContentListItem } from "../../../../components/ContentList/ContentListItem";
import { ProductList } from "../../../../components/ProductList";
import { getPastContentFilterString } from "../../../../components/cms/utilities/ContentUtils";
import Banner from "../../../../components/shared/Banner/Banner";
import { JOMButtonLink } from "../../../../components/shared/controls/JOMButtonLink";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../components/shared/layouts/PageGutterLayout";
import { BookListPage } from "../../books/components/BookListPage";

export interface IFeaturedLayoutProps { }

export async function getFeaturedDataSTATICDATA() {
  try {
    const res = await fetch(`http://localhost:4000/jomapi/product`, {
      next: {
        revalidate: 0, // seconds frequency of cache
      },
    });
    if (res.status !== 200) return;
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("getFeaturedData NOT FOUND ", e);
  } finally {
    //DONE
  }
  return;
}

export interface IProduct {
  id: string;
  Name: string;
  IsFeatured: boolean;
}

export function FeaturedLayout(props: IFeaturedLayoutProps) {
  const [books, setBooks] = useState<IContentListItem[]>();
  const [filterValues, setFilterValues] = useState<IPastContentFilter>({
    page: 0,
    recordCount: 3,
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
        console.log(res);
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
    <PageGutterLayout variant={PAGE_GUTTER.SMALL}>
      <Banner
        className="my-5"
        backgroundImgUrl="https://www.joelosteen.com/globalassets/images/jom/store/books3x/desktop.png"
      >
        <Container fluid className="full-width">
          <h2>Books</h2>
          <p>See the latest books from Joel Osteen Ministries!</p>
          <JOMButtonLink
            href="/store/store-books"
            buttonProps={{ className: "text-white" }}
          >
            View All Books <i className="bi bi-chevron-right" />
          </JOMButtonLink>
        </Container>
      </Banner>

      <ProductList
        content={books}
        contentType={CONTENT_TYPES.BOOK}
        displayMethod={PAST_CONTENT_DISPLAY_FORMATS.SIMPLE}
      />
      <Banner
        className="my-5"
        backgroundImgUrl="https://www.joelosteen.com/globalassets/images/jom/store/music3x/desktop.png"
      >
        <Container fluid className="full-width">
          <h2>Music</h2>
          <p>Check out great worship music from Joel Osteen Ministries!</p>
          <JOMButtonLink
            href="/store/store-music"
            buttonProps={{ className: "text-white" }}
          >
            View All Music <i className="bi bi-chevron-right" />
          </JOMButtonLink>
        </Container>
      </Banner>
      <Banner
        className="my-5"
        backgroundImgUrl="https://www.joelosteen.com/globalassets/images/jom/store/series3x/desktop.png"
      >
        <Container fluid className="full-width">
          <h2>Series</h2>
          <p>
            Joel&apos;s newest series &quot;The Abundant Life&quot; is available now!
          </p>
          <JOMButtonLink
            href="/store/store-series"
            buttonProps={{ className: "text-white" }}
          >
            View All Series <i className="bi bi-chevron-right" />
          </JOMButtonLink>
        </Container>
      </Banner>
      <Banner
        className="my-5"
        backgroundImgUrl="https://www.joelosteen.com/globalassets/images/jom/store/gifts3x/desktop.png"
      >
        <Container fluid className="full-width">
          <h2>Gifts</h2>
          <p>Give a gift from Joel Osteen Ministries!</p>
          <JOMButtonLink
            href="/store/store-gifts"
            buttonProps={{ className: "text-white" }}
          >
            View All Gifts <i className="bi bi-chevron-right" />
          </JOMButtonLink>
        </Container>
      </Banner>
    </PageGutterLayout>
  );
}
