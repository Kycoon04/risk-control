"use client";
import UsersMaintenance from '@/app/components/maintenance/maintenance_forms/users/users_maintenanceForm';
import { ToastContainer } from 'react-toastify';
import {User} from '@/types';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <UsersMaintenance />
      <ToastContainer />
    </main>
  );
}