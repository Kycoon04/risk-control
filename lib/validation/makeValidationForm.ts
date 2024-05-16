import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationFormSchema = Yup.object({
    name: Yup.string().required("Por favor, completa este campo"),
});
export const makeValidationForm = () => useForm({
    resolver: yupResolver(validationFormSchema)
});
