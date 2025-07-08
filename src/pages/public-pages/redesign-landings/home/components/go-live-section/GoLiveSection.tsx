import { ArrowrightMd } from "assets/icons/Navigation/ArrowRight/ArrowrightMd";
import AppButton from "components/redesign/button/AppButton";
import { AUTH_ROUTES } from "constants/authRoutes";
import React from "react";
import { Link } from "react-router-dom";
import SectionContainer from "../../../_shared/components/SectionContainer/SectionContainer";
import { useStepController } from "../../hooks/useStepController";
import HowItWorks from "../../svgs/HowItWorks";
import Stepper from "./Stepper";

export default function GoLiveSection() {
    const stepControllerValues = useStepController();

    return (
        <SectionContainer
            icon="sparkle"
            sectionTitle="GO LIVE IN MINUTES"
            headingTitle={`Effortlessly Designed \n Storefronts and Marketplaces`}
            headingSubtitle={`droplinked makes it simple to sell physical and digital inventory while allowing you \n to earn in cash or crypto`}
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton rightIcon={<ArrowrightMd />}>Get Started</AppButton>
                </Link>
            }
            typographySvg={<HowItWorks style={{ marginTop: "48px" }} />}
        >
            <Stepper {...stepControllerValues} />
        </SectionContainer>
    );
}
