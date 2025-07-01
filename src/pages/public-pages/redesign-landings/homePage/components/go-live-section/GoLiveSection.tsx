import { ArrowrightMd } from "assets/icons/Navigation/ArrowRight/ArrowrightMd";
import AppButton from "components/redesign/button/AppButton";
import { AUTH_ROUTES } from "constants/authRoutes";
import React from "react";
import { Link } from "react-router-dom";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/public-pages/redesign-landings/homePage/en.json';
import localAr from 'locales/public-pages/redesign-landings/homePage/ar.json';
import SectionContainer from "../../../_shared/components/SectionContainer/SectionContainer";
import { useStepController } from "../../hooks/useStepController";
import HowItWorks from "../../svgs/HowItWorks";
import Stepper from "./Stepper";

export default function GoLiveSection() {
    const stepControllerValues = useStepController();
    const { t } = useLocaleResources('homePage', { en: localEn, ar: localAr });

    return (
        <SectionContainer
            icon="sparkle"
            sectionTitle={t('goLive.sectionTitle')}
            headingTitle={t('goLive.headingTitle')}
            headingSubtitle={t('goLive.headingSubtitle')}
            typographySvg={<HowItWorks style={{ marginTop: "48px" }} />}
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton rightIcon={<ArrowrightMd />}>{t('goLive.getStarted')}</AppButton>
                </Link>
            }
        >
            <Stepper {...stepControllerValues} />
        </SectionContainer>
    );
}
