"use client";
import MaintenanceSelection from '@/app/components/maintenance/maintenance_selection/UserXRoles/maintenance_selection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <MaintenanceSelection />
      <ToastContainer />
    </main>
  );
}