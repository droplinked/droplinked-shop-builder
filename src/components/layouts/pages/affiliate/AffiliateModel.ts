import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";

export default class AffiliateModel {
    static links = () => {
        const { shopRoute } = useCustomNavigate()

        return [
            {
                caption: "Affiliate Products",
                link: `${shopRoute}/affiliate`
            },
            {
                caption: "Affiliate Stores",
                link: `${shopRoute}/affiliate/stores`
            },
            // {
            //     caption: "Joined Stores",
            //     link: `${shopRoute}/affiliate/joined`
            // },
            {
                caption: "Notifications",
                link: `${shopRoute}/affiliate/notifications`
            },
            {
                caption: "My Requests",
                link: `${shopRoute}/affiliate/requests`
            },
            // {
            //     caption: "Svaed Products",
            //     link: `${shopRoute}/affiliate/saved`
            // }
        ]
    }
}