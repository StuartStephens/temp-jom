"use client";
import { useEffect, useState } from "react";
import {
  IPastContentBlockProps,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";
import { PastDevotionals } from "../../../PastDevotionals";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../shared/layouts/PageGutterLayout";
import { getPastContentFilterString } from "../../utilities/ContentUtils";

export interface IPastDevotionalsBlockProps extends IPastContentBlockProps { }

export function PastDevotionalsBlock(props: IPastDevotionalsBlockProps) {
  const filterValues = props?.filterProps;
  //   const pastdevotionalsblock = await getPastDevotionalsBlock(filterValues);
  function updatePastDevotionals() {
    async function getPastDevotionalsBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(
          `http://localhost:4000/jomapi/devotional${getPastContentFilterString(
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
          setPastDevotionals(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return pastdevotionalsblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getPastDevotionalsBlock(filterValues);
  }

  useEffect(() => {
    updatePastDevotionals();
  }, []);

  const [pastDevotionals, setPastDevotionals] = useState<any>();
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <PastDevotionals
        content={pastDevotionals}
        displayMethod={
          props?.displayMethod || PAST_CONTENT_DISPLAY_FORMATS.FILTERED
        }
      />
    </PageGutterLayout>
  );
}
