"use client";
import UsersMaintenance from '@/app/components/maintenance/maintenance_pages/users_mainte';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <UsersMaintenance />
      <ToastContainer />
    </main>
  );
}