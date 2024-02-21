"use client";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// import { cookies } from "next/headers";
import { IContactInformation } from "../../contexts/Auth/AccountTypes";
import { LoadingSpinner } from "../../components/LoadingSpinner";

interface AuthContextData {
  fetchAPI: (
    endpoint: string,
    data: any,
    method?: string,
    contentType?: string
  ) => Promise<Response>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // createContact: (
  //   firstName: string,
  //   lastName: string,
  //   emailAddress: string,
  //   newsletter: boolean,
  //   termsOfService: boolean
  // ) => Promise<void>;
  setContactPassword: (
    passwordDetails: PasswordDetails,
    token: string
  ) => Promise<void>;
  checkPasswordPattern: () => Promise<void>;
  checkIsLoggedIn: () => boolean;
  isLoginModalVisible: boolean;
  setIsLoginModalVisible: (isVisible: boolean) => void;
  openLoginModal: (redirectUrl?: string) => void;
  closeLoginModal: () => void;
  isLoggingIn: boolean;
  isLibraryEnabled: boolean;
  isFromCheckout: boolean;
  setIsFromCheckout: (arg0: boolean) => void;
  continueAsGuest: (email: string) => void;
  contactInfo: IContactInformation | undefined;
  setContactInfo: (contactInfo: IContactInformation | undefined) => void;
  emailHash: string;
  refreshContactInformation: () => void;
}

