import { useProfile } from "functions/hooks/useProfile/useProfile";

export default class AffiliateModel {
    static links = () => {
        const { shop } = useProfile();

        return [
            {
                caption: "Community",
                link: `/${shop.name}/c/affiliate`
            },
            {
                caption: "Notifications",
                link: `/${shop.name}/c/affiliate/notifications`
            },
            {
                caption: "My Requests",
                link: `/${shop.name}/c/affiliate/requests`
            }
        ]
    }
}