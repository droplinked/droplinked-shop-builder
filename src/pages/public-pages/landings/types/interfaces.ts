import { ReactNode } from "react"

export interface ISectionWithText {
    title: string
    description: string | IDescriptionWithBoldWord[]
}

interface IDescriptionWithBoldWord {
    boldText: string
    rest: string
}

export interface IImageSection extends ISectionWithText {
    image: string
}

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
    aboveTheFoldSection: IImageSection
    detailsSection: IDetailsSection
    dualSideFlexData: IDualSideFlex[]
    featureGroups: IFeatureGroup[]
}