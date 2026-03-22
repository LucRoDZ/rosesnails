'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function SignInPage() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        // Already signed in, redirect to dashboard
        router.push('/mes-rendez-vous');
      } else {
        // Not signed in, redirect to home
        router.push('/');
      }
    }
  }, [isLoaded, userId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirection en cours...</p>
    </div>
  );
}
