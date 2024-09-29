import { ReactNode } from "react"

interface ISectionWithText {
    title: string
    description: string | IDescriptionWithBoldWord[]
}

interface IDescriptionWithBoldWord {
    boldText: string
    rest: string
}

interface IImageSection extends ISectionWithText {
    image: string
}

interface ICTAButton {
    CTAButtonText: string
    CTAButtonFunction?: () => void
}

export interface IAboveTheFoldSection extends IImageSection, ICTAButton { }

export interface IDetailsItem extends ISectionWithText {
    icon: ReactNode
}

export interface IDetailsSection extends ISectionWithText {
    detailItems: IDetailsItem[]
}

export interface IFeatureGroup {
    title?: string
    features: ISectionWithText[]
}

export interface IDualSideFlex extends IImageSection {
    description: string | IDescriptionWithBoldWord[]
}

export interface ILandingPageTemplate {
    aboveTheFoldSection: IAboveTheFoldSection
    detailsSection: IDetailsSection
    dualSideFlexData: IDualSideFlex[]
    featureGroups: IFeatureGroup[]
}