import React from 'react';
import { HiShieldCheck, HiUsers, HiCpuChip, HiGlobeAlt } from 'react-icons/hi2';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Review Shield</h1>
            <p className="text-xl text-gray-200 mb-8">
              We're on a mission to restore trust in online reviews through cutting-edge AI technology
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Review Shield was born from the need to combat the growing problem of fake reviews in e-commerce. 
                Our team of AI researchers and data scientists developed advanced machine learning algorithms 
                that can detect review authenticity with unprecedented accuracy.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <HiShieldCheck className="w-12 h-12 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower consumers and businesses with the tools they need to identify authentic reviews, 
                make informed purchasing decisions, and build trust in the digital marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered approach combines multiple detection methods for the most accurate results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiCpuChip className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced AI</h3>
              <p className="text-gray-600">Fine-tuned DistilBERT model trained on millions of reviews</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiGlobeAlt className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Platform</h3>
              <p className="text-gray-600">Works with major e-commerce platforms like Flipkart and Amazon</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiUsers className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">User-Friendly</h3>
              <p className="text-gray-600">Simple interface with powerful analytics and reporting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A dedicated team of AI researchers, data scientists, and developers working to make online reviews more trustworthy
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Built by Experts</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team combines expertise in machine learning, natural language processing, and web development 
                to create the most accurate review analysis platform available today.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
