import React from 'react';
import { HiStar, HiCheckCircle } from 'react-icons/hi2';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "E-commerce Manager",
      company: "TechMart Solutions",
      rating: 5,
      content: "Review Shield has revolutionized how we handle customer reviews. The AI analysis is incredibly accurate and has helped us identify fake reviews that could have damaged our reputation. The detailed reports make it easy to take action.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "Digital Marketplace Inc.",
      rating: 5,
      content: "As someone who manages multiple product lines, Review Shield has been a game-changer. The visual analytics dashboard provides clear insights, and the Excel export feature makes reporting to stakeholders effortless.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Consumer Goods Co.",
      rating: 5,
      content: "The authenticity analysis is spot-on. We've been using Review Shield for 6 months now, and it's helped us maintain the integrity of our review system. The AI detection catches things we would have missed.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Business Owner",
      company: "Online Retail Store",
      rating: 5,
      content: "Review Shield gives me confidence in my purchasing decisions. The platform is user-friendly, and the detailed analysis helps me understand which products truly deserve their ratings.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Quality Assurance Lead",
      company: "Brand Protection Agency",
      rating: 5,
      content: "The multi-platform support is excellent. We can analyze reviews from different e-commerce sites using one tool. The API integration has streamlined our workflow significantly.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Data Analyst",
      company: "Market Research Firm",
      rating: 5,
      content: "The statistical analysis and color-coded reporting make it easy to present findings to clients. Review Shield has become an essential tool in our market research toolkit.",
      image: "/api/placeholder/60/60"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Reviews Analyzed" },
    { number: "500+", label: "Happy Customers" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <HiStar
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">What Our Customers Say</h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover how Review Shield has helped businesses and consumers make better decisions
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Review Shield has transformed the way businesses and consumers approach online reviews
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-8 h-8 text-blue-200 text-4xl font-bold leading-none">"</div>
                  <p className="text-gray-600 italic pl-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Leading Brands</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of businesses that trust Review Shield for authentic review analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">99.9% Uptime</h3>
              <p className="text-gray-600">Reliable service you can count on</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiCheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">GDPR Compliant</h3>
              <p className="text-gray-600">Your data is safe and secure</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiCheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Expert help when you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Success Stories</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey with Review Shield today and see the difference authentic review analysis can make
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

export default Testimonials;
