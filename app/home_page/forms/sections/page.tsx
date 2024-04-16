"use client";
import Section from '@/app/components/sections/section'
import { useAuthStore } from '@/provider/store';
export default function Home() {
  const section = useAuthStore((state) => state.section);
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <Section titule={section?.name} />
    </main>
  );
}