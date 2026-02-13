import React from 'react';
import { CheckCircle, Home, Phone } from 'lucide-react';

const Thankyou = ({ formData, onBackHome }) => {
    return (
        <div className="bg-transparent sm:px-6 md:px-8 lg:p-10 py-13 rounded-2xl max-w-5xl mx-auto my-5 animate-fadeIn">
            <div className="max-w-xl mx-auto text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6 animate-bounce-slow">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <CheckCircle className="w-20 h-20 text-green-500 relative z-10" strokeWidth={2} />
                    </div>
                </div>

                {/* Header Section */}
                <div className="space-y-4 ">
                    <h1 className="text-4xl font-bold font-manrope text-gray-800">
                        Thank You!
                    </h1>
                    <p className="text-xl font-semibold text-slate-600">
                        Your inquiry has been successfully submitted
                    </p>
                </div>

                {/* Message Section */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-3 border border-blue-100">
                    <p className="text-slate-700 text-left font-manrope leading-relaxed">
                        We appreciate your interest in our visa consultation services.
                        Our expert team will review your details and get back to you.Meanwhile, explore our website for more information about our services and resources tailored for you.
                    </p>

                    <a href="https://amratpal.com" className='leading-relaxed text-left text-blue-600'>Visit Our Website</a>
                </div>



                {/* What's Next Section */}
                <div className="bg-white rounded-2xl p-6 mb-8 border border-slate-200 shadow-sm">
                    <div className="space-y-4">
                         <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" bg-green-700 bg-transparent text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600"
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            <span className='font-semibold text-lg'>Chat on WhatsApp</span>
                        </a>
                        <a
                            href="https://www.youtube.com/@AmratpalaVision"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-100"
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span>Subscribe</span>
                        </a>

                        <a
                            href="https://instagram.com/amratpalavision_official"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-violet-700 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-100"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            <span>Follow us!</span>
                        </a>

                       
                    </div>
                </div>


            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default Thankyou;
