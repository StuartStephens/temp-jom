import { useEffect, useState } from "react";
import {
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../types";
import { Prayer } from "../../../Prayer";
import { PageGutterLayout } from "../../../shared/layouts/PageGutterLayout";

export interface IPrayerBlockProps { }

export function PrayerBlock(props: IPrayerBlockProps) {
  //   const pastblogsblock = await getPastBlogsBlock(filterValues);
  function updatePrayer() {
    console.log("updatePrayer callaed");
    async function getPrayerBlock(filterValues?: IPastContentFilter) {
      try {
        const res = await fetch(`http://localhost:4000/jomapi/prayer`, {
          next: {
            revalidate: 0, // millis frequency of cache
          },
        });
        console.log(res);
        if (res.ok) {
          const content = await res.json();
          console.log("content", content);
          setPrayer(content);
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

    getPrayerBlock();
  }

  useEffect(() => {
    updatePrayer();
  }, []);

  const [prayer, setPrayer] = useState<any>();

  return (
    <PageGutterLayout>
      {/* {JSON.stringify(prayer)} */}
      <Prayer
        content={prayer}
        displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      />
    </PageGutterLayout>
  );
}
