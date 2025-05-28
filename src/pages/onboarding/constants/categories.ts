import { BookMd } from "assets/icons/Items/Book/BookMd";
import { CarMd } from "assets/icons/Items/Car/CarMd";
import { DresswomanclothMd } from "assets/icons/Items/DressWomanCloth/DresswomanclothMd";
import { FoodMd } from "assets/icons/Items/Food/FoodMd";
import { HealthMd } from "assets/icons/Items/Health/HealthMd";
import { KidclothMd } from "assets/icons/Items/KidCloth/KidclothMd";
import { PetsuppliesMd } from "assets/icons/Items/PetSupplies/PetsuppliesMd";
import { SoapMd } from "assets/icons/Items/Soap/SoapMd";
import { SofafurnitureMd } from "assets/icons/Items/SofaFurniture/SofafurnitureMd";
import { SportMd } from "assets/icons/Items/Sport/SportMd";
import { WatchMd } from "assets/icons/Items/Watch/WatchMd";
import { BrushMd } from "assets/icons/StyleDesigner/Brush/BrushMd";
import { AudioMd } from "assets/icons/System/Audio/AudioMd";
import { RobotMd } from "assets/icons/System/Robot/RobotMd";
import { TechnologyMd } from "assets/icons/System/Technology/TechnologyMd";
import { SVGProps } from "react";
import { TFunction } from "i18next";

export interface AiCategory {
    key: string
    icon?: React.FC<SVGProps<SVGSVGElement>>
    title?: string
}

export const getCategories = (t: TFunction): AiCategory[] => [
    {
        key: "fashion",
        icon: DresswomanclothMd,
        title: t('categories.fashion')
    },
    {
        key: "technology",
        icon: TechnologyMd,
        title: t('categories.technology')
    },
    {
        key: "beauty",
        icon: SoapMd,
        title: t('categories.beauty')
    },
    {
        key: "home",
        icon: SofafurnitureMd,
        title: t('categories.home')
    },
    {
        key: "health",
        icon: HealthMd,
        title: t('categories.health')
    },
    {
        key: "food",
        icon: FoodMd,
        title: t('categories.food')
    },
    {
        key: "art",
        icon: BrushMd,
        title: t('categories.art')
    },
    {
        key: "automotive",
        icon: CarMd,
        title: t('categories.automotive')
    },
    {
        key: "toys",
        icon: RobotMd,
        title: t('categories.toys')
    },
    {
        key: "books",
        icon: BookMd,
        title: t('categories.books')
    },
    {
        key: "entertainment",
        icon: AudioMd,
        title: t('categories.entertainment')
    },
    {
        key: "petSupplies",
        icon: PetsuppliesMd,
        title: t('categories.petSupplies')
    },
    {
        key: "sports",
        icon: SportMd,
        title: t('categories.sports')
    },
    {
        key: "kids",
        icon: KidclothMd,
        title: t('categories.kids')
    },
    {
        key: "luxury",
        icon: WatchMd,
        title: t('categories.luxury')
    },
]