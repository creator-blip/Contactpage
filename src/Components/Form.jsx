import React, { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import Otp from './Otp'

export default function VisaForm() {
    const [showOtp, setShowOtp] = useState(false)
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

    // Date helpers
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Final Form Submission:', formData)
        setShowOtp(true)
    }

    if (showOtp) {
        return <Otp phone={formData.phone} formData={formData} onBack={() => setShowOtp(false)} />
    }

    return (
        <div className="bg-transparent p-1 sm:p-10 lg:p-12 xl:p-14 2xl:p-0 rounded-2xl max-w-4xl mx-auto my-5  animate-fadeIn">
            <h3 className="text-2xl font-manrope font-semibold text-gray-800 mb-6 text-left">
                Book 1:1 Free Counselling Session
            </h3>

            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">First Name*</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter Your First Name" required className="w-full px-4 py-3 bg-transparent rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">Last Name*</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Your Last Name" required className="w-full px-4 py-3 bg-transparent rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">Email*</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" required className="w-full px-4 py-3 bg-transparent rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">WhatsApp Number*</label>
                        <div className="flex w-full px-4 py-1.5 bg-transparent rounded-lg border border-gray-400 focus-within:border-indigo-500 transition-colors">
                            <PhoneInput
                                defaultCountry="in"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                required
                                className="phone-input-custom w-full"
                                inputClassName="!border-none !w-full !text-base !bg-transparent focus:!ring-0"
                                countrySelectorStyleProps={{
                                    buttonClassName: "!border-none !bg-transparent",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* DATE OF BIRTH SECTION */}
                <div className="mb-5">
                    <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">Date of Birth*</label>
                    <div className="grid grid-cols-3 gap-4">
                        <select name="birthDay" value={formData.birthDay} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent font-manrope cursor-pointer focus:border-indigo-500 outline-none">
                            <option value="">Day</option>
                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent font-manrope cursor-pointer focus:border-indigo-500 outline-none">
                            <option value="">Month</option>
                            {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                        </select>
                        <select name="birthYear" value={formData.birthYear} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent cursor-pointer font-manrope focus:border-indigo-500 outline-none">
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>

                {/* Location Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                        <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">Current Country*</label>
                        <select name="country" value={formData.country} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-400 bg-transparent cursor-pointer">
                            <option value="">Select Country</option>
                            {countries.map((c) => (<option key={c.isoCode} value={c.isoCode}>{c.name}</option>))}
                        </select>
                    </div>
                    {states.length > 0 && (
                        <div className="animate-fadeIn">
                            <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">State*</label>
                            <select name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border font-manrope border-gray-400 bg-transparent">
                                <option value="">Select State</option>
                                {states.map((s) => (<option key={s.isoCode} value={s.isoCode}>{s.name}</option>))}
                            </select>
                        </div>
                    )}
                    {cities.length > 0 && (
<div className="animate-fadeIn"> <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">City*</label> <select name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border font-manrope border-gray-400 bg-transparent"> <option value="">Select City</option> {cities.map((ct) => (<option key={ct.name} value={ct.name}>{ct.name}</option>))} </select> </div> )}
                </div>

                {/* Visa Selection */}
                <div className="mb-5">
                    <label className="block mb-2 text-gray-700 font-manrope font-medium text-sm">What type of visa service are you seeking?*</label>
                    <select name="visaType" value={formData.visaType} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border font-manrope border-gray-400 bg-transparent cursor-pointer">
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
                            <label className="block mb-2 font-manrope text-gray-700 font-medium text-sm">Which country are you inquiring about?*</label>
                            <select name="targetCountry" value={formData.targetCountry} onChange={handleChange} required className="w-full px-4 py-3 font-manrope rounded-lg border border-gray-400 bg-transparent cursor-pointer">
                                <option value="">Select Target Country</option>
                                <option value="usa">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="canada">Canada</option>
                                <option value="australia">Australia</option>
                                <option value="germany">Germany</option>
                                <option value="newzealand">New Zealand</option>
                            </select>
                        </div>
                    )}

                    {formData.visaType === 'student' && (
                        <div className="animate-fadeIn">
                            <label className="block mb-2 text-gray-700 font-medium font-manrope text-sm">Which course are you interested in?*</label>
                            <select name="targetCourse" value={formData.targetCourse} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border font-manrope border-gray-400 bg-transparent cursor-pointer">
                                <option value="">Select Degree Type</option>
                                <option value="bachelor">Bachelor's</option>
                                <option value="master">Master's</option>
                            </select>
                        </div>
                    )}
                </div>

                <button type="submit" className="w-full py-4 opacity-80 bg-gradient-to-tl from-[#1D318A] to-[#428699] hover:from-[#4e5da1] hover:to-[#72a5b3] text-white font-semibold rounded-lg text-base transition-all duration-200 font-manrope transform hover:-translate-y-0.5 hover:shadow-lg">
                    Continue
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