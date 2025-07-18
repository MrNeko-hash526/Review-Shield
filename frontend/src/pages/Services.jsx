import React from 'react';
import { HiShieldCheck, HiChartBar, HiDocumentText, HiCog, HiGlobeAlt, HiUsers } from 'react-icons/hi2';

const Services = () => {
  const services = [
    {
      icon: HiShieldCheck,
      title: "Review Authenticity Analysis",
      description: "AI-powered detection of fake reviews using advanced natural language processing and machine learning algorithms.",
      features: ["Real-time analysis", "95%+ accuracy rate", "Multi-platform support", "Detailed authenticity scores"]
    },
    {
      icon: HiChartBar,
      title: "Visual Analytics Dashboard",
      description: "Interactive charts and graphs that provide clear insights into review patterns and authenticity trends.",
      features: ["Interactive pie charts", "Bar graph analysis", "Trend visualization", "Export capabilities"]
    },
    {
      icon: HiDocumentText,
      title: "Comprehensive Reporting",
      description: "Professional Excel reports with color-coded authenticity indicators and statistical analysis.",
      features: ["Excel export", "Multiple worksheets", "Statistical summaries", "Color-coded results"]
    },
    {
      icon: HiCog,
      title: "Custom Integration",
      description: "API access for businesses to integrate review analysis into their existing systems and workflows.",
      features: ["RESTful API", "Custom endpoints", "Bulk processing", "Real-time webhooks"]
    },
    {
      icon: HiGlobeAlt,
      title: "Multi-Platform Support",
      description: "Support for major e-commerce platforms including Flipkart, Amazon, and more coming soon.",
      features: ["Flipkart integration", "Amazon support", "Universal URL parsing", "Platform-specific optimization"]
    },
    {
      icon: HiUsers,
      title: "Business Intelligence",
      description: "Advanced analytics and insights to help businesses understand their review landscape better.",
      features: ["Trend analysis", "Competitor comparison", "Review quality metrics", "Strategic recommendations"]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-200 mb-8">
              Comprehensive review analysis solutions powered by cutting-edge AI technology
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our suite of AI-powered tools helps you make informed decisions based on authentic review data
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <HiShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple 3-step process delivers powerful insights in minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Product URL</h3>
              <p className="text-gray-600">
                Simply paste the product URL from supported e-commerce platforms
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes each review for authenticity and quality
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed analysis with visual charts and exportable reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Try our AI-powered review analysis tool and see the difference authentic insights can make
          </p>
          <a
            href="/analyzer"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            Start Free Analysis
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
