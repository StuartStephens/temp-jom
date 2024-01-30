"use client";
import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../types";
import { ContentList } from "../ContentList";
import { IContentListItem } from "../ContentList/ContentListItem";
import GrowingList from "../GrowingList";

export interface IPastDevotionalsProps {
  content?: IContentListItem[];
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
}

export function PastDevotionals(props: IPastDevotionalsProps) {
  const { content, displayMethod } = props;

  return (
    <>
      {/* {JSON.stringify(content)} */}
      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
          <ContentList
            heading="Past Devotionals"
            contentType={CONTENT_TYPES.DEVOTIONAL}
            viewAllLinkText="View all Devotionals"
            viewAllLink="/inspiration/devotionals"
            content={content}
          />
        )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={content || []}
              contentType={CONTENT_TYPES.DEVOTIONAL}
            />
          </>
        )}
    </>
  );
}
