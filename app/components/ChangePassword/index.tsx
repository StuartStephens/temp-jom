"use client";
import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    ProgressBar,
    Row,
} from "react-bootstrap";
import { FormErrors } from "../../contexts/utilities/FormSupport/FormErrors";
import {
    IFSContextInitializer,
    useFormSupportContext,
} from "../../contexts/utilities/FormSupport/FormSupportContext";
import { FormError } from "../../contexts/utilities/FormSupport/FormSupportTypes";
import { deepCopy, hasErrors } from "../../contexts/utilities/FormSupport/FSUtils";
import { withFSContextFormSupport } from "../../contexts/utilities/FormSupport/FormSupport";

export type IChangePasswordForm = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

export type IChangePasswordErrors = {
    currentPassword?: FormError;
    newPassword?: FormError;
    confirmPassword?: FormError;
};

export type IPasswordStrengthVO = {
    strength: number;
    dangerMin: number;
    warningMin: number;
    strongMin: number;
    longEnough: boolean;
    hasLowerAndUppercaseLetters: boolean;
    hasNumbersAndCharacters: boolean;
    hasOneSpecialCharacter: boolean;
    hasTwoSpecialCharacters: boolean;
};

export interface IChangePasswordFormProps { }

export function ChangePasswordForm(props: IChangePasswordFormProps) {
    const {
        form,
        errors,
        handleInputChange,
        handleInputBlur,
        validateLocally,
        initForm,
        // resetForm,
    } = useFormSupportContext();

    const defaultPasswordStrengthVO = {
        strength: 0,
        dangerMin: 1,
        warningMin: 3,
        strongMin: 4,
        longEnough: false,
        hasLowerAndUppercaseLetters: false,
        hasNumbersAndCharacters: false,
        hasOneSpecialCharacter: false,
        hasTwoSpecialCharacters: false,
    };
    const [passwordStrengthVO, setPasswordStrengthVO] =
        useState<IPasswordStrengthVO>(defaultPasswordStrengthVO);

    const [passwordStrengthTier, setPasswordStrengthTier] = useState("");
    const [passwordStrengthVariant, setPasswordStrengthVariant] =
        useState("normal");

    useEffect(() => {
        //initializeForm();
        // eslint-disable-next-line
    }, []);

    function initializeForm() {
        const initialForm: IChangePasswordForm = {
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined,
        };
        initForm(initialForm);
        setPasswordStrengthVO(defaultPasswordStrengthVO);
    }

    useEffect(() => {
        if (errors.newPassword) {
            if (form && form.newPassword && form.newPassword.length > 0) {
                const pwStrVO: IPasswordStrengthVO = errors.newPassword.cargo;
                if (pwStrVO) {
                    setPasswordStrengthVO(pwStrVO);
                    if (
                        pwStrVO &&
                        pwStrVO.strength >= 0 &&
                        pwStrVO.dangerMin &&
                        pwStrVO.warningMin &&
                        pwStrVO.strongMin
                    ) {
                        if (pwStrVO.strength <= pwStrVO.dangerMin) {
                            setPasswordStrengthVariant("danger");
                            setPasswordStrengthTier("Weak");
                        } else if (pwStrVO.strength <= pwStrVO.warningMin) {
                            setPasswordStrengthVariant("warning");
                            setPasswordStrengthTier("Good");
                        } else if (pwStrVO.strength <= pwStrVO.strongMin) {
                            setPasswordStrengthVariant("success");
                            setPasswordStrengthTier("Strong");
                        }
                    }
                }
            } else {
                setPasswordStrengthVO(defaultPasswordStrengthVO);
                setPasswordStrengthVariant("normal");
                setPasswordStrengthTier("");
            }
        }
        // eslint-disable-next-line
    }, [form, errors]);

    function postForm() {
        alert("SAVING FORM" + JSON.stringify(form));
    }

    return (
        <Container>
            <Form>
                <Container fluid className="full-width">
                    <Row>
                        <Col className="col-12 ">
                            <h2>Change Your Password</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="col-12   mt-4">
                            <FloatingLabel
                                controlId="currentPassword"
                                label="Current Password"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Current Password"
                                    name="currentPassword"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    // defaultValue={undefined}
                                    value={
                                        form?.currentPassword && form?.currentPassword.length > 0
                                            ? form?.currentPassword
                                            : ""
                                    }
                                    isInvalid={hasErrors(errors, errors?.currentPassword)}
                                    inputMode="numeric"
                                    pattern="[0-9\s]{13,19}"
                                    required={true}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors?.currentPassword?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} className="col-12   mt-4">
                            <FloatingLabel controlId="newPassword" label="New Password">
                                <Form.Control
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    // defaultValue={undefined}
                                    value={
                                        form?.newPassword && form?.newPassword.length > 0
                                            ? form?.password
                                            : ""
                                    }
                                    isInvalid={
                                        errors?.newPassword && errors?.newPassword?.message
                                    }
                                    required={true}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors?.newPassword?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Row>
                            <Col className="col-12 ">
                                <ProgressBar>
                                    <ProgressBar
                                        striped
                                        variant={passwordStrengthVariant}
                                        now={passwordStrengthVO && passwordStrengthVO.strength}
                                        key={1}
                                        max={5}
                                        label={passwordStrengthTier}
                                    />
                                </ProgressBar>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.newPassword?.message}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>

                        <Form.Group as={Col} className="col-12  mt-4">
                            <FloatingLabel
                                controlId="confirmPassword"
                                label="Confirm Password"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    // defaultValue={undefined}
                                    value={
                                        form?.confirmPassword && form?.confirmPassword.length > 0
                                            ? form?.confirmPassword
                                            : ""
                                    }
                                    isInvalid={hasErrors(errors, errors?.confirmPassword)}
                                    required={true}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors?.confirmPassword?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    {errors && Object.values(errors).filter((o) => !!o).length > 0 && (
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
                                        if (validateLocally()) {
                                            postForm();
                                        }
                                    }}
                                >
                                    Set My Password
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Container>
    );
}

type ChangePasswordFSProps = IChangePasswordFormProps & IFSContextInitializer;

export function ChangePasswordWithFormSupport(props: ChangePasswordFSProps) {
    const ChangePassword = withFSContextFormSupport(ChangePasswordForm);
    return <ChangePassword {...props} />;
}

