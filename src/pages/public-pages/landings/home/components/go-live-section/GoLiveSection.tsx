import { ArrowrightMd } from "assets/icons/Navigation/ArrowRight/ArrowrightMd";
import AppButton from "components/redesign/button/AppButton";
import { AUTH_ROUTES } from "constants/authRoutes";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from "react";
import { Link } from "react-router-dom";
import SectionContainer from "../../../_shared/components/SectionContainer/SectionContainer";
import { useStepController } from "../../hooks/useStepController";
import HowItWorks from "../../svgs/HowItWorks";
import Stepper from "./Stepper";

export default function GoLiveSection() {
    const stepControllerValues = useStepController();
    const { t, isRTL } = useLocaleResources('homePage');

    return (
        <SectionContainer
            icon="sparkle"
            sectionTitle={t('goLive.sectionTitle')}
            headingTitle={t('goLive.headingTitle')}
            headingSubtitle={t('goLive.headingSubtitle')}
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton
                        {...isRTL ? { leftIcon: <ArrowrightMd /> } : { rightIcon: <ArrowrightMd /> }}
                    >
                        {t('getStarted')}
                    </AppButton>
                </Link>
            }
            typographySvg={<HowItWorks style={{ marginTop: "48px" }} />}
        >
            <Stepper {...stepControllerValues} />
        </SectionContainer>
    );
}
