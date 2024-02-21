import { PAGE_GUTTER, PageGutterLayout } from "../PageGutterLayout";

type ColumnWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ILayoutContentProps {
  columnsOutOf12: ColumnWidth;
}

export function LayoutContent(
  props: React.PropsWithChildren<ILayoutContentProps>
) {
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      {props.children}
    </PageGutterLayout>
  );
}
