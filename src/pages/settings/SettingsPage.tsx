import PageGrid from 'components/redesign/page-grid/PageGrid';
import TabsContent from './components/common/TabsContent';
import React from 'react';
import { Box } from '@chakra-ui/react';
import SaveChangesDrawer from './components/common/SaveChangesDrawer';
import useAppStore from 'lib/stores/app/appStore';
import { Form, Formik } from 'formik';
import { getSettingsPageInitValues, settingsPageSchema } from './formConfigs';
import useAppToast from 'functions/hooks/toast/useToast';

function SettingsPage() {
    const { shop, user, updateShop, fetchShop } = useAppStore()
    const { showToast } = useAppToast()

    const handleSubmit = async (values, submitProps) => {
        const { setSubmitting, resetForm } = submitProps
        setSubmitting(true)
        try {
            //TODO: Must update user too
            await updateShop({ ...values });
            await fetchShop({ shopName: shop.name })
            resetForm({ values })
            showToast({ type: "success", message: "Settings updated successfully" })
        } catch (error) {
            showToast({ type: "error", message: error.message || "Oops! Something went wrong." })
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