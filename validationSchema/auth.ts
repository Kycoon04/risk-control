import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    email:Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6,"Please minimum 6 characters")
})

export const loginValidation = () => useForm({
    resolver:yupResolver(loginSchema)
});


const registerSchema = Yup.object({
    email:Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6,"Please minimum 6 characters"),
    cnfPassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')],"Enter password not matched"),
    name: Yup.string().required("Please fill this field"),
    Lastname: Yup.string().required("Please fill this field"),
    Username: Yup.string().required("Please fill this field").min(8,"Please minimum 8 characters"),
    phone: Yup.string().required("Please fill this field").min(8,"Please minimum 8 characters"),
});

export const registerValidation = () => useForm({
    resolver:yupResolver(registerSchema)
});

const ChangeSchema = Yup.object({
    name: Yup.string().required("Please fill this field"),
    Lastname: Yup.string().required("Please fill this field"),
    Username: Yup.string().required("Please fill this field").min(8,"Please minimum 8 characters"),
    phone: Yup.string().required("Please fill this field").min(8,"Please minimum 8 characters"),
});

export const ChangeValidation = () => useForm({
    resolver:yupResolver(ChangeSchema)
});