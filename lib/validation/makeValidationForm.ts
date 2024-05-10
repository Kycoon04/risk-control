import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationFormSchema = Yup.object({
    name: Yup.string().required("Por favor, completa este campo"),
    //inicialperiod: Yup.string().required("Por favor, selecciona una fecha inicial"),
    //finalperiod: Yup.string().required("Por favor, selecciona una fecha final"),
});
export const makeValidationForm = () => useForm({
    resolver: yupResolver(validationFormSchema)
});
