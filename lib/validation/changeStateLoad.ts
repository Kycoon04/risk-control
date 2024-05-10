import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationStateLoad = Yup.object({
    name: Yup.string().required("Por favor, completa este campo"),
});
export const changeStateLoad = () => useForm({
    resolver: yupResolver(validationStateLoad)
});