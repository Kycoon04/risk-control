import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchemaLoad = Yup.object({
    name: Yup.string().required("Por favor, completa este campo"),
    description: Yup.string().required("Por favor, completa este campo"),
});

export const makeValidationLoad = () => useForm({
    resolver: yupResolver(validationSchemaLoad)
});
