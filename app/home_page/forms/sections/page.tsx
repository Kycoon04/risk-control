"use client";
import { useRouter } from 'next/navigation';
import Section from '@/app/components/section'
export default function Home() {
  const router = useRouter();
  const submitForm = (values: any) => {
    console.log("form values", values)
    router.push("/")
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <Section titule='Ambiente' />
    </main>
  );
}