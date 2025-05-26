import PageGrid from 'components/redesign/page-grid/PageGrid';
import { Form, Formik } from 'formik';
import useAppToast from 'hooks/toast/useToast';
import useAppStore from 'stores/app/appStore';
import React, { useEffect } from 'react';
import SaveChangesDrawer from './components/common/SaveChangesDrawer';
import TabsContent from './components/common/TabsContent';
import { getSettingsPageInitValues, settingsPageSchema } from './utils/formConfigs';

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

    useEffect(() => {
        fetchShop({ shopName: shop.name })
    }, [])

    return (
        <PageGrid.Root>
            <PageGrid.Header title='Settings' description='Customize the platform to your Preferences' />
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
    )
}

export default SettingsPage;