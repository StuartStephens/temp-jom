import { PastArticles } from "../../../../components/PastArticles";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../components/shared/layouts/PageGutterLayout";
import { PAST_CONTENT_DISPLAY_FORMATS } from "../../../../types";

export interface IArticlesProps {}

async function getArticles() {
  try {
    const res = await fetch("http://localhost:4000/jomapi/article", {
      next: {
        revalidate: 0, // millis frequency of cache
      },
    });
    const articles = await res.json();
    return articles;
  } catch (e) {
    console.error(e);
  } finally {
    //DONE
  }
  return;
}
export async function Articles(props: IArticlesProps) {
  const articles = await getArticles();
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <PastArticles
        content={articles}
        displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      />
    </PageGutterLayout>
  );
}
