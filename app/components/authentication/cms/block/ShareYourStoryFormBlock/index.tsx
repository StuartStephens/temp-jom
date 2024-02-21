import { useEffect, useState } from "react";
import {
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../../app/types";
import { PageGutterLayout } from "../../../shared/layouts/PageGutterLayout";
import { ShareYourStoryForm } from "../../../ShareYourStoryForm";

export interface IShareYourStoryBlockProps {}

export function ShareYourStoryBlock(props: IShareYourStoryBlockProps) {
  //   const pastblogsblock = await getPastBlogsBlock(filterValues);
  function updateShoutsOfPraise() {
    async function getShoutsOfPraiseBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(`http://localhost:4000/jomapi/story`, {
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
      <ShareYourStoryForm />
    </PageGutterLayout>
  );
}
