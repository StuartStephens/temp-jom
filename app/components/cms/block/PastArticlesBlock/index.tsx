"use client";
import { useEffect, useState } from "react";
import {
  IPastContentBlockProps,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../shared/layouts/PageGutterLayout";
import { getPastContentFilterString } from "../../utilities/ContentUtils";
import { PastArticles } from "../../../PastArticles";

export interface IPastArticlesBlockProps extends IPastContentBlockProps { }

export function PastArticlesBlock(props: IPastArticlesBlockProps) {
  const filterValues = props?.filterProps;
  //   const pastarticlesblock = await getPastArticlesBlock(filterValues);
  function updatePastArticles() {
    async function getPastArticlesBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(
          `http://localhost:4000/jomapi/article${getPastContentFilterString(
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
          setPastArticles(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return pastarticlesblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getPastArticlesBlock(filterValues);
  }

  useEffect(() => {
    updatePastArticles();
  }, []);

  const [pastArticles, setPastArticles] = useState<any>();
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <PastArticles
        content={pastArticles}
        displayMethod={
          props?.displayMethod || PAST_CONTENT_DISPLAY_FORMATS.FILTERED
        }
      />
    </PageGutterLayout>
  );
}
