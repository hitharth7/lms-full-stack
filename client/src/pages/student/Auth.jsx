import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import { assets } from '../../assets/assets.js'
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { toast } from 'react-toastify'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { login, signup, isAuthenticated, authUser, logout } = useContext(AppContext)
  const initialMode = location.pathname === '/signup' ? 'signup' : 'login'
  const [mode, setMode] = useState(initialMode)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: searchParams.get('role') === 'educator' ? 'educator' : 'student'
  })

  useEffect(() => {
    const nextMode = location.pathname === '/signup' ? 'signup' : 'login'
    setMode(nextMode)
  }, [location.pathname])

  useEffect(() => {
    if (searchParams.get('role') === 'educator') {
      setForm((prev) => ({ ...prev, role: 'educator' }))
    }
  }, [searchParams])

  const redirectTarget = useMemo(() => {
    const redirect = searchParams.get('redirect')
    return redirect || '/'
  }, [searchParams])

  useEffect(() => {
    if (isAuthenticated && authUser) {
      navigate(redirectTarget, { replace: true })
    }
  }, [authUser, isAuthenticated, navigate, redirectTarget])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const result = mode === 'login'
      ? login({ email: form.email, password: form.password })
      : signup({ name: form.name, email: form.email, password: form.password, role: form.role })

    setLoading(false)

    if (!result.success) {
      const message = result.message || 'Authentication failed.'
      setError(message)
      toast.error(message)
      return
    }

    toast.success(mode === 'login' ? 'Logged in successfully.' : 'Account created successfully.')
    navigate(redirectTarget, { replace: true })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors">
          <img src={assets.logo} alt="Edemy" className="edemy-navbar-logo object-contain rounded-xl" />
          <span className="font-extrabold text-xl tracking-tight">Edemy</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-xs font-semibold text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
              Secure access for students and educators
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04]">
                {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
              </h1>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl">
                Sign in to continue learning, purchase courses, or publish new courses as an educator.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-600">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-3" />
                <p className="font-semibold">Persistent local session</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-sky-500 mb-3" />
                <p className="font-semibold">Student and educator roles</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-500 mb-3" />
                <p className="font-semibold">Checkout test mode</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl max-w-2xl bg-blue-50">
              <img src={assets.course_1_thumbnail} alt="Learning preview" className="h-64 w-full object-contain" />
            </div>
          </div>

          <div className="lg:justify-self-end w-full max-w-xl">
            <div className="rounded-[2rem] border border-gray-100 bg-white shadow-2xl shadow-blue-50 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-colors cursor-pointer ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-colors cursor-pointer ${mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Full name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 outline-none focus:border-blue-600"
                      required={mode === 'signup'}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="alex.morgan@academy.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    placeholder={mode === 'login' ? 'demo123' : 'Create a password'}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Account type</label>
                    <select
                      value={form.role}
                      onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-blue-600"
                    >
                      <option value="student">Student</option>
                      <option value="educator">Educator</option>
                    </select>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-blue-700 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">
                <p className="font-semibold text-gray-900 mb-1">Demo account</p>
                <p>Email: alex.morgan@academy.com</p>
                <p>Password: demo123</p>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                {mode === 'login' ? (
                  <p>
                    Need an account?{' '}
                    <button onClick={() => setMode('signup')} className="font-semibold text-blue-600 hover:underline cursor-pointer">
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button onClick={() => setMode('login')} className="font-semibold text-blue-600 hover:underline cursor-pointer">
                      Log in
                    </button>
                  </p>
                )}
              </div>

              {authUser && (
                <button
                  onClick={() => {
                    logout()
                    navigate('/', { replace: true })
                  }}
                  className="mt-5 text-sm font-semibold text-gray-500 hover:text-blue-600 cursor-pointer"
                >
                  Sign out current session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
