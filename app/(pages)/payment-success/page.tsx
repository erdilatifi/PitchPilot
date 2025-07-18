'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/utils/providers/ContextAPI';

const PaymentSuccess = () => {
  const params = useSearchParams();
  const [amount, setAmount] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);
  const {session} = useAuth();
  const router = useRouter();


  useEffect(() => {
    const amt = params.get('amount');
    if (amt) setAmount(amt);
    // Call API to activate subscription
    const activate = async () => {
      try {
        const res = await fetch('/api/activate-subscription', { method: 'POST' });
        if (!res.ok) throw new Error('Failed to activate subscription');
        setActivated(true);
      } catch (err) {
        console.error('Could not activate subscription. Please contact support.');
      }
    };
    activate();
      if(!session){
    router.push('/login');
  }

  }, [params]);

  return (
    <div className="min-h-screen  text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-xl">Thank you for subscribing.</p>
      {amount && <p className="text-lg mt-2">Amount: €{amount}</p>}

      {activated && <p className="text-green-400 mt-4">Your subscription is now active!</p>}
      <Button className='mt-2 text-black' variant={'outline'}><a href={'/dashboard'}>Get Started</a></Button>
    </div>
  );
};

export default PaymentSuccess;