export interface PasswordDetails {
  ToEmail: string;
  TargetUrl: string;
  Password: string;
  OldPassword: string;
  sendEmail: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [redirectAfterLoginUrl, setRedirectAfterLoginUrl] =
    useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isLibraryEnabled, setIsLibraryEnabled] = useState<boolean>(false);
  const [isFromCheckout, setIsFromCheckout] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<
    IContactInformation | undefined
  >({} as IContactInformation);
  const [emailHash, setEmailHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function storeToken(newToken: string | null) {
    //debugger;
    if (newToken) {
      setToken(newToken);
      localStorage.setItem("authToken", newToken);
      // cookies().set("JOM_TOKEN", newToken);
    } else {
      setToken(null);
      localStorage.removeItem("authToken");
      // cookies().delete("JOM_TOKEN");
    }
  }

  async function continueAsGuest(email: string) {
    const payload = {
      Email: email,
    };

    try {
      const response = await fetchAPI("Cart/Guest", payload, "PUT");

      // router.push(redirectAfterLoginUrl);
    } catch (error) {
      console.error("Failed to continue as guest: ", error);
    } finally {
      setIsLoggingIn(false);
      setRedirectAfterLoginUrl("");
      setIsLoginModalVisible(false);
    }
  }

  async function login(email: string, password: string) {
    const payload = {
      Email: email,
      Password: password,
    };
    if (isLoggedIn) {
      logout();
    }

    setIsLoggingIn(true);
    setIsLibraryEnabled(false);
    try {
      // if (!token) {
      //   window.location.href = "/";
      // }
      //alert("NOT LOGGED IN YET");
      const response = await fetchAPI("Contact/Login", payload, "POST");

      const message = await response.json();
      //alert("message is returned");
      const contact: IContactInformation = message as IContactInformation;
      // setContactInfo(contact);
      //refreshContactInformation();

      updateEmailHash(contact.PrimaryEmailAddress);
      setIsLoggedIn(message.IsLoggedIn);
      setIsLoggingIn(false);
      setIsLibraryEnabled(false);
      setIsLoginModalVisible(false);
      updateUserLoginStatus(true, contact);

      // if (message.IsLoggedIn) {
      //   document.cookie = `JOM_USER=${contact.Id}; path=/`;
      // } else if (!message.IsLoggedIn) {
      //   document.cookie = "JOM_USER=; Max-Age=0; path=/";
      // }
      if (redirectAfterLoginUrl) {
        //   router.push(redirectAfterLoginUrl);
        //   setRedirectAfterLoginUrl("");
        // } else {
        //   router.push("/manage-account");
        router.push(redirectAfterLoginUrl);
      }
    } catch (error) {
      setIsLoggingIn(false);
      console.error("There was a problem with your fetch operation: ", error);
    }
  }

  function updateUserLoginStatus(isLoggedIn: boolean, contactInfo: any | null) {
    if (isLoggedIn) {
      document.cookie = `JOM_USER=${contactInfo.Id}; path=/`;
    } else if (!isLoggedIn) {
      document.cookie = "JOM_USER=; Max-Age=0; path=/";
    }
  }

  function logout(goToHomePage?: boolean) {
    // storeToken(null);
    // localStorage.removeItem("authToken");
    setIsLoggedIn(false);

    updateUserLoginStatus(false, null);
    setIsLoggingIn(false);
    setContactInfo(undefined);

    goToHomePage && router.push("/home-page");
    // window.location.href = "/";
  }

  async function createToken(contactId: string, emailAddress: string) {
    const data = {
      ToEmail: emailAddress,
      TargetUrl: "/set-password",
      //   Password: "<temporary password, if applicable>",
      //   OldPassword: "<old password, if applicable>",
      sendEmail: true,
    };
    const message = await fetchAPI("Contact/PasswordToken", data);
  }

  async function checkPasswordPattern() {
    // ... perform API call to get password pattern and message
  }

  async function setContactPassword(
    passwordDetails: PasswordDetails,
    token: string
  ) {
    const url = `/Contact/PasswordToken/${token}`;
    const method = "POST";

    try {
      const response = await fetchAPI(url, passwordDetails, method);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const message = await response.json();
    } catch (error) {
      console.error("There was a problem with your fetch operation: ", error);
    }
  }
  function checkIsLoggedIn() {
    return isLoggedIn;
  }

  function openLoginModal(redirectUrl?: string) {
    setIsLoginModalVisible(true);

    if (redirectUrl) {
      setRedirectAfterLoginUrl(redirectUrl);
    }
  }

  function closeLoginModal() {
    setIsLoginModalVisible(false);
  }

  async function fetchAPI(
    endpoint: string,
    data: any,
    method: string = "POST",
    contentType: string = "application/json"
  ) {
    if (
      !isLoggedIn &&
      endpoint.indexOf("Login") < 0 &&
      endpoint.indexOf("GetToken") < 0
    ) {
      throw new Error(`USER IS NOT LOGGED IN`);
    }
    const apiURL = "/api";
    let url =
      endpoint.indexOf("dashboardHero") > 0
        ? "/" + endpoint
        : `${apiURL}/${endpoint}`;

    let headers = new Headers();
    headers.append("Content-Type", contentType);
    headers.append("Accept", "application/json");
    // headers.append("Origin", "https://lwcrmapi-mig2.lakewoodchurch.com");
    // headers.append("Referrer", "https://lwcrmapi-mig2.lakewoodchurch.com");

    if (token) {
      headers.append("Authorization", token);
    }

    let options: {
      method: string;
      headers: Headers;
      body?: any;
    } = {
      method,
      headers,
    };

    if (data) {
      if (contentType.indexOf("multipart") > -1) {
        let formData = new FormData();
        formData.set("File", data);
        options.body = formData;
      } else options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.debug("Error from fetchAPI:", errorData);
        throw new Error(
          errorData.ExceptionMessage || `HTTP error! status: ${response.status}`
        );
      }

      const newToken = response.headers.get("Lwcrm-Token");
      if (newToken && newToken !== token) {
        storeToken(newToken);
      }

      return response;
    } catch (error) {
      console.error("There was a problem with your fetch operation: ", error);

      throw error;
    }
  }

  function updateEmailHash(val: string) {
    const hashValue = (val: any): any =>
      crypto.subtle
        // .digest("SHA-256", new TextEncoder("utf-8").encode(val))
        .digest("SHA-256", new TextEncoder().encode(val))
        .then((h) => {
          // debugger;

          let hexes = [],
            view = new DataView(h);
          for (let i = 0; i < view.byteLength; i += 4)
            hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
          return hexes.join("");
        });

    hashValue(val).then((data: any) => {
      setEmailHash(data);
    });
  }

  function refreshContactInformation(successCallback?: Function) {
    try {
      throw new Error();
    } catch (err: any) {
      let stack = err.stack;
      // N.B. stack === "Error\n  at Hello ...\n  at main ... \n...."
      let m = stack.match(/.*?refreshContactInformation.*?\n(.*?)\n/);
      if (m) {
        let caller_name = m[1];
      }
    }

    if (isLoggedIn && token) {
      setContactInfo(undefined);
      async function getContactInformation() {
        try {
          const response = await fetchAPI("/Contact", null, "GET");

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const currentContact = await response.json();
          setContactInfo(currentContact);
          updateEmailHash(currentContact.PrimaryEmailAddress);
          // localStorage.setItem("authToken", responseToken);
        } catch (error) {
          console.error(
            "There was a problem with your fetch operation: ",
            error
          );
        }
      }
      getContactInformation();
    }
  }

  useEffect(() => {
    if (isLoggedIn && token) {
      refreshContactInformation();
    } else {
      openLoginModal();
    }
  }, [isLoggedIn]);
  // // Call getToken when the component mounts

  function fetchToken() {
    async function getToken() {
      setIsLoading(true);
      try {
        const response = await fetchAPI(
          "Auth/GetToken",
          {
            Id: "Test",
            Key: "7b8CB013BF-7984-E811-8119-000D3A7056",
            Sourcecode: "%%00JWLIVE",
            CurrencyIso: "USD",
            Country: "USA",
            SiteCode: "JOM",
            Environment: "JoelOsteen Live CDN- MIG2",
          },
          "POST"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseToken = await response.json();
        storeToken(responseToken);
      } catch (error) {
        console.error("There was a problem with your fetch operation: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    getToken();
  }
  useEffect(() => {
    const DEBUG = process.env.NODE_ENV !== "production";
    if (DEBUG) {
      console.debug("AuthProvider Component Mounted: Fetching Token");
    }
    //setIsLoggedIn(false);
    const storedToken = localStorage.getItem("authToken");

    if (!token) {
      fetchToken();
    }
    // }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (true || !!token) {
    return (
      <AuthContext.Provider
        value={{
          fetchAPI,
          login,
          logout,
          // createContact,
          checkPasswordPattern,
          checkIsLoggedIn,
          setContactPassword,
          isLoginModalVisible,
          setIsLoginModalVisible,
          openLoginModal,
          closeLoginModal,
          isLoggingIn,
          isLibraryEnabled,
          isFromCheckout,
          setIsFromCheckout,
          continueAsGuest,
          contactInfo,
          setContactInfo,
          emailHash,
          refreshContactInformation,
        }}
      >
        {/* <br />
        IS LOGGED IN: {JSON.stringify(isLoggedIn)}
        <br />
        TOKEN: {JSON.stringify(token)}
        STORED TOKEN: {JSON.stringify(localStorage.getItem("authToken"))} */}
        {/* {JSON.stringify(contactInfo)}
        // {JSON.stringify(isLoggedIn)}
        // {JSON.stringify(token)} */}
        {/* {emailHash} */}
        {children}
      </AuthContext.Provider>
    );
  } else {
    return <div>loading..</div>;
  }
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
