import { fetchPrincipalNFTs } from "./NFTcheck";
import { hasToken } from "../WalletAuth/api"

export const CheckRules = (rules, mainet) => {
    // let result = false ;
    rules.forEach((rule) => {
        let x = hasToken(mainet, rule.address)
    });
};