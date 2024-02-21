import { IContactInformation } from "../../../contexts/Auth/AccountTypes";
import { IMenuItem } from "../../../contexts/UIStateContext/Context";

export const hasRequiredRoles = (
  menuItem: IMenuItem,
  contactInfo?: IContactInformation
): boolean => {
  let returnValue = true;
  menuItem.RequiredRoles &&
    menuItem.RequiredRoles?.map((role: string) => {
      switch (role) {
        case "ChurchAdmin":
          if (
            contactInfo?.AdminChurches &&
            contactInfo?.AdminChurches.length > 0
          ) {
            returnValue = true;
          } else {
            returnValue = false;
          }
          break;
        default:
          return false;
      }
    });
  return returnValue;
};

export const showMenu = (
  menuItem: any,
  contactInfo?: IContactInformation
): boolean => {
  return (
    hasRequiredRoles(menuItem, contactInfo) &&
    ((contactInfo?.IsLoggedIn && menuItem.ShowWhenLoggedIn) ||
      (!contactInfo?.IsLoggedIn && menuItem.ShowWhenLoggedOut))
  );
};

export const disableMenu = (
  menuItem: any,
  contactInfo?: IContactInformation
): boolean => {
  return (
    !hasRequiredRoles(menuItem, contactInfo) ||
    (contactInfo?.IsLoggedIn && menuItem.DisableWhenLoggedIn) ||
    (!contactInfo?.IsLoggedIn && menuItem.DisableWhenLoggedOut)
  );
};
