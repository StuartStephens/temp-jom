import { PAST_CONTENT_DISPLAY_FORMATS } from "../../../../types";
import { PastWallpapers } from "../../../../components/PastWallpapers";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../components/shared/layouts/PageGutterLayout";

export interface IWallpapersProps { }

async function getWallpapers() {
  try {
    const res = await fetch("http://localhost:4000/jomapi/wallpaper", {
      next: {
        revalidate: 0, // millis frequency of cache
      },
    });
    const wallpapers = await res.json();
    return wallpapers;
  } catch (e) {
    console.error(e);
  } finally {
    //DONE
  }
  return;
}
export async function Wallpapers(props: IWallpapersProps) {
  const wallpapers = await getWallpapers();
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <PageGutterLayout variant={PAGE_GUTTER.SMALL}>
        <h2>Wallpapers</h2>
      </PageGutterLayout>

      <PastWallpapers
        content={wallpapers}
        displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      />
    </PageGutterLayout>
  );
}
