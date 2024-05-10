import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const changeSchema = Yup.object({
    name: Yup.string().required("Por favor, completa este campo"),
    Lastname: Yup.string().required("Por favor, completa este campo"),
    Username: Yup.string().required("Por favor, completa este campo").min(8, "Por favor, mínimo 8 caracteres"),
    phone: Yup.string().required("Por favor, completa este campo").min(8, "Por favor, mínimo 8 caracteres"),
});

export const changeValidation = () => useForm({
    resolver: yupResolver(changeSchema)
});
