import * as Yup from 'yup';

export const collectionCreateInputFields = [
    {
        name: 'title',
        label: 'Collection Name',
        description: 'Provide a title to the collection that will be displayed to site visitors.',
        placeholder: 'e.g., StreamWave',
        maxLength: 40,
        isRequired: true,
    },
    {
        name: 'description',
        label: 'Description',
        description: 'Provide the message to display to visitors.',
        placeholder: 'e.g., StreamWave',
        maxLength: 100,
        rows: 2
    },
];

export const collectionCreateSchema = Yup.object().shape({
    title: Yup.string().required('Please provide a name for the collection'),
    description: Yup.string(),
    image: Yup.string().required('Please provide an image for the collection')
});