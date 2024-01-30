import Link from "next/link";
import { Container, Nav, NavProps } from "react-bootstrap";
import { disableMenu, showMenu } from "./MenuUtils";
import { IMenuItem } from "../../contexts/UIStateContext/Context";

export interface ITertiaryNavigationProps extends NavProps {
    menuItems: IMenuItem[] | undefined;
    isLoggedIn: boolean;
}

export function TertiaryNavigation(props: ITertiaryNavigationProps) {
    const { menuItems, isLoggedIn, onSelect } = props;

    return !menuItems ? null : (
        <Container fluid className="full-width tertiary-navigation">
            <Nav className="flex-column bg-transparent " onSelect={onSelect}>
                {menuItems &&
                    menuItems.map((menuItem: IMenuItem) => {
                        const isDisabled: boolean = disableMenu(isLoggedIn, menuItem);
                        return showMenu(isLoggedIn, menuItem) ? (
                            <Nav.Link
                                as={Link}
                                key={menuItem.Name}
                                active={menuItem.IsSelected}
                                disabled={isDisabled}
                                eventKey={menuItem.Name}
                                href={menuItem?.Href}
                            >
                                {menuItem.Text}
                            </Nav.Link>
                        ) : null;
                    })}
            </Nav>
        </Container>
    );
}
