"use client";
import Admin_global from '../../components/forms/admin_homepage'
import User_global from '../../components/forms/about_forms'
import Forms_page from '../../components/forms/forms_page'
import Section from '../../components/maintenance/maintenance_page'
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <Section/>
    </main>
  );
}