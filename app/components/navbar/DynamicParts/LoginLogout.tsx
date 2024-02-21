import React, { useState } from "react";
import { useAuth } from "../../Context/Auth/Context";
import TextInput from "./TextInput";
import Link from "next/link";
import { Modal, Button, NavItem, NavLink, Form, Nav } from "react-bootstrap";
import { Subnav } from "@components/shared/Components/SubNav";
import { useCart } from "@components/shared/Context/Cart/Context";

function LoginLogout() {
  const {
    checkIsLoggedIn,
    login,
    logout,
    openLoginModal,
    closeLoginModal,
    isLoginModalVisible,
    isLoggingIn,
    isFromCheckout,
    continueAsGuest,
  } = useAuth();

  const { openCart } = useCart();

  const [tab, setTab] = useState("signIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email2, setEmail2] = useState("");
  const [errorEmail, setErrorEmail] = useState<string | undefined>(undefined);
  const [errorPassword, setErrorPassword] = useState<string | undefined>(
    undefined
  );
  const [errorFirstName, setErrorFirstName] = useState<string | undefined>(
    undefined
  );
  const [errorLastName, setErrorLastName] = useState<string | undefined>(
    undefined
  );
  const [errorEmail2, setErrorEmail2] = useState<string | undefined>(undefined);

  const [emailContinueAsGuest, setEmailContinueAsGuest] = useState<string>("");
  const [errorEmailContinueAsGuest, setErrorEmailContinueAsGuest] = useState<
    string | undefined
  >(undefined);

  function handleToggleModal() {
    if (tab === "signIn") {
      setTab("createAccount");
    } else {
      setTab("signIn");
    }
  }

  // Example validation
  function validateEmail(email: string) {
    // simple email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePassword(password: string) {
    // Password should be at least 8 characters
    return password.length >= 8;
  }

  function validateFirstName(firstName: string) {
    return firstName.length > 0;
  }

  function validateLastName(lastName: string) {
    return lastName.length > 0;
  }

  function validateEmail2(email2: string) {
    // simple email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email2);
  }

  function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    // Call login with form values
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const password = target.password.value;
    const email = target.email.value;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid) setErrorEmail("Email address is required.");
    if (!isPasswordValid)
      setErrorPassword("Password is required should be at least 8 characters");
    if (isEmailValid && isPasswordValid) {
      login(email, password);
    }
  }

  function handleContinueAsGuest(event: React.FormEvent) {
    event.preventDefault();
    const isEmailValid = validateEmail(emailContinueAsGuest);
    if (!isEmailValid)
      setErrorEmailContinueAsGuest("Email address is required.");
    else continueAsGuest(emailContinueAsGuest);
  }

  function handleLogout() {
    logout();
  }

  function handleReturnToCart() {
    closeLoginModal();
    openCart();
  }

  function handleCreateAccount(event: React.FormEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      email2: { value: string };
    };
    const email2 = target.email2.value;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isEmail2Valid = validateEmail2(email2);

    if (!isFirstNameValid) setErrorFirstName("First Name is required");
    if (!isLastNameValid) setErrorLastName("Last Name is required");
    if (!isEmail2Valid) setErrorEmail2("Please enter valid Email Address");

    if (isFirstNameValid && isLastNameValid && isEmail2Valid) {
      // Your sign in logic
      console.log("Create account", event);

      // Call createContact with form values
      // const target = event.target as typeof event.target & {
      //   firstName: { value: string };
      //   lastName: { value: string };
      //   email: { value: string };
      //   newsletter: { checked: boolean };
      //   termsOfService: { checked: boolean };
      // };

      // const firstName = target.firstName.value;
      // const lastName = target.lastName.value;
      // const emailAddress = target.email.value;
      // const newsletter = target.newsletter.checked;
      // const termsOfService = target.termsOfService.checked;

      // createContact(
      //   firstName,
      //   lastName,
      //   emailAddress,
      //   newsletter,
      //   termsOfService
      // );
    }
  }

  return (
    <>
      {!checkIsLoggedIn() && (
        <Nav.Item className="utilnav-item ">
          <button
            className="login-link nav-link"
            onClick={() => openLoginModal()}
          >
            Login
          </button>
        </Nav.Item>
      )}

      <Modal size="lg" show={isLoginModalVisible} onHide={closeLoginModal}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Site Access</Modal.Title>
        </Modal.Header>
        <Subnav>
          <NavItem>
            <NavLink
              title="Sign-in"
              eventKey="1"
              className={`pt-4 pb-4 ${tab === "signIn" ? "active" : ""}`}
              onClick={handleToggleModal}
            >
              Sign-in
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              title="Create an account"
              eventKey="2"
              className={`pt-4 pb-4 ${tab === "createAccount" ? "active" : ""}`}
              onClick={handleToggleModal}
            >
              Create an account
            </NavLink>
          </NavItem>
        </Subnav>
        <Modal.Body>
          {/* Modal Body */}
          {/* Sign In / Create Account Form Content */}

          {tab === "signIn" ? (
            <>
              <Form onSubmit={handleSignIn} noValidate>
                <TextInput
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  error={errorEmail}
                />
                <TextInput
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  error={errorPassword}
                />
                <div className="text-center mb-4">
                  <Button type="submit" className="text-center">
                    Sign In
                  </Button>
                </div>
              </Form>

              {isFromCheckout && (
                <>
                  <Form
                    onSubmit={handleContinueAsGuest}
                    className="text-center"
                  >
                    <p>
                      <b>OR</b>
                    </p>
                    <TextInput
                      placeholder="Email"
                      name="Email"
                      type="Email"
                      value={emailContinueAsGuest}
                      onChange={e => setEmailContinueAsGuest(e.target.value)}
                      error={errorEmailContinueAsGuest}
                    />
                    <Form.Check type="checkbox" className="text-left mb-4">
                      <Form.Check.Input
                        type="checkbox"
                        required
                        id="termsOfUseContinueAsGuest"
                      />
                      <Form.Check.Label htmlFor="termsOfUseContinueAsGuest">
                        I agree to the
                        <Link href="/terms-of-use"> terms of service </Link>
                        and
                        <Link href="/privacy-policy"> privacy policy</Link>.
                      </Form.Check.Label>
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Check>
                    <Button type="submit">Continue as Guest</Button>
                  </Form>
                </>
              )}
            </>
          ) : (
            <Form onSubmit={handleCreateAccount} noValidate>
              <TextInput
                placeholder="First Name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                error={errorFirstName}
              />
              <TextInput
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                error={errorLastName}
              />
              <TextInput
                placeholder="Email Address"
                name="email2"
                type="email"
                value={email2}
                onChange={e => setEmail2(e.target.value)}
                error={errorEmail2}
              />

              <Form.Check type="checkbox">
                <Form.Check.Input type="checkbox" id="signUpForNewsletter" />
                <Form.Check.Label htmlFor="signUpForNewsletter">
                  Sign up for newsletter
                </Form.Check.Label>
              </Form.Check>
              <Form.Check type="checkbox">
                <Form.Check.Input type="checkbox" required id="termsOfUse" />
                <Form.Check.Label htmlFor="termsOfUse">
                  Agree to
                  <Link href="/terms-of-use"> Terms &amp; Conditions</Link>
                </Form.Check.Label>
                <Form.Control.Feedback type="invalid">
                  You did it!
                </Form.Control.Feedback>
              </Form.Check>
              {/* Please accept Terms Of Service. */}
              <Button type="submit" className="btn-primary">
                Create Account
              </Button>
            </Form>
          )}

          {
            // TODO: Replace with loader component
            isLoggingIn && <div>Loading...</div>
          }
        </Modal.Body>

        {isFromCheckout && (
          <div className="w-full bg-gray-100 text-center mt-2 py-2">
            <button
              className="uppercase text-blue-light hover:text-blue-dark py-3 font-sans text-lg"
              onClick={() => handleReturnToCart()}
            >
              Return to Shopping Cart
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
export default LoginLogout;
