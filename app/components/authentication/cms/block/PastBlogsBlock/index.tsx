"use client";
import { useEffect, useState } from "react";
import {
  IPastContentBlockProps,
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../../app/types";
import { PastBlogs } from "../../../PastBlogs";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../shared/layouts/PageGutterLayout";
import { getPastContentFilterString } from "../../utilities/ContentUtils";

export interface IPastBlogsBlockProps extends IPastContentBlockProps {}

export function PastBlogsBlock(props: IPastBlogsBlockProps) {
  const filterValues = props?.filterProps;
  //   const pastblogsblock = await getPastBlogsBlock(filterValues);
  function updatePastBlogs() {
    async function getPastBlogsBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(
          `http://localhost:4000/jomapi/blog${getPastContentFilterString(
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
          setPastBlogs(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return pastblogsblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getPastBlogsBlock(filterValues);
  }

  useEffect(() => {
    updatePastBlogs();
  }, []);

  const [pastBlogs, setPastBlogs] = useState<any>();
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <PastBlogs
        content={pastBlogs}
        displayMethod={
          props?.displayMethod || PAST_CONTENT_DISPLAY_FORMATS.FILTERED
        }
      />
    </PageGutterLayout>
  );
}
