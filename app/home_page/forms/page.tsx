"use client";
import Admin_global from '../../components/forms/admin_homepage'
import About_forms from '../../components/forms/about_forms'
import { useAuthStore } from '@/provider/store';
export default function Home() {
  const rol = useAuthStore(state => state.rol);
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      {rol === "Administrador" ? <Admin_global /> : null}
      <About_forms/>
    </main>
  );
}