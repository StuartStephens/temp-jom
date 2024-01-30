"use client";
import Link from "next/link";
import { Nav, NavProps } from "react-bootstrap";
import { IMenuItem } from "../../contexts/UIStateContext/Context";

export interface ITabMenuProps extends NavProps {
    menuItems: IMenuItem[];
    isLoggedIn: boolean;
}

export function TabMenu(props: ITabMenuProps) {
    const { onSelect, activeKey, menuItems, isLoggedIn } = props;
    return (
        <>
            <Nav
                justify
                variant="tabs"
                defaultActiveKey="DASHBOARD"
                activeKey={activeKey}
                onSelect={onSelect}
                className=" bg-tertiary d-flex flex-column flex-lg-row "
            >
                {menuItems.map((menuItem: IMenuItem) => {
                    return (
                        <Nav.Item key={`L_${menuItem.Level}__N${menuItem.Name}`}>
                            <Nav.Link
                                className="px-3"
                                as={Link}
                                active={menuItem.IsSelected}
                                eventKey={menuItem.Name}
                                href={menuItem?.Href || ""}
                                disabled={
                                    isLoggedIn
                                        ? menuItem.DisableWhenLoggedIn
                                        : menuItem.DisableWhenLoggedIn
                                }
                            >
                                <span className="text-nowrap">{menuItem.Text}</span>
                            </Nav.Link>
                        </Nav.Item>
                    );
                })}
            </Nav>
        </>
    );
}

