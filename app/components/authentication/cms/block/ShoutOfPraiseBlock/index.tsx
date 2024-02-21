import { useEffect, useState } from "react";
import {
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../../app/types";
import { ShoutOfPraise } from "../../../ShoutOfPraise";
import { PageGutterLayout } from "../../../shared/layouts/PageGutterLayout";

export interface IShoutOfPraiseBlockProps {}

export function ShoutOfPraiseBlock(props: IShoutOfPraiseBlockProps) {
  //   const pastblogsblock = await getPastBlogsBlock(filterValues);
  function updateShoutsOfPraise() {
    async function getShoutsOfPraiseBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(`http://localhost:4000/jomapi/shoutofpraise`, {
          next: {
            revalidate: 0, // millis frequency of cache
          },
        });
        if (res.ok) {
          const content = await res.json();
          setShoutsOfPraise(content);
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

    getShoutsOfPraiseBlock();
  }

  useEffect(() => {
    updateShoutsOfPraise();
  }, []);

  const [shoutsOfPraise, setShoutsOfPraise] = useState<any>();

  return (
    <PageGutterLayout>
      {/* {JSON.stringify(shoutsOfPraise)} */}
      <ShoutOfPraise
        content={shoutsOfPraise}
        displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      />
    </PageGutterLayout>
  );
}
