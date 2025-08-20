// Australian Dollar imports
import { AustralianDollarLg } from 'assets/icons/Finance/AustralianDollar/AustralianDollarLg';
import { AustralianDollarMd } from 'assets/icons/Finance/AustralianDollar/AustralianDollarMd';
import { AustralianDollarSm } from 'assets/icons/Finance/AustralianDollar/AustralianDollarSm';

// Canadian Dollar imports
import { CanadianDollarLg } from 'assets/icons/Finance/CanadianDollar/CanadianDollarLg';
import { CanadianDollarMd } from 'assets/icons/Finance/CanadianDollar/CanadianDollarMd';
import { CanadianDollarSm } from 'assets/icons/Finance/CanadianDollar/CanadianDollarSm';

// Chinese Yuan imports
import { ChineeseyuanLg } from 'assets/icons/Finance/ChineeseYuan/ChineeseyuanLg';
import { ChineeseyuanMd } from 'assets/icons/Finance/ChineeseYuan/ChineeseyuanMd';
import { ChineeseyuanSm } from 'assets/icons/Finance/ChineeseYuan/ChineeseyuanSm';

// Dirham imports
import { DirhamLg } from 'assets/icons/Finance/Dirham/DirhamLg';
import { DirhamMd } from 'assets/icons/Finance/Dirham/DirhamMd';
import { DirhamSm } from 'assets/icons/Finance/Dirham/DirhamSm';

// Dollar imports
import { DollarLg } from 'assets/icons/Finance/Dollar/DollarLg';
import { DollarMd } from 'assets/icons/Finance/Dollar/DollarMd';
import { DollarSm } from 'assets/icons/Finance/Dollar/DollarSm';

// Euro imports
import { EuroLg } from 'assets/icons/Finance/Euro/EuroLg';
import { EuroMd } from 'assets/icons/Finance/Euro/EuroMd';
import { EuroSm } from 'assets/icons/Finance/Euro/EuroSm';

// Japanese Yen imports
import { JapaneseyenLg } from 'assets/icons/Finance/JapaneseYen/JapaneseyenLg';
import { JapaneseyenMd } from 'assets/icons/Finance/JapaneseYen/JapaneseyenMd';
import { JapaneseyenSm } from 'assets/icons/Finance/JapaneseYen/JapaneseyenSm';

// Pound imports
import { PoundLg } from 'assets/icons/Finance/Pound/PoundLg';
import { PoundMd } from 'assets/icons/Finance/Pound/PoundMd';
import { PoundSm } from 'assets/icons/Finance/Pound/PoundSm';
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter';
import React from 'react';

interface Props {
    color?: string
    size?: "sm" | "md" | "lg"
}

export default function CurrencyIcon({ color, size = "md" }: Props) {
    const { abbreviation } = useCurrencyConverter()
    const iconProps = color ? { color } : {}

    const renderIcon = () => {
        switch (abbreviation) {
            case "USD":
                if (size === "sm") return <DollarSm {...iconProps} />
                if (size === "lg") return <DollarLg {...iconProps} />
                return <DollarMd {...iconProps} />
            case "EUR":
                if (size === "sm") return <EuroSm {...iconProps} />
                if (size === "lg") return <EuroLg {...iconProps} />
                return <EuroMd {...iconProps} />
            case "JPY":
                if (size === "sm") return <JapaneseyenSm {...iconProps} />
                if (size === "lg") return <JapaneseyenLg {...iconProps} />
                return <JapaneseyenMd {...iconProps} />
            case "GBP":
                if (size === "sm") return <PoundSm {...iconProps} />
                if (size === "lg") return <PoundLg {...iconProps} />
                return <PoundMd {...iconProps} />
            case "AUD":
                if (size === "sm") return <AustralianDollarSm {...iconProps} />
                if (size === "lg") return <AustralianDollarLg {...iconProps} />
                return <AustralianDollarMd {...iconProps} />
            case "CAD":
                if (size === "sm") return <CanadianDollarSm {...iconProps} />
                if (size === "lg") return <CanadianDollarLg {...iconProps} />
                return <CanadianDollarMd {...iconProps} />
            case "AED":
                if (size === "sm") return <DirhamSm {...iconProps} />
                if (size === "lg") return <DirhamLg {...iconProps} />
                return <DirhamMd {...iconProps} />
            case "CNY":
                if (size === "sm") return <ChineeseyuanSm {...iconProps} />
                if (size === "lg") return <ChineeseyuanLg {...iconProps} />
                return <ChineeseyuanMd {...iconProps} />
            default:
                return null
        }
    }

    return renderIcon()
}