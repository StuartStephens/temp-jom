"use client";
import { useEffect, useState } from "react";
import { IContentListItem } from "../../../../components/ContentList/ContentListItem";
import { ProductList } from "../../../../components/ProductList";
import { getPastContentFilterString } from "../../../../components/cms/utilities/ContentUtils";
import {
  CONTENT_TYPES,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";

export interface IGiftListPageProps {}

export function GiftListPage(props: IGiftListPageProps) {
  const [gifts, setGifts] = useState<IContentListItem[]>();
  const [filterValues, setFilterValues] = useState<IPastContentFilter>({
    page: 0,
    recordCount: 9,
  });

  function updateGifts(filterValues?: IPastContentFilter) {
    async function getGiftsBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(
          `http://localhost:4000/jomapi/music${getPastContentFilterString(
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
          setGifts(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return giftsblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getGiftsBlock(filterValues);
  }

  useEffect(() => {
    updateGifts();
  }, []);

  useEffect(() => {
    updateGifts(filterValues);
  }, [filterValues]);

  return (
    <ProductList
      heading="Gifts"
      contentType={CONTENT_TYPES.MUSIC}
      viewAllLinkText="View all Gifts"
      viewAllLink="/store/store-gifts"
      displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      content={gifts}
    />
  );
}
