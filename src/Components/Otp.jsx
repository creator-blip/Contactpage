import React, { useState } from 'react';
import Thankyou from './Thankyou';

const Otp = ({ phone, formData, onBack }) => {
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
    // Add your verification logic here
    // For now, we'll just show the thank you page
    setIsVerified(true);
  };

  const handleBackHome = () => {
    setIsVerified(false);
    if (onBack) {
      onBack();
    }
  };

  if (isVerified) {
    return <Thankyou formData={formData} onBackHome={handleBackHome} />;
  }

  return (
    <div className="bg-transparent p-10 rounded-2xl max-w-5xl mx-auto my-5  animate-fadeIn">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-manrope font-semibold text-gray-800 text-left">
            Enter the OTP Received on WhatsApp
          </h2>
          {phone && (
            <p className="text-slate-600 text-sm">
              Sent to: <span className="font-semibold text-cyan-700">{phone}</span>
            </p>
          )}
          <p className="text-slate-500 text-sm leading-relaxed">
            Please enter the OTP (One-Time Password) sent to your registered WhatsApp number to complete your verification.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              id="otp"
              maxLength="4"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 4-digit OTP"
              className="w-full px-4 py-4 bg-transparent border border-gray-400 rounded-lg outline-none transition-all focus:border-cyan-600 focus:bg-white text-slate-700 font-medium text-center text-lg tracking-widest"
              required
            />
          </div>

          <div className="flex items-center gap-1 text-sm font-medium">
            <span className="text-slate-600">Didn't get the code?</span>
            <button 
              type="button" 
              className="text-cyan-700 hover:text-cyan-600 transition-colors font-semibold"
            >
              Resend OTP
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 opacity-80 bg-gradient-to-tl from-[#1D318A] to-[#428699] text-white font-semibold rounded-lg text-base transition-all duration-200 font-manrope transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Verify OTP
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              ← Back to Form
            </button>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Otp;