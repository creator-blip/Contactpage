import React, { useState, useEffect } from 'react';
import Thankyou from './Thankyou';

const Otp = ({ phone, formData, sentOtp, onBack, onResend, onVerify }) => {
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.trim().length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }

    setIsVerifying(true);

    try {
      if (onVerify) {
        const verificationResult = await onVerify(otp.trim());
        if (verificationResult?.success) {
          setIsVerified(true);
        } else {
          setError(verificationResult?.message || 'Invalid OTP. Please try again.');
        }
      } else if (otp.trim() === sentOtp.trim()) {
        setIsVerified(true);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch {
      setError('Unable to verify OTP right now. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendClick = async () => {
    if (resendCountdown > 0 || isResending) return;
    
    setIsResending(true);
    setError('');
    setResendSuccess(false);
    
    const success = await onResend();
    
    if (success) {
      setResendCountdown(30);
      setResendSuccess(true);
      setOtp('');
      setTimeout(() => setResendSuccess(false), 3000);
    } else {
      setError('Failed to resend OTP. Please try again.');
    }
    
    setIsResending(false);
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
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              placeholder="Enter 4-digit OTP"
              className={`w-full px-4 py-4 bg-transparent border rounded-lg outline-none transition-all focus:bg-white text-slate-700 font-medium text-center text-lg tracking-widest ${
                error ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-cyan-600'
              }`}
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>
            )}
          </div>

          {resendSuccess && (
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600 bg-green-50 py-2 px-4 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>OTP sent successfully!</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-sm font-medium">
            <span className="text-slate-600">Didn't get the code?</span>
            <button 
              type="button"
              onClick={handleResendClick}
              disabled={resendCountdown > 0 || isResending}
              className={`font-semibold transition-colors ${
                resendCountdown > 0 || isResending
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-cyan-700 hover:text-cyan-600'
              }`}
            >
              {isResending ? 'Sending...' : resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend OTP'}
            </button>
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-4 opacity-80 bg-gradient-to-tl from-[#1D318A] to-[#428699] text-white font-semibold rounded-lg text-base transition-all duration-200 font-manrope transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            {isVerifying ? 'Verifying...' : 'Verify OTP'}
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