import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { IProductDetails } from "../../contexts/Common/TransactionDetailsTypes";
import { useAuth } from "../../contexts/Auth/Context";
import { hasErrors } from "../../contexts/utilities/FormSupport/FSUtils";
import {
    IFSContextInitializer,
    useFormSupportContext,
} from "../../contexts/utilities/FormSupport/FormSupportContext";
import { formatPrice } from "../../contexts/utilities/FormatUtils";
import { withFSContextFormSupport } from "../../contexts/utilities/FormSupport/FormSupport";
import Link from "next/link";
import { JOMButtonLink } from "../../../app/components/shared/controls/JOMButtonLink";
import {
    PAGE_GUTTER,
    PageGutterLayout,
} from "../../../app/layouts/PageGutterLayout";
import { useUIStateContext } from "../../contexts/UIStateContext/Context";
import { ILinkItemNode } from "../../../app/components/cms/types/core/CoreTypes";
import { linkSync } from "fs";

export interface IDonateDialogFormProps {
    children?: ReactNode;
    links?: ILinkItemNode[];
    submitLinkText: string;
}

export type IACODonateDialogForm = {
    donationAmount?: string;
    otherAmount?: string;
    productOption?: string;
    monthlyPartnerAgreement?: boolean;
    billDayOfMonth: string;
};

