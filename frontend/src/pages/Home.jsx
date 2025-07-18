import React from 'react';
import { Link } from 'react-router-dom';
import { HiShieldCheck, HiRocketLaunch, HiCheckCircle, HiStar, HiChartBar } from 'react-icons/hi2';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Protect Your Business with
              <span className="text-yellow-300"> AI-Powered</span> Review Analysis
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Detect fake reviews, analyze authenticity, and make informed decisions with our advanced machine learning technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/analyzer"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <HiRocketLaunch className="w-6 h-6" />
                Start Analysis
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2 justify-center"
              >
                <HiShieldCheck className="w-6 h-6" />
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Review Shield?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive review analysis to help you make better business decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <HiShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Detection</h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms analyze review patterns, language, and authenticity markers
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <HiChartBar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visual Analytics</h3>
              <p className="text-gray-600">
                Interactive charts and graphs provide clear insights into review authenticity and quality
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <HiStar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Reports</h3>
              <p className="text-gray-600">
                Detailed Excel reports with color-coded authenticity indicators and statistical analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Analyze Your Reviews?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started with our AI-powered review analysis tool and make informed decisions based on authentic feedback
          </p>
          <Link
            to="/analyzer"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <HiRocketLaunch className="w-6 h-6" />
            Start Free Analysis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
