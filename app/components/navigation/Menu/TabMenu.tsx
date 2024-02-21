"use client";
import Link from "next/link";
import { Nav, NavProps } from "react-bootstrap";
import { useAuth } from "../../../contexts/Auth/Context";
import { IMenuItem } from "../../../contexts/UIStateContext/Context";
import { disableMenu, showMenu } from "./MenuUtils";

export interface ITabMenuProps extends NavProps {
  menuItems: IMenuItem[];
}

export function TabMenu(props: ITabMenuProps) {
  const { onSelect, activeKey, menuItems } = props;
  const { contactInfo } = useAuth();
  return (
    <>
      <Nav
        justify
        variant="tabs"
        defaultActiveKey="DASHBOARD"
        activeKey={activeKey}
        onSelect={onSelect}
        className="tab-menu bg-tertiary d-flex flex-column flex-lg-row "
      >
        {menuItems.map((menuItem: IMenuItem) => {
          return showMenu(menuItem, contactInfo) ? (
            <Nav.Item key={`L_${menuItem.Level}__N${menuItem.Name}`}>
              <Nav.Link
                className="px-3"
                as={Link}
                active={menuItem.IsSelected}
                eventKey={menuItem.Name}
                href={menuItem?.Href || ""}
                disabled={disableMenu(menuItem, contactInfo)}
              >
                <span className="text-nowrap">{menuItem.Text}</span>
              </Nav.Link>
            </Nav.Item>
          ) : null;
        })}
      </Nav>
    </>
  );
}
