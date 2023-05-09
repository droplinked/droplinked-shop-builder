import * as Yup from 'yup';

export interface IRequestModelValues {
    quantity: string
}

export default class ModalRequestModel {
    static formSchema = () => {
        return Yup.object().shape({
            quantity: Yup.string().required('Required'),
        });
    }
}