"use client";
import {
  Container,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownProps,
  Image,
} from "react-bootstrap";
import {
  COLOR_MODE,
  useCMColorModeProviderContext,
} from "../../contexts/ColorModeContext/CMColorModeContext";
import { useAuth } from "../../contexts/Auth/Context";

export interface IUserSettingsProps {}

export function UserSettings(props: IUserSettingsProps) {
  const { changeColorMode } = useCMColorModeProviderContext();
  const { contactInfo, logout, emailHash } = useAuth();
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="transparent"
        id="dropdown-basic"
        className="text-white p-0"
      >
        {!emailHash ? (
          <i className="bi bi-gear" />
        ) : (
          <>
            <Image
              src={`https://www.gravatar.com/avatar/${emailHash}`}
              height={30}
              roundedCircle
            ></Image>
            <small className="ps-3">{contactInfo?.FullName}</small>
          </>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="">
        <DropdownHeader className="text-center">Toggle Theme</DropdownHeader>
        {/* <Dropdown.Item
          className="text-center"
          onClick={() => {
            changeColorMode(COLOR_MODE.LIGHT);
          }}
        >
          Light
        </Dropdown.Item> */}
        <Dropdown.Item
          className="text-center"
          onClick={() => {
            changeColorMode(COLOR_MODE.DARK);
          }}
        >
          Dark
        </Dropdown.Item>
        {/* <Dropdown.Item
          className="text-center"
          onClick={() => {
            changeColorMode(COLOR_MODE.CHRISTMAS);
          }}
        >
          Christmas
        </Dropdown.Item> */}
        <Dropdown.Item
          className="text-center"
          onClick={() => {
            changeColorMode(COLOR_MODE.STANDARD);
          }}
        >
          Normal
        </Dropdown.Item>
        <DropdownDivider />
        <Dropdown.Item
          className="text-center"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Dropdown.Item>
        <DropdownDivider />
        <Dropdown.Item className="text-center" href="#/action-3">
          View Cart
        </Dropdown.Item>
        <Dropdown.Item className="text-center" href="#/action-3">
          Search Website
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
