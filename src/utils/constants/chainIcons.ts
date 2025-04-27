import { SolanaLogo } from "assets/logo/NetworkAndTokens/Solana/SolanaLogo";
import { EthereumLogo } from "assets/logo/NetworkAndTokens/Ethereum/EthereumLogo";
import { PolygonLogo } from "assets/logo/NetworkAndTokens/Polygon/PolygonLogo";
import { UsdcoinLogo } from "assets/logo/NetworkAndTokens/USDCoin/UsdcoinLogo";
import { FC, SVGProps } from "react";


export const ChainIcons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
    POLYGON: PolygonLogo,
    ETH: EthereumLogo,
    SOLANA: SolanaLogo,
    MATIC: PolygonLogo,
    SOL : SolanaLogo,
    USDC : UsdcoinLogo
    // Add more chains and their corresponding icons here as needed
};