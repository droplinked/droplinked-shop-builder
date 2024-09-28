import { ReactNode } from "react";

interface ISectionWithText {
    title: string;
    description: string;
}

interface IImageSection extends ISectionWithText {
    image: string;
}

interface ICTAButton {
    CTAButtonText: string;
    CTAButtonFunction?: () => void;
}

export interface IAboveTheFoldSection extends IImageSection, ICTAButton { }

export interface IDetailsItem extends ISectionWithText {
    icon: ReactNode;
}

export interface IDetailsSection extends ISectionWithText {
    detailItems: IDetailsItem[];
}

export interface IDualSideFlex extends IImageSection { }

export interface ILandingPageTemplate {
    aboveTheFoldSection: IAboveTheFoldSection;
    detailsSection: IDetailsSection;
    dualSideFlexData: IDualSideFlex[];
    features: ISectionWithText[];
}