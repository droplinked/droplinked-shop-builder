import { Box } from '@chakra-ui/react';
import PageGrid from 'components/redesign/page-grid/PageGrid';
import { Form, Formik } from 'formik';
import useAppToast from 'hooks/toast/useToast';
import useAppStore from 'lib/stores/app/appStore';
import React from 'react';
import SaveChangesDrawer from './components/common/SaveChangesDrawer';
import TabsContent from './components/common/TabsContent';
import { getSettingsPageInitValues, settingsPageSchema } from './formConfigs';

function SettingsPage() {
    const { shop, user, updateShop, fetchShop } = useAppStore()
    const { showToast } = useAppToast()

    const handleSubmit = async (values, submitProps) => {
        const { setSubmitting, resetForm } = submitProps
        setSubmitting(true)
        try {
            //we use !!values.pre_purchase_data_fetch to handle active/deactive state of pre_purchase_data_fetch 
            await updateShop({ ...values, pre_purchase_data_fetch: { active: !!values.pre_purchase_data_fetch, title: values.pre_purchase_data_fetch } });
            await fetchShop({ shopName: shop.name })
            resetForm({ values })
            showToast({ type: "success", message: "Settings updated successfully" })
        } catch (error) {
            showToast({ type: "error", message: error.message || error?.data?.message || "Oops! Something went wrong." })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <PageGrid.Root flexProps={{ overflowX: "hidden" }}>
            <Box mx={6} mt={6}>
                <PageGrid.Header title='Settings' description='Customize the platform to your Preferences' />
            </Box>
            <Formik
                initialValues={getSettingsPageInitValues(shop, user)}
                validateOnChange={false}
                validationSchema={settingsPageSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form style={{ width: "100%" }}>
                        <TabsContent />
                        <SaveChangesDrawer />
                    </Form>
                )}
            </Formik>

        </PageGrid.Root>
    );
}

export default SettingsPage;