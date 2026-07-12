import { useState } from "react"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../utils/firebase"
import api from "../../utils/axios"
import { FcGoogle } from "react-icons/fc"

function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handelLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", { token })
      // Handle your post-login redirect or state update here (e.g., navigate("/chat"))
    } catch (error) {
      console.error(error)
      setError("Failed to sync account with our servers. Please try again.")
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      await handelLogin(token)
    } catch (error) {
      console.error(error)
      setError("Google authentication failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950 font-sans text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Left Panel: Brand / Visual - Hidden on smaller screens */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-emerald-950/40 lg:flex border-r border-slate-800/50">
        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[128px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[128px]" />
        
        <div className="max-w-md px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-300 backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            Next-Gen Intelligence
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Chat AI
          </h1>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Experience lightning-fast contextual responses, advanced code generation, and intuitive deep-learning chat capabilities.
          </p>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        {/* Top ambient glow for mobile layout */}
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-indigo-500/5 blur-[96px] lg:hidden" />
        
        <div className="mx-auto w-full max-w-sm z-10">
          {/* Mobile Logo Header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Chat AI
            </h1>
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Please sign in to access your chat workspace.
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400 animate-fade-in">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={googleLogin}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-900 hover:border-slate-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FcGoogle className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" />
            )}
            <span>{loading ? "Connecting..." : "Continue with Google"}</span>
          </button>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-500 lg:text-left">
            By continuing, you agree to Chat AI's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Home