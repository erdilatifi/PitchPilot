'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/comp/Spinner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/providers/ContextAPI';
import { toast } from "sonner";

const PaymentsPage = () => {
  const { session, isSubscribed } = useAuth();
  const email = session?.user?.email;
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Please log in to subscribe.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/create-payment-stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect user to Stripe Checkout page
        window.location.href = data.url;
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription failed. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#232526] to-[#414345]">
      <div className="max-w-md w-full bg-[#18181b] text-white p-8 rounded-3xl shadow-2xl border border-[#232526] flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">{isSubscribed ? 'You are already subscribed!' : 'Subscribe '}</h2>
        <p className="text-gray-300 mb-8 text-center text-lg">
          {isSubscribed
            ? 'Thank you for supporting us! '
            : 'Unlock advanced features,  by subscribing to our plan.'}
        </p>
        {isSubscribed ? (
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition mb-2"
            onClick={() => router.push('/dashboard')}
          >
            Go to Dashboard
          </Button>
        ) : (
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition mb-2"
          >
            {loading && <Spinner />}
            <span>{loading ? 'Redirecting...' : 'Subscribe'}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
