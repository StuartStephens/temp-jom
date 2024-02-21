import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../app/types";
import { ContentList } from "../ContentList";
import { IContentListItem } from "../ContentList/ContentListItem";
import GrowingList from "../GrowingList";

export interface IPastWallpapersProps {
  content?: IContentListItem[];
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
}

export function PastWallpapers(props: IPastWallpapersProps) {
  const { displayMethod } = props;

  return (
    <>
      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
        <ContentList
          heading="Past Wallpapers"
          contentType={CONTENT_TYPES.WALLPAPER}
          viewAllLinkText="View all Wallpapers"
          viewAllLink="#VIEWALLBLOGS"
          content={props.content}
        />
      )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={props.content || []}
              contentType={CONTENT_TYPES.WALLPAPER}
            />
          </>
        )}
    </>
  );
}
