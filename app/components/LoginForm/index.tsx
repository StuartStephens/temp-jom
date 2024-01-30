"use client";
import { useEffect } from "react";
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../contexts/Auth/Context";
import { useCMColorModeProviderContext } from "../../contexts/ColorModeContext/CMColorModeContext";
import { hasErrors } from "../../contexts/utilities/FormSupport/FSUtils";
import { FormErrors } from "../../contexts/utilities/FormSupport/FormErrors";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import {
    FormField,
    VALIDATION_TYPES,
} from "../../contexts/utilities/FormSupport/FormSupportTypes";
import { LoadingSpinner } from "../LoadingSpinner";

export interface ILoginFormProps { }

export const LOGIN_FORM: Map<string, FormField> = new Map<string, FormField>([
    [
        "Email",
        {
            type: "text",
            defaultValue: "",
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "Card Number is Required",
                },
            ],
        },
    ],
    [
        "Password",
        {
            type: "text",
            defaultValue: "",
            validationProps: [
                {
                    validationType: VALIDATION_TYPES.REQUIRED,
                    message: "Name on Card is Required",
                },
            ],
        },
    ],
]);

export interface ILoginForm {
    Email: string;
    Password: string;
}

export function LoginForm(props: ILoginFormProps) {
    const { form, errors, state, handleInputChange, handleInputBlur, resetForm } =
        useFormSupportContext();
    const { login, checkIsLoggedIn, logout, isLoggingIn } = useAuth();
    const { emailAddresses, dashboardHero } = useAccountInfoContext();
    const { changeColorMode } = useCMColorModeProviderContext();

    function handleCancel() {
        resetForm();
    }

    function postForm() {
        if (form) {
            login(form.Email, form.Password);
        }
    }
    useEffect(() => {
        if (checkIsLoggedIn()) {
            logout();
        }
    }, []);

    return (
        <Form>
            {!checkIsLoggedIn() ? (
                <Container fluid className="full-width ">
                    {isLoggingIn ? (
                        <LoadingSpinner />
                    ) : (
                        <Container fluid className="full-width ">
                            <Row>
                                <Col className="col-12 ">
                                    <h2>Login</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="col-12   mt-4">
                                    <FloatingLabel controlId="Email" label="Email">
                                        <Form.Control
                                            size="sm"
                                            type="Email"
                                            placeholder="Email"
                                            name="Email"
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            // defaultValue={undefined}
                                            value={
                                                form?.Email && form?.Email.length > 0 ? form?.Email : ""
                                            }
                                            isInvalid={hasErrors(errors, errors?.Email)}
                                            inputMode="numeric"
                                            pattern="[0-9\s]{13,19}"
                                        // required={true}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors?.Email?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} className="col-12   mt-4">
                                    <FloatingLabel controlId="Password" label="Password">
                                        <Form.Control
                                            size="sm"
                                            type="Password"
                                            placeholder="Password"
                                            name="Password"
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            // defaultValue={undefined}
                                            value={
                                                form?.Password && form?.Password.length > 0
                                                    ? form?.Password
                                                    : " "
                                            }
                                            isInvalid={hasErrors(errors, errors?.Password)}
                                        // required={true}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors?.Password?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            {errors &&
                                Object.values(errors).filter((o) => !!o).length > 0 && (
                                    <Row>
                                        <Col className="col-12 ">
                                            <FormErrors />
                                        </Col>
                                    </Row>
                                )}
                            <Row>
                                <Col className="col-12 pt-3">
                                    <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-center">
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                // login(form?.Email, form?.Password);
                                                // login(form.email, form.password);
                                                postForm(); // for this one, we are just going to use the auth context login
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Container>
            ) : null}
        </Form>
    );
}
