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
} from "../../../../components/shared/layouts/PageGutterLayout";
import { PastMessages } from "../../../ContentList/PastMessages";
import { getPastContentFilterString } from "../../utilities/ContentUtils";

export interface IPastMessagesBlockProps extends IPastContentBlockProps { }

export function PastMessagesBlock(props: IPastMessagesBlockProps) {
  const [filterValues, setFilterValues] = useState<
    IPastContentFilter | undefined
  >(props.filterProps);
  function updatePastMessages() {
    async function getPastMessagesBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(
          `http://localhost:4000/jomapi/message${getPastContentFilterString(
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
          setPastMessages(content);
        } else {
          console.error("RESPSONSE NOT OK", res);
        }

        // return pastmessagesblock;
      } catch (e) {
        console.error(e);
      } finally {
        //DONE
      }
      return;
    }

    getPastMessagesBlock(filterValues);
  }

  useEffect(() => {
    updatePastMessages();
  }, []);
  // useEffect(() => {
  //   updatePastMessages();
  // }, [props]);

  const [pastMessages, setPastMessages] = useState<any>();
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <PastMessages
        content={pastMessages}
        displayMethod={
          props?.displayMethod || PAST_CONTENT_DISPLAY_FORMATS.FILTERED
        }
      />
    </PageGutterLayout>
  );
}
