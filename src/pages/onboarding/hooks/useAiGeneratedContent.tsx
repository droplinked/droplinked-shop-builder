import useAppToast from 'hooks/toast/useToast';
import { generateDomains, generateHeroSection, generateLogos, generateShopNames } from 'lib/apis/ai/services';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import { useQuery } from 'react-query';

export const useAiGeneratedContent = (businessCategory: string, businessDescribe: string) => {
    const { showToast } = useAppToast();
    const { updateOnboardingState, storeSetup } = useOnboardingStore();

    const { isFetching: isLogosLoading, data: logos, refetch: refetchLogos } = useQuery({
        queryFn: () => generateLogos({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateLogos"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.logos || [];
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        onSuccess(data) {
            handleLogoChange(data?.[0]);
        },
        refetchOnMount: false,
    });

    const { isFetching: isCoversLoading, data: covers, refetch: refetchCovers } = useQuery({
        queryFn: () => generateHeroSection({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateHeroSection"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.heroSections || [];
        },
        onSuccess(data) {
            handleCoverChange(data?.[0]);
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        refetchOnMount: false,
    });

    const { isFetching: isUrlsLoading, data: urls, refetch: refetchUrls } = useQuery({
        queryFn: () => generateDomains({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateDomains"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.domains || [];
        },
        onSuccess(data) {
            handleUrlChange(data?.[0]);
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        refetchOnMount: false,
    });

    const { isFetching: isNamesLoading, data: names, refetch: refetchNames } = useQuery({
        queryFn: () => generateShopNames({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateShopNames"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.shopNames || [];
        },
        onSuccess(data) {
            handleNameChange(data?.[0]);
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" });
        },
        refetchOnMount: false,
    });

    const handleLogoChange = (logo: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, logo });
    };

    const handleCoverChange = (hero_section: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, hero_section });
    };

    const handleUrlChange = (shop_url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, shop_url });
    };

    const handleNameChange = (name: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, name });
    };

    return {
        logos: {
            data: logos || [],
            isLoading: isLogosLoading,
            refetch: refetchLogos,
            selectedLogo: storeSetup.logo,
            handleChange: handleLogoChange
        },
        covers: {
            data: covers || [],
            isLoading: isCoversLoading,
            refetch: refetchCovers,
            selectedCover: storeSetup.hero_section,
            handleChange: handleCoverChange
        },
        urls: {
            data: urls || [],
            isLoading: isUrlsLoading,
            refetch: refetchUrls,
            selectedUrl: storeSetup.shop_url,
            handleChange: handleUrlChange
        },
        names: {
            data: names || [],
            isLoading: isNamesLoading,
            refetch: refetchNames,
            selectedName: storeSetup.name,
            handleChange: handleNameChange
        }
    };
};
