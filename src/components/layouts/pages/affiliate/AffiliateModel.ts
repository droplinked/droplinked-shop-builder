import { useProfile } from "functions/hooks/useProfile/useProfile";

export default class AffiliateModel {
    static links = () => {
        const { shop } = useProfile();

        return [
            {
                caption: "Affiliate Products",
                link: `/${shop.name}/c/affiliate`
            },
            {
                caption: "Affiliate Stores",
                link: `/${shop.name}/c/affiliate/stores`
            },
            // {
            //     caption: "Joined Stores",
            //     link: `/${shop.name}/c/affiliate/joined`
            // },
            {
                caption: "Notifications",
                link: `/${shop.name}/c/affiliate/notifications`
            },
            {
                caption: "My Requests",
                link: `/${shop.name}/c/affiliate/requests`
            },
            // {
            //     caption: "Svaed Products",
            //     link: `/${shop.name}/c/affiliate/saved`
            // }
        ]
    }
}