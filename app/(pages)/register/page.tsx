'use client'
import { signup } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner";

const RegisterPage = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();


    try{  
      
      const formData = new FormData();
      formData.append('username',name);
      formData.append('email',email);
      formData.append('password',password);

      await signup(formData);
      toast.success("Registration successful! Check your email to verify.");

    }catch(error){
      toast.error("Registration failed. Please try again.");
      console.error(error);
    }finally{
      setName('');
      setEmail('');
      setPassword('');
    }

  }



  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Sign Up your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="text">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="example"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

              </div>
              <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required />
            </div>
            <div className="grid gap-2">
                     <Button type="submit" className="w-full" >
          Sign Up
        </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">

        <p className="text-sm flex gap-2 mt-2">Already have an account? <a href={'/login'} className="underline">Sign In</a></p>
      </CardFooter>
    </Card>
  )
}
export default RegisterPage