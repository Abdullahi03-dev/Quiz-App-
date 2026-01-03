// import React from 'react'
// import {motion} from 'framer-motion'
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import {  Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import {FcGoogle} from 'react-icons/fc'
import { Link } from "react-router-dom"
import { useState } from 'react'
import useSignup from '../../hooks/useSignup'
import useGoogleAuth from "../../hooks/useGoogleAuth";
import toast from 'react-hot-toast'

// const containerVariants={
//     hidden:{opacity:0,y:50},
//     visible:{opacity:1,y:0,transition:{
//         delay:.2,
//         duration:.9,ease:"easeInOut",
//     }
//     }
// }

// const inputsVariants={
//     hidden:{opacity:0,x:-90},
//     visible:{opacity:1,x:0,transition:{
//         delay:.2,
//         duration:.9,ease:"easeInOut",
//     }
//     }
// }
// const buttonVariants={
//     hidden:{scale:1.05,transition:{
//         duration:0.2
//     }},
// }
const signupcomp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {signup,loading}=useSignup()
    const { googleAuth, googleLoading } = useGoogleAuth();
    const [form,setForm]=useState({
      Username:"",
        email:"",
        password:"",
        cpassword:'',
    })


    const handleGoogleSignup = async () => {
      try {
        const response = await googleAuth();
   
        if (response) {
         if (response.type === "error") throw new Error(response.message);
   
         toast.success(response.message);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
     }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    
    
    const handleSignup=(e:React.FormEvent)=>{
        if(form.cpassword!==form.password){
            toast.error('Passwords Do Not Match')
            return
        }
        e.preventDefault()
        signup(form.Username,form.email,form.password)
    }
    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative w-full max-w-md">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-400 hover:text-white mb-8 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
    
            <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {/* <Brain className="w-8 h-8 text-white" /> */}
                </div>
                <CardTitle className="text-2xl font-bold text-white">Join AbdullThon</CardTitle>
                <CardDescription className="text-gray-400">
                  Create your account and start your quiz journey
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <Input
                        id="username"
                        name="Username"
                        type="text"
                        placeholder="Choose a username"
                        value={form.Username}
                        onChange={handleChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
    
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
    
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                        className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
    
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        name="cpassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={form.cpassword}
                        onChange={handleChange}
                        className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
    
                  <Button 
                  disabled={loading}
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 py-6"
                  >
                    {loading?'Processing..':'Sign Up'}
                  </Button>
                </form>
    
                <div className="relative">
                  <Separator className="bg-slate-700" />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-4 text-gray-400 text-sm">
                    or
                  </span>
                </div>
    
                <Button 
                onClick={handleGoogleSignup}
                disabled={googleLoading}
                  variant="outline" 
                  className="w-full border-slate-700 text-white bg-slate-800 hover:bg-slate-800 py-6"
                >
                
                  <FcGoogle className='w-4 h-4 mr-3'/>
                  {googleLoading?'Processing..':'Continue with Google'}
                </Button>
    
                <p className="text-center text-gray-400">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-emerald-400 hover:text-emerald-300 underline">
                    Sign in
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    };

export default signupcomp
