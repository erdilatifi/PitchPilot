"use client";

import { Session } from '@supabase/supabase-js';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { createClient } from '../supabase/client';

// --------- Types ---------
interface AuthContextType {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  isSubscribed: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// --------- Context Setup ---------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --------- Provider Component ---------
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const supabase = createClient();

  // Helper to check subscription status for current user
  const checkSubscription = async (userId: string) => {
    // Example: check subscription in 'subscriptions' table
    // Modify this to fit your DB schema
    const { data, error } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .eq('status', 'active')  // or whatever your active status string is

    if (error) {
      console.error('Subscription fetch error:', error.message);
      setIsSubscribed(false);
      return;
    }

    setIsSubscribed(!!data); // true if subscription exists and active
  };

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        return;
      }
      setSession(data.session);

      if (data.session?.user.id) {
        await checkSubscription(data.session.user.id);
      } else {
        setIsSubscribed(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user.id) {
        await checkSubscription(session.user.id);
      } else {
        setIsSubscribed(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession, isSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};

// --------- Hook for Easy Usage ---------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
