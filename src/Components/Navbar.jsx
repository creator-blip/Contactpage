import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              {/* Logo Icon - Stylized 'A' */}
              <img src="./images/AAV-Logo-Black.png" alt="AAV Logo" className='h-10 sm:h-14' />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="flex items-center space-x-3 sm:space-x-8">
            {/* Indian Clients */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                    <img src="./images/india.jpg" alt="India Flag" className='w-8 h-8 sm:w-10 sm:h-10' />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold font-manrope text-gray-900">
                  Indian Clients
                </span>
                <a
                  href="tel:+919512424037"
                  className="text-xs sm:text-sm text-gray-700 font-manrope font-medium hover:text-indigo-600 transition-colors"
                >
                  +91 9512424037
                </a>
              </div>
            </div>

            {/* GCC Clients */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                    <img src="./images/uae.webp" alt="uae Flag" className='w-8 h-8 sm:w-10 sm:h-10' />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold font-manrope text-gray-900">
                  GCC Clients
                </span>
                <a
                  href="tel:+971568919669"
                  className="text-xs sm:text-sm text-gray-700 font-manrope font-medium hover:text-indigo-600 transition-colors"
                >
                  +971 568919669
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}