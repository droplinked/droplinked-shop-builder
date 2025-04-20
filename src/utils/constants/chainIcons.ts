import { SolanaLogo } from "assets/logo/NetworkAndTokens/Solana/SolanaLogo";
import { EthereumLogo } from "assets/logo/NetworkAndTokens/Ethereum/EthereumLogo";
import { PolygonLogo } from "assets/logo/NetworkAndTokens/Polygon/PolygonLogo";
import { FC, SVGProps } from "react";


export const ChainIcons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
    POLYGON: PolygonLogo,
    ETH: EthereumLogo,
    SOLANA: SolanaLogo,
    // Add more chains and their corresponding icons here as needed
};