import * as Yup from 'yup';

export const getCollectionCreateInputFields = (t) => [
    {
        name: 'title',
        label: t("create.fields.name.label"),
        description: t("create.fields.name.description"),
        placeholder: t("create.fields.name.placeholder"),
        maxLength: 40,
        isRequired: true,
    },
    {
        name: 'description',
        label: t("common:description"),
        description: t("create.fields.description.description"),
        placeholder: t("create.fields.description.placeholder"),
        maxLength: 100,
        rows: 2
    },
];

export const getCollectionCreateSchema = (t) => Yup.object().shape({
    title: Yup.string().required(t("create.validation.nameRequired")),
    description: Yup.string(),
    image: Yup.string().required(t("create.validation.imageRequired"))
});