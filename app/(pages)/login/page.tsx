'use client'
import { signin } from "@/app/actions/auth"
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
import { useAuth } from "@/utils/providers/ContextAPI"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner";

const LoginPage = () => {
  
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const {setSession} = useAuth();

    const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault();
  
      try{  
        const formData = new FormData();
        formData.append('email',email);
        formData.append('password',password);
  
        const result = await signin(formData);
        if(result.success){
          setSession(result.data.session);
          toast.success("Login successful!");
          router.push('/dashboard');
        }

      }catch(error){
        toast.error("Login failed. Please check your credentials.");
        console.error(error);
      }
  
    }
  
  
  
  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
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
              placeholder="password..."
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required />
            </div>
            <div className="grid gap-2">
        <Button type="submit" className="w-full" >
          Login
        </Button>
       
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-sm flex gap-2 mt-2">Don't have an account? <a href={'/register'} className="underline">Sign Up</a></p>
      </CardFooter>
    </Card>
  )
}
export default LoginPage