"use client";
import Standard_button from '../components/Button';
import { useRouter } from 'next/navigation';
export default function Home() {
    const router = useRouter();
    const submitForm = (values: any) => {
        console.log("form values", values)
        router.push("/")
    }
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      
      <Standard_button fuction={submitForm} titule={"Iniciar sesión"} width={"350px"}></Standard_button>
    </main>
  );
}