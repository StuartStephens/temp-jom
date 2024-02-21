import React, { ReactNode } from "react";
import { Container, ContainerProps } from "react-bootstrap";
import { PAGE_GUTTER, PageGutterLayout } from "../PageGutterLayout";
import { LayoutContent } from "./LayoutContent";

export interface IContentArea {}

type GapRange = 1 | 2 | 3 | 4 | 5;
export interface IMultiColumnLayoutProps extends ContainerProps {
  // children?: ReactNode | ReactNode[] | undefined;

  gap?: GapRange;
  children?:
    | React.ReactElement<typeof LayoutContent>[]
    | React.ReactElement<typeof LayoutContent>
    | undefined;
}

const MultiColumnLayout: React.FC<IMultiColumnLayoutProps> = ({
  children,
  gap,
  className,
}) => {
  if (!children) return null;

  let columns = React.Children.toArray(children);

  return (
    <Container fluid className={`${className}`}>
      <PageGutterLayout
        variant={PAGE_GUTTER.NONE}
        className={`multi-column-layout d-flex flex-row justify-content-evenly align-items-stretch gap-${
          gap || 0
        }`}
      >
        {columns.map((o: any, index: number) => {
          return o?.props?.columnsOutOf12 ? (
            <div
              key={"contentarea_" + index}
              style={{ flexGrow: `${o.props.columnsOutOf12}` }}
            >
              {o}
            </div>
          ) : null;
        })}
      </PageGutterLayout>
    </Container>
  );
};

export default Object.assign(MultiColumnLayout, {
  Content: LayoutContent,
});
