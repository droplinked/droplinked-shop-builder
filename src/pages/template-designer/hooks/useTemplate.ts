import { useMutation, useQuery } from 'react-query';
import useAppToast from 'hooks/toast/useToast';
import { getShopTemplate, updateShopTemplate } from 'services/shop/shopServices';

const useTemplate = () => {
    const { showToast } = useAppToast()
    const { data: templateData, isFetching: isLoadingTemplate } = useQuery({
        queryKey: ['shopTemplate'],
        queryFn: getShopTemplate,
        select: (data) => data.data.shopTemplate
    });

    const { mutate: updateTemplate, isLoading: isUpdatingTemplate } = useMutation(
        ['updateShopTemplate'],
        (data: string) => updateShopTemplate(data),
        {
            onSuccess: () => {
                showToast({ message: "Template Updated Successfully", type: "success" });
            },
            onError: () => {
                showToast({ message: "Template Update Failed", type: "error" });
            }
        }
    );

    return {
        templateData,
        isLoadingTemplate,
        updateTemplate,
        isUpdatingTemplate
    };
};

export default useTemplate;
