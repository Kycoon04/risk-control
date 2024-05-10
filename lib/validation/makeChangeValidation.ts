import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    id: Yup.string().required("Por favor, completa este campo"),
    name: Yup.string().required("Por favor, completa este campo"),
    description: Yup.string().required("Por favor, completa este campo"),
});

export const makeChangeValidation = () => useForm({
    resolver: yupResolver(validationSchema)
});
