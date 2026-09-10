import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth');
  }, [router]);

  return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading SkillQuest...</div>;
}
