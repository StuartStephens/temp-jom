"use client";
import MultiColumnLayout from "../../../../components/shared/layouts/MultiColumnLayout";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../components/shared/layouts/PageGutterLayout";

export interface IMultiColumnLayoutDemoProps {}

export function MultiColumnLayoutDemo(props: IMultiColumnLayoutDemoProps) {
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <h2>2 Even columns</h2>
      <MultiColumnLayout gap={5}>
        <MultiColumnLayout.Content columnsOutOf12={1}>
          <div style={{ height: "10rem", backgroundColor: "red" }}>6</div>
        </MultiColumnLayout.Content>
        <MultiColumnLayout.Content columnsOutOf12={1}>
          <div style={{ height: "10rem", backgroundColor: "green" }}>6</div>
        </MultiColumnLayout.Content>
      </MultiColumnLayout>

      <h2>3 Even columns</h2>
      <MultiColumnLayout gap={5}>
        <MultiColumnLayout.Content columnsOutOf12={4}>
          <div style={{ height: "10rem", backgroundColor: "red" }}>4</div>
        </MultiColumnLayout.Content>
        <MultiColumnLayout.Content columnsOutOf12={4}>
          <div style={{ height: "10rem", backgroundColor: "green" }}>4</div>
        </MultiColumnLayout.Content>
        <MultiColumnLayout.Content columnsOutOf12={4}>
          <div style={{ height: "10rem", backgroundColor: "yellow" }}>4</div>
        </MultiColumnLayout.Content>
      </MultiColumnLayout>

      <h2>4 Columns with varying width</h2>
      <MultiColumnLayout gap={5}>
        <MultiColumnLayout.Content columnsOutOf12={2}>
          <div style={{ height: "10rem", backgroundColor: "red" }}>2</div>
        </MultiColumnLayout.Content>
        <MultiColumnLayout.Content columnsOutOf12={4}>
          <div style={{ height: "10rem", backgroundColor: "green" }}>4</div>
        </MultiColumnLayout.Content>
        <MultiColumnLayout.Content columnsOutOf12={2}>
          <div style={{ height: "10rem", backgroundColor: "red" }}>2</div>
        </MultiColumnLayout.Content>
        <MultiColumnLayout.Content columnsOutOf12={4}>
          <div style={{ height: "10rem", backgroundColor: "green" }}>4</div>
        </MultiColumnLayout.Content>
      </MultiColumnLayout>
    </PageGutterLayout>
  );
}
