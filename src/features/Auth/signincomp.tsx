
import useSignIn from '../../hooks/useSignIn'
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom"
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useGoogleAuth from "../../hooks/useGoogleAuth";

const signincomp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { googleAuth, googleLoading } = useGoogleAuth();
  const { handleSignIn, loading } = useSignIn()

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

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = (e: React.FormEvent) => {
    if (!form.email || !form.password) {
      toast.error('Fill In The Inputs')
      return
    }
    e.preventDefault()
    handleSignIn(form.email, form.password)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Subtle background gradient */}
      <div className="absolute top-0 w-full h-[500px] bg-emerald-900/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="mb-10 text-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white mb-2 block hover:opacity-80 transition-opacity">
            AbdullThon
          </Link>
          <p className="text-slate-400">Welcome back, challenger.</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300 ml-1">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="hello@example.com"
              value={form.email}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 h-12 rounded-xl transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              {/* <Link to="/forgot-password" className="text-xs text-emerald-400 hover:text-emerald-300">
                                Forgot password?
                            </Link> */}
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 h-12 rounded-xl pr-10 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 font-medium transition-all duration-300 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)]"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-slate-500 text-xs uppercase tracking-widest">Or continue with</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <Button
          onClick={handleGoogleSignup}
          variant="outline"
          disabled={googleLoading}
          className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 rounded-xl transition-all"
        >
          <FcGoogle className='w-5 h-5 mr-2' />
          Google
        </Button>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default signincomp
