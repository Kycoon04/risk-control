"use client";
import Admin_global from '../../components/admin_homepage'
import About_forms from '../../components/about_forms'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <Admin_global/>
      <About_forms/>
    </main>
  );
}