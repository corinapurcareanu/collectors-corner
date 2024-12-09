'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js'

posthog.init('phc_A3z91NsZNVC8qMLMmEoTSxHFmudW56Z6WYCuVsaaHOY',
    {
        api_host: 'https://eu.i.posthog.com',
        person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
    }
)

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // TODO: LandingPage event tracking
    posthog.capture('LandingPage', { event: 'Landed on Landing Page' });
    console.log('LandingPage event tracked');
  }, []);

  const handleGetStarted = () => {
    // TODO: Login event tracking
    console.log('Login event tracked');
    posthog.capture('Login', { event: 'User login' });
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <svg
          className="w-48 h-48 mb-8 text-white filter drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main background with subtle transparency */}
          <rect x="12" y="8" width="40" height="48" rx="6" fill="white" fillOpacity="0.1" stroke="white" />
          
          {/* Title bar */}
          <rect x="12" y="8" width="40" height="10" rx="6" fill="white" fillOpacity="0.2" stroke="white" />
          
          {/* Task items */}
          <g strokeWidth="2" stroke="white">
            {/* Task 1 - completed */}
            <rect x="16" y="24" width="4" height="4" rx="1" fill="white" />
            <line x1="24" y1="26" x2="44" y2="26" />
            
            {/* Task 2 */}
            <rect x="16" y="34" width="4" height="4" rx="1" fill="none" />
            <line x1="24" y1="36" x2="44" y2="36" />
            
            {/* Task 3 */}
            <rect x="16" y="44" width="4" height="4" rx="1" fill="none" />
            <line x1="24" y1="46" x2="44" y2="46" />
          </g>

          {/* Checkmark in first box */}
          <path d="M17 24.5L18 25.5L20 23.5" stroke="black" strokeWidth="1" />
        </svg>
        <h1 className="text-5xl font-extrabold mb-6 text-white">Todo List App</h1>
        <p className="text-xl mb-10 text-white">Keep track of your tasks easily</p>
        <button 
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          onClick={handleGetStarted}
        >
          Get started for free
        </button>
      </div>

      <div className="w-full bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Why Choose Our App Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Our App?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our Todo List App helps you stay organized and manage your daily tasks efficiently. 
              With a simple and intuitive interface, you can easily add, edit, and delete tasks.
            </p>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Features</h2>
            <ul className="grid gap-4 text-lg text-gray-600">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Easy task management with intuitive interface
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Real-time updates and synchronization
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Customizable themes and layouts
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Cross-platform support
              </li>
            </ul>
          </section>

          <section className="bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              What our users say
            </h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-white p-8 rounded-xl shadow-md transform transition hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://randomuser.me/api/portraits/women/32.jpg"
                      alt="Sarah Wilson"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Sarah Wilson</h3>
                      <p className="text-gray-500">Product Manager at Spotify</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    This task management app has completely transformed how our team collaborates. 
                    The intuitive interface and powerful features make it a joy to use daily.
                  </p>
                </div>
          
                {/* Testimonial 2 */}
                <div className="bg-white p-8 rounded-xl shadow-md transform transition hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://randomuser.me/api/portraits/men/44.jpg"
                      alt="James Chen"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">James Chen</h3>
                      <p className="text-gray-500">Tech Lead at Adobe</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    The real-time collaboration features are outstanding. We&apos;ve seen a 40% 
                    increase in team productivity since switching to this platform.
                  </p>
                </div>
          
                {/* Testimonial 3 */}
                <div className="bg-white p-8 rounded-xl shadow-md transform transition hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Emma Rodriguez"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Emma Rodriguez</h3>
                      <p className="text-gray-500">Founder at Startup.io</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                   As a startup founder, I needed something flexible yet powerful. 
                    This tool delivers exactly that, helping us stay organized as we scale.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}