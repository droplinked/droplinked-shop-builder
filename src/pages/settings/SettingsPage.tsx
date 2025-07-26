import PageGrid from 'components/redesign/page-grid/PageGrid';
import { Form, Formik } from 'formik';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import ar from 'locales/settings/ar.json';
import en from 'locales/settings/en.json';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from 'stores/app/appStore';
import SaveChangesDrawer from './components/common/SaveChangesDrawer';
import TabsContent from './components/common/TabsContent';
import { createSettingsPageSchema, getSettingsPageInitValues } from './utils/formConfigs';

function SettingsPage() {
    const { t } = useLocaleResources('settings', {
        ar: ar,
        en: en
    })
    const { i18n } = useTranslation()
    const { shop, user, updateShop, fetchShop } = useAppStore()
    const { showToast } = useAppToast()

    // Create the schema with the translation function
    const settingsPageSchema = createSettingsPageSchema(t);

    const handleSubmit = async (values, submitProps) => {
        const { setSubmitting, resetForm } = submitProps
        setSubmitting(true)
        try {
            //we use !!values.pre_purchase_data_fetch to handle active/deactive state of pre_purchase_data_fetch 
            await updateShop({ ...values, pre_purchase_data_fetch: { active: !!values.pre_purchase_data_fetch, title: values.pre_purchase_data_fetch } });
            await fetchShop({ shopName: shop.name })
            i18n.changeLanguage(values.defaultLanguage)
            resetForm({ values })
            showToast({ type: "success", message: t("SettingsPage.updateSuccess") })
        } catch (error) {
            showToast({ type: "error", message: error.message || error?.data?.message || t("common:genericError") })
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        fetchShop({ shopName: shop.name })
    }, [])

    return (
        <PageGrid.Root>
            <PageGrid.Header title={t("SettingsPage.title")} description={t("SettingsPage.description")} />
            <Formik
                initialValues={getSettingsPageInitValues(shop, user, i18n.language)}
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