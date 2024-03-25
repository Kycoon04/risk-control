"use client";
import { useRouter } from 'next/navigation';
import Admin_global from '../components/admin_homepage'
import User_global from '../components/about_forms'
import Forms_page from '../components/forms_page'
import Section from '../components/section'
import { useAuthStore } from '@/provider/store';
export default function Home() {
  const log = useAuthStore(state => state.logged)
  console.log(log)
  const router = useRouter();
  const submitForm = (values: any) => {
    console.log("form values", values)
    router.push("/")
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <Forms_page/>
    </main>
  );
}