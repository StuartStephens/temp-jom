"use client";
import { useEffect, useState } from "react";
import {
  CONTENT_TYPES,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";
import { ProductList } from "../../../../components/ProductList";
import { IContentListItem } from "../../../../components/ContentList/ContentListItem";
import { getPastContentFilterString } from "../../../../components/cms/utilities/ContentUtils";

export interface ISeriesListPageProps { }

export function SeriesListPage(props: ISeriesListPageProps) {
  const [series, setSeries] = useState<IContentListItem[]>();
  const [filterValues, setFilterValues] = useState<IPastContentFilter>({
    page: 0,
    recordCount: 9,
  });

  function updateSeries(filterValues?: IPastContentFilter) {
    async function getSeriesBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(
          `http://localhost:4000/jomapi/series${getPastContentFilterString(
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
          console.log("content", content);
          setSeries(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return seriesblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getSeriesBlock(filterValues);
  }

  useEffect(() => {
    updateSeries();
  }, []);

  useEffect(() => {
    updateSeries(filterValues);
  }, [filterValues]);

  return (
    <ProductList
      heading="Series"
      contentType={CONTENT_TYPES.SERIES}
      viewAllLinkText="View all Series"
      viewAllLink="/store/store-series"
      displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      content={series}
    />
  );
}