export function DonateDialogForm(props: IDonateDialogFormProps) {
    const {
        form,
        errors,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleSelectBlur,
        validateLocally,
    } = useFormSupportContext();
    const { setIsDonateDialogVisible } = useUIStateContext();
    const { contactInfo } = useAuth();
    const [donationAmounts, setDonationAmounts] = useState<number[]>();
    const [productOptions, setProductOptions] = useState<IProductDetails[]>();

    const generateDonationOptions = (): number[] => {
        return [50, 75, 100, 250];
    };

    const generateProductOptions = (): IProductDetails[] => {
        return [
            {
                Id: "PRODUCT__1",
                Description: "Think This, Not That Book",
            },
        ] as IProductDetails[];
    };

    useEffect(() => {
        initializeForm();
        // eslint-disable-next-line
    }, []);

    function initializeForm(): void {
        const dOPtions: number[] = generateDonationOptions();
        setDonationAmounts(dOPtions);

        const pOptions: IProductDetails[] = generateProductOptions();
        setProductOptions(pOptions);

        // const oData: IACODonateDialogForm = {
        //   donationAmount: "" + (dOPtions && dOPtions[0]) || "",
        //   productOption: (pOptions && pOptions[0].Id) || "NONE",
        //   monthlyPartnerAgreement: false,
        //   otherAmount: "",
        // };

        // initForm(oData);
    }

    function postForm() {
        if (!validateLocally()) {
            return;
        }
        alert(JSON.stringify(form));
        // TODO: convert this to whatever type the API expects
    }

    function isProceedEnabled(): boolean {
        if (
            form.donationAmount &&
            form.donationAmount === "OTHER" &&
            !form?.otherAmount
        ) {
            //validateLocally();
            return false;
        }
        return !hasErrors(errors, errors?.otherAmount);
    }

    function handleDonationAmountChanged(
        e: ChangeEvent<HTMLSelectElement>,
        form?: any
    ) {
        handleSelectChange(e, form);
    }

    return (
        <Form>
            <PageGutterLayout variant={PAGE_GUTTER.NONE}>
                <Row>
                    {donationAmounts && (
                        <Form.Group as={Col} className="col-12 col-md-12 mt-3">
                            <FloatingLabel controlId="donationAmount" label="Donation Amount">
                                <Form.Select
                                    id="donationAmount"
                                    name="donationAmount"
                                    aria-label="Donation Amount"
                                    onChange={handleSelectChange}
                                    onBlur={handleSelectBlur}
                                    value={form?.donationAmount || ""}
                                // defaultValue={(donationAmounts && donationAmounts[0]) || ""}
                                >
                                    {donationAmounts.map((c: number) => (
                                        <option key={c} value={c}>
                                            {formatPrice(c, contactInfo?.DefaultCurrency)}
                                        </option>
                                    ))}
                                    <option value="OTHER">Other</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                    )}
                </Row>
                <Row>
                    {form && form.donationAmount && form.donationAmount === "OTHER" && (
                        <Form.Group as={Col} className="col-12 col-md-12 mt-4">
                            <FloatingLabel controlId="otherAmount" label="Other Amount">
                                <Form.Control
                                    type="text"
                                    placeholder="Other Amount"
                                    name="otherAmount"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    // defaultValue={form.otherAmount}
                                    value={form?.otherAmount || ""}
                                    isInvalid={
                                        hasErrors(errors, errors?.otherAmount) ||
                                        (form.donationAmount &&
                                            form.donationAmount === "OTHER" &&
                                            (!form?.otherAmount || form.otherAmount == ""))
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors?.otherAmount && errors?.otherAmount?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    )}
                </Row>

                <Row>
                    {productOptions && (
                        <Form.Group as={Col} className="col-12 col-md-12 mt-3">
                            <FloatingLabel controlId="productOption" label="And Receive">
                                <Form.Select
                                    id="productOption"
                                    name="productOption"
                                    aria-label="And Receive"
                                    onChange={handleSelectChange}
                                    onBlur={handleSelectBlur}
                                    value={form?.productOption}
                                // defaultValue={
                                //   (productOptions && productOptions[0].Id) || ""
                                // }
                                >
                                    {productOptions.map((c: IProductDetails) => (
                                        <option key={c.Id} value={c.Id}>
                                            {c.Description}
                                        </option>
                                    ))}
                                    <option value="NONE">No Products, Donation Only</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                    )}
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form.Check
                            className="col-12 col-md-12 mt-3"
                            inline
                            name="monthlyPartnerAgreement"
                            // defaultValue={form.monthlyPartnerAgreement}
                            value={form?.monthlyPartnerAgreement || false}
                            type="checkbox"
                            onChange={handleInputChange}
                            label="Become a monthly partner by making this a recurring donation"
                        />
                    </Col>
                </Row>
                <Row>
                    {form?.monthlyPartnerAgreement && (
                        <Form.Group as={Col} className="col-12 col-md-12 mt-3">
                            <FloatingLabel
                                controlId="billDayOfMonth"
                                label="Bill me on this day of the month: "
                            >
                                <Form.Select
                                    id="billDayOfMonth"
                                    name="billDayOfMonth"
                                    aria-label="Bill me on this day of the month: "
                                    onChange={handleSelectChange}
                                    onBlur={handleSelectBlur}
                                    value={form?.billDayOfMonth}
                                >
                                    {(() => {
                                        let td = [];
                                        for (let i = 1; i <= 28; i++) {
                                            let val = i < 4 ? i + "rd" : i + "th";
                                            if (i == 1) val = "1st";
                                            td.push(
                                                <option key={i} value={i}>
                                                    {val}
                                                </option>
                                            );
                                        }
                                        return td;
                                    })()}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                    )}
                </Row>
            </PageGutterLayout>
            <Container
                fluid
                className="full-width mt-3 mb-4 page-gutter page-gutter-small"
            >
                {props.children}
            </Container>
            <Container className="d-flex flex-row justify-content-center gap-2 mb-3 page-gutter page-gutter-small">
                {props.links &&
                    props.links.map((link: ILinkItemNode) => {
                        return (
                            <JOMButtonLink
                                key={link?.Href}
                                buttonProps={{
                                    variant: "outline-dark",
                                    className: "outline-dark",
                                }}
                                href={link?.Href}
                            >
                                {link?.Title}
                            </JOMButtonLink>
                        );
                    })}

                <Button
                    variant="primary"
                    className="primary"
                    disabled={!isProceedEnabled()}
                    onClick={() => {
                        isProceedEnabled() && validateLocally() && postForm();
                    }}
                >
                    {props.submitLinkText}
                </Button>
            </Container>
        </Form>
    );
}

type DonateDialogFormFSProps = IDonateDialogFormProps & IFSContextInitializer;

export function DonateDialogWithFormSupport(props: DonateDialogFormFSProps) {
    const DonateDialogFormFS = withFSContextFormSupport(DonateDialogForm);
    return <DonateDialogFormFS {...props}>{props.children}</DonateDialogFormFS>;
}

