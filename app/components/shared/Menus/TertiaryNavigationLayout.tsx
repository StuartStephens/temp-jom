"use client";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  IMenuItem,
  useUIStateContext,
} from "../../../../app/contexts/UIStateContext/Context";
import { useAuth } from "../../../../app/contexts/Auth/Context";
import { TertiaryNavigation } from "../../../../app/components/navigation/Menu/TertiaryNavigation";

export interface ITertiaryNavigationLayoutProps {
  children?: ReactNode;
  menuStateName: string;
}

export function TertiaryNavigationLayout(
  props: ITertiaryNavigationLayoutProps
) {
  const { getMenuItemsByMenuStateName, menuStates } = useUIStateContext();
  const { menuStateName } = props;
  const { children } = props;
  const [menuItems, setMenuItems] = useState<IMenuItem[]>();

  useEffect(() => {
    const mi = getMenuItemsByMenuStateName(menuStateName);
    mi && setMenuItems(mi);
  }, []);

  useEffect(() => {
    const mi = getMenuItemsByMenuStateName(menuStateName);
    mi && setMenuItems(mi);
  }, [menuStates]);

  return (
    <Container fluid className="full-width px-3">
      <Row>
        <Col xs={12} md={3}>
          <TertiaryNavigation menuItems={menuItems} />
        </Col>
        <Col xs={12} md={9}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
