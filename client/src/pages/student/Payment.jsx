import React, { useContext, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import Navbar from '../../components/student/Navbar.jsx'
import Footer from '../../components/student/Footer.jsx'
import Rating from '../../components/student/Rating.jsx'
import { formatCourseDuration } from '../../utils/formatDuration.js'
import { getThumbnailThemeClass, isGradientThumbnail } from '../../utils/courseThumbnail.js'
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, ShieldCheck } from 'lucide-react'
import { toast } from 'react-toastify'

const TEST_CARD_NUMBER = '4242424242424242'

const Payment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { courses, enrollInCourse, isEnrolled, currentStudent } = useContext(AppContext)
  const [form, setForm] = useState({
    cardName: currentStudent.name === 'Guest' ? '' : currentStudent.name,
    cardNumber: '',
    expiry: '',
    cvc: ''
  })
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const course = courses.find((item) => item._id === id)
  const discountedPrice = useMemo(() => {
    if (!course) return '0.00'
    return (course.coursePrice * (1 - course.discount / 100)).toFixed(2)
  }, [course])

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-sm text-gray-500 mb-6">This checkout link does not match an available course.</p>
          <Link to="/course-list" className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">
            Browse Courses
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  if (isEnrolled(course._id)) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Already Enrolled</h1>
          <p className="text-sm text-gray-500 mb-6">You already have access to this course.</p>
          <button onClick={() => navigate(`/player/${course._id}`)} className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 cursor-pointer">
            Open Course Player
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const normalizedCard = form.cardNumber.replace(/\s/g, '')
    const hasValidExpiry = /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)
    const hasValidCvc = /^\d{3,4}$/.test(form.cvc)

    if (normalizedCard !== TEST_CARD_NUMBER) {
      const message = 'Use the sandbox card number 4242 4242 4242 4242 for this demo checkout.'
      setError(message)
      toast.error(message)
      return
    }

    if (!form.cardName.trim() || !hasValidExpiry || !hasValidCvc) {
      const message = 'Enter a name, expiry in MM/YY format, and a 3 or 4 digit CVC.'
      setError(message)
      toast.error(message)
      return
    }

    setProcessing(true)
    try {
      const result = await enrollInCourse(course._id)
      if (result.success) {
        toast.success('Payment successful. Course enrolled!')
        navigate(`/player/${course._id}`, { replace: true })
      } else {
        const msg = result.message || 'Enrollment failed. Please try again.'
        setError(msg)
        toast.error(msg)
        setProcessing(false)
      }
    } catch (err) {
      const msg = 'Something went wrong. Please try again.'
      setError(msg)
      toast.error(msg)
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(`/course/${course._id}`)} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Back to course
        </button>

        <div className="grid lg:grid-cols-[1fr_25rem] gap-8 items-start">
          <section className="border border-gray-100 rounded-3xl bg-white shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Secure Checkout</h1>
                <p className="text-sm text-gray-500">Sandbox payment only. No real charge is made.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 mb-6 text-sm text-blue-800">
              <p className="font-extrabold mb-1">Test card</p>
              <p>Card number: <span className="font-mono font-bold">4242 4242 4242 4242</span></p>
              <p>Expiry: any valid future-style date, for example <span className="font-mono font-bold">12/30</span>. CVC: any 3 digits.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Name on card</label>
                <input
                  value={form.cardName}
                  onChange={(event) => handleChange('cardName', event.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-blue-600"
                  placeholder="Alex Morgan"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Card number</label>
                <input
                  inputMode="numeric"
                  value={form.cardNumber}
                  onChange={(event) => handleChange('cardNumber', event.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-blue-600"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Expiry</label>
                  <input
                    value={form.expiry}
                    onChange={(event) => handleChange('expiry', event.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-blue-600"
                    placeholder="12/30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">CVC</label>
                  <input
                    inputMode="numeric"
                    value={form.cvc}
                    onChange={(event) => handleChange('cvc', event.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-blue-600"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-extrabold text-sm rounded-2xl hover:bg-blue-700 disabled:opacity-70 cursor-pointer"
              >
                <LockKeyhole className="w-4 h-4" />
                {processing ? 'Processing payment...' : `Pay $${discountedPrice} and enroll`}
              </button>
            </form>
          </section>

          <aside className="border border-gray-100 rounded-3xl bg-white shadow-xl overflow-hidden">
            <div className={`h-56 course-thumbnail-frame flex items-center justify-center ${
              isGradientThumbnail(course.courseThumbnail) ? getThumbnailThemeClass(course.courseThumbnail) : ''
            }`}>
              {!isGradientThumbnail(course.courseThumbnail) && course.courseThumbnail && (
                <img src={course.courseThumbnail} alt={course.courseTitle} className="course-thumbnail-image" />
              )}
            </div>
            <div className="p-6 space-y-5">
              <span className="inline-block text-[10px] uppercase font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                {course.category}
              </span>
              <div>
                <h2 className="font-extrabold text-gray-900 text-lg leading-snug">{course.courseTitle}</h2>
                <p className="text-xs text-gray-500 mt-1">By {course.instructor}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-amber-500">{course.rating}</span>
                <Rating rating={course.rating} />
                <span className="text-xs text-gray-400">({course.numRatings || 0})</span>
              </div>
              <div className="border-t border-gray-100 pt-5 space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-bold text-gray-800">{formatCourseDuration(course.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lectures</span>
                  <span className="font-bold text-gray-800">{course.lecturesCount}</span>
                </div>
                <div className="flex justify-between text-base pt-3">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-black text-gray-900">${discountedPrice}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-100 p-3 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                Test mode checkout grants instant course access.
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Payment
