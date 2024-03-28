"use client";
import Login from './components/login';
export default function Home()  {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000">
      <Login/>
    </main>
  );
}