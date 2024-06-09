export default interface IPlan {
    label: string;
    price: { amount: string; foreground: string; background: string };
    description: string;
    base_feature: string;
    features: { label: string; specific_features: string[] }[];
}