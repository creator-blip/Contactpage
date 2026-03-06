import React, { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import Otp from './Otp'

export default function VisaForm() {
    const [showOtp, setShowOtp] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [sentOtp, setSentOtp] = useState('')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        country: '',
        state: '',
        city: '',
        visaType: '',
        targetCountry: '',
        targetCourse: ''
    })

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

    const countryMap = {
        germany: '1',
        uk: '2',
        canada: '3',
        usa: '4',
        australia: '5',
        newzealand: '6'
    }

    useEffect(() => {
        setCountries(Country.getAllCountries())
    }, [])

    useEffect(() => {
        if (formData.country) {
            setStates(State.getStatesOfCountry(formData.country))
            setCities([])
            setFormData(prev => ({ ...prev, state: '', city: '' }))
        }
    }, [formData.country])

    useEffect(() => {
        if (formData.country && formData.state) {
            setCities(City.getCitiesOfState(formData.country, formData.state))
            setFormData(prev => ({ ...prev, city: '' }))
        }
    }, [formData.country, formData.state])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePhoneChange = (phone) => {
        setFormData(prev => ({ ...prev, phone }))
    }

    const getUtmMedium = () => {
        const params = new URLSearchParams(window.location.search)
        return params.get('utm_medium') || 'website'
    }

    const getPhoneParts = (fullPhone) => {
        const cleaned = fullPhone.replace(/\s+/g, '')
        const match = cleaned.match(/^(\+\d{1,4})(\d+)$/)

        if (match) {
            return {
                mobile_no_code: match[1],
                mobile_no: match[2]
            }
        }

        return {
            mobile_no_code: '+91',
            mobile_no: cleaned.replace(/\D/g, '')
        }
    }

    const sendOtpRequest = async () => {
        const { mobile_no_code, mobile_no } = getPhoneParts(formData.phone)

        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email_id: formData.email,
            mobile_no: mobile_no,
            mobile_no_code: mobile_no_code,
            purpose: formData.visaType || 'Study Abroad',
            country1: countryMap[formData.targetCountry] || '',
            coaching1: formData.visaType === 'coaching' ? 'IELTS' : '',
            utm_medium: getUtmMedium(),

            birth_day: formData.birthDay,
            birth_month: formData.birthMonth,
            birth_year: formData.birthYear,
            current_country: formData.country,
            state: formData.state,
            city: formData.city,
            visa_type: formData.visaType,
            target_country: formData.targetCountry,
            target_course: formData.targetCourse
        }

        const response = await fetch('https://crm.amratpal.com/landing-page/insert-lead-api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const result = await response.text()
        console.log('CRM Response:', result)

        if (!response.ok) {
            throw new Error('Failed to submit lead')
        }

        // Extract OTP from response (try parsing JSON first)
        let otpValue = ''
        try {
            const jsonResult = JSON.parse(result)
            otpValue = jsonResult.otp || jsonResult.OTP || jsonResult.code || ''
        } catch {
            // If response is not JSON, try to extract OTP from text
            const otpMatch = result.match(/\b\d{4}\b/)
            otpValue = otpMatch ? otpMatch[0] : ''
        }

        // If no OTP found in response, generate a random 4-digit OTP
        if (!otpValue) {
            otpValue = Math.floor(1000 + Math.random() * 9000).toString()
            console.log('Generated OTP:', otpValue)
        }

        return otpValue
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const otpValue = await sendOtpRequest()
            setSentOtp(otpValue)
            setShowOtp(true)
        } catch (error) {
            console.error('Submission Error:', error)
            alert('Something went wrong while submitting the form.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResendOtp = async () => {
        try {
            const otpValue = await sendOtpRequest()
            setSentOtp(otpValue)
            return true
        } catch (error) {
            console.error('Resend OTP Error:', error)
            return false
        }
    }

    if (showOtp) {
        return <Otp phone={formData.phone} formData={formData} sentOtp={sentOtp} onBack={() => setShowOtp(false)} onResend={handleResendOtp} />
    }

    return (
        <div className="bg-transparent p-1 sm:p-10 lg:p-12 xl:p-2 2xl:p-0 rounded-2xl max-w-4xl mx-auto my-5 animate-fadeIn">
            <h3 className="text-2xl font-manrope font-semibold text-gray-800 mb-6 text-left">
                Book 1:1 Free Counselling Session
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">
                            First Name*
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter Your First Name"
                            required
                            className="w-full px-4 py-3 bg-transparent rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">
                            Last Name*
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter Your Last Name"
                            required
                            className="w-full px-4 py-3 bg-transparent rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">
                            Email*
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            required
                            className="w-full px-4 py-3 bg-transparent rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">
                            WhatsApp Number*
                        </label>
                        <div className="flex w-full px-4 py-1.5 bg-transparent rounded-lg border border-gray-400 focus-within:border-indigo-500 transition-colors">
                            <PhoneInput
                                defaultCountry="in"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                required
                                className="phone-input-custom w-full"
                                inputClassName="!border-none !w-full !text-base !bg-transparent focus:!ring-0"
                                countrySelectorStyleProps={{
                                    buttonClassName: '!border-none !bg-transparent'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">
                        Date of Birth*
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        <select
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent font-manrope cursor-pointer focus:border-indigo-500 outline-none"
                        >
                            <option value="">Day</option>
                            {days.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        <select
                            name="birthMonth"
                            value={formData.birthMonth}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent font-manrope cursor-pointer focus:border-indigo-500 outline-none"
                        >
                            <option value="">Month</option>
                            {months.map((m, i) => (
                                <option key={m} value={i + 1}>{m}</option>
                            ))}
                        </select>

                        <select
                            name="birthYear"
                            value={formData.birthYear}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent cursor-pointer font-manrope focus:border-indigo-500 outline-none"
                        >
                            <option value="">Year</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                        <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">
                            Current Country*
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent cursor-pointer"
                        >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                                <option key={c.isoCode} value={c.isoCode}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {states.length > 0 && (
                        <div className="animate-fadeIn">
                            <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">
                                State*
                            </label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border font-manrope border-gray-400 bg-transparent"
                            >
                                <option value="">Select State</option>
                                {states.map((s) => (
                                    <option key={s.isoCode} value={s.isoCode}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {cities.length > 0 && (
                        <div className="animate-fadeIn">
                            <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">
                                City*
                            </label>
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border font-manrope border-gray-400 bg-transparent"
                            >
                                <option value="">Select City</option>
                                {cities.map((ct) => (
                                    <option key={ct.name} value={ct.name}>
                                        {ct.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">
                        What type of visa service are you seeking?*
                    </label>
                    <select
                        name="visaType"
                        value={formData.visaType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border font-manrope border-gray-400 bg-transparent cursor-pointer"
                    >
                        <option value="">Select an Option</option>
                        <option value="student">Student Visa</option>
                        <option value="visitor">Visitor Visa</option>
                        <option value="coaching">Coaching</option>
                        <option value="dependent">Dependent Visa</option>
                        <option value="work">Work Visa</option>
                        <option value="studyPermit">Study Permit / Only Visa</option>
                    </select>
                </div>

                <div className="space-y-5">
                    {['student', 'visitor', 'dependent', 'work', 'studyPermit'].includes(formData.visaType) && (
                        <div className="animate-fadeIn">
                            <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">
                                Which country are you inquiring about?*
                            </label>
                            <select
                                name="targetCountry"
                                value={formData.targetCountry}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 mb-7 font-manrope rounded-lg border border-gray-400 bg-transparent cursor-pointer"
                            >
                                <option value="">Select Target Country</option>
                                <option value="germany">Germany</option>
                                <option value="uk">United Kingdom</option>
                                <option value="canada">Canada</option>
                                <option value="usa">United States</option>
                                <option value="australia">Australia</option>
                                <option value="newzealand">New Zealand</option>
                            </select>
                        </div>
                    )}

                    {formData.visaType === 'student' && (
                        <div className="animate-fadeIn">
                            <label className="block mb-2 text-gray-700 font-medium font-manrope text-sm">
                                Which course are you interested in?*
                            </label>
                            <select
                                name="targetCourse"
                                value={formData.targetCourse}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border mb-6 font-manrope border-gray-400 bg-transparent cursor-pointer"
                            >
                                <option value="">Select Degree Type</option>
                                <option value="bachelor">Bachelor's</option>
                                <option value="master">Master's</option>
                            </select>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-tl from-[#1D318A] to-[#428699] hover:from-[#4e5da1] hover:to-[#72a5b3] text-white opacity-80 font-semibold rounded-lg text-base transition-all duration-200 font-manrope transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Continue'}
                </button>
            </form>

            <style jsx>{`
                :global(.react-international-phone-input-container) {
                    border: none !important;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    )
}