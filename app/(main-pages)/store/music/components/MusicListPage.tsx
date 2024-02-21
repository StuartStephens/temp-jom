"use client";
import { useEffect, useState } from "react";
import { ProductList } from "../../../../components/ProductList";
import { IContentListItem } from "../../../../components/ContentList/ContentListItem";
import { getPastContentFilterString } from "../../../../components/cms/utilities/ContentUtils";
import {
  CONTENT_TYPES,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";

export interface IMusicListPageProps {}

export function MusicListPage(props: IMusicListPageProps) {
  const [music, setMusic] = useState<IContentListItem[]>();
  const [filterValues, setFilterValues] = useState<IPastContentFilter>({
    page: 0,
    recordCount: 9,
  });

  function updateMusic(filterValues?: IPastContentFilter) {
    async function getMusicBlock(filterValues?: IPastContentFilter) {
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
          setMusic(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return musicblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getMusicBlock(filterValues);
  }

  useEffect(() => {
    updateMusic();
  }, []);

  useEffect(() => {
    updateMusic(filterValues);
  }, [filterValues]);

  return (
    <ProductList
      heading="Music"
      contentType={CONTENT_TYPES.MUSIC}
      viewAllLinkText="View all Music"
      viewAllLink="/store/store-music"
      displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      content={music}
    />
  );
}
