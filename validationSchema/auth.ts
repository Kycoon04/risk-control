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


const registerSchema = Yup.object({
    nickname: Yup.string().required("Por favor, completa este campo"),
    name: Yup.string().required("Por favor, completa este campo"),
    second_name: Yup.string().required("Por favor, completa este campo"),
    surname: Yup.string().required("Por favor, completa este campo"),
    second_surname: Yup.string().required("Por favor, completa este campo"),
    email: Yup.string().email("Por favor, introduce un correo electrónico válido").required("Por favor, completa este campo"),
    phone_number: Yup.string().required("Por favor, completa este campo").min(8, "Por favor, mínimo 8 caracteres"),
    identification: Yup.string().required("Por favor, completa este campo").min(4, "Por favor, mínimo 4 caracteres"),
});

export const registerValidation = () => useForm({
    resolver: yupResolver(registerSchema)
});

const ChangeSchema = Yup.object({
    name: Yup.string().required("Por favor, completa este campo"),
    Lastname: Yup.string().required("Por favor, completa este campo"),
    Username: Yup.string().required("Por favor, completa este campo").min(8, "Por favor, mínimo 8 caracteres"),
    phone: Yup.string().required("Por favor, completa este campo").min(8, "Por favor, mínimo 8 caracteres"),
});

export const ChangeValidation = () => useForm({
    resolver: yupResolver(ChangeSchema)
});
