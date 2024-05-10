import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationStateSchema = Yup.object({
    id: Yup.string().required("Por favor, completa este campo"),
    name: Yup.string().required("Por favor, completa este campo"),
});

export const changeStateValidation = () => useForm({
    resolver: yupResolver(validationStateSchema)
});
