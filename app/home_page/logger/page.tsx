"use client";
import Admin_global from '../../components/admin_homepage'
import User_global from '../../components/about_forms'
import Forms_page from '../../components/forms_page'
import Section from '../../components/logger_page'
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <Section/>
    </main>
  );
}