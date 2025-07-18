'use server';

import { createClient } from "@/utils/supabase/server";

export const signin = async (formData:FormData) => {
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();

    const {data, error} = await supabase.auth.signInWithPassword({email,password});
    if(error) throw new Error(error.message);
    return {success:true, data};
}


export const signup = async (formData:FormData) => {

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    const supabase = await createClient();

    const {data, error} = await supabase.auth.signUp({email,password, options:{data:{username}}});

    if(error) throw new Error(error.message);
    return {success:true, data};
}

export const signout = async () => {
     const supabase = await createClient();

    const {error} = await supabase.auth.signOut();

    if(error) throw new Error(error.message);
    return {success:true};
}

export const signInWithGoogle = async () => {
}

export const resetPassword = async () => {

}