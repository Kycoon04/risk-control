import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    email: Yup.string().email("Por favor, introduce un correo electrónico válido").required("Por favor, completa este campo"),
    password: Yup.string().required("Por favor, completa este campo").min(6, "Por favor, mínimo 6 caracteres")
})

export const loginValidation = () => useForm({
    resolver: yupResolver(loginSchema)
});
