'use client'
import UserNavBar from '../components/utils_comp/UserNavBar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-gradient-radial rounded-lg from-purple-500 via-purple-700 to-purple-1000'>
      <UserNavBar/>
      {children}
    </div>
  );
}
