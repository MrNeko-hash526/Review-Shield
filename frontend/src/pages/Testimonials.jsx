import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiStar, HiArrowLeft, HiArrowRight } from 'react-icons/hi2'
import { HiShieldCheck } from 'react-icons/hi'
import { FaQuoteLeft } from 'react-icons/fa'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechStart Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9ad88c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 5,
      content: "Review Shield has transformed how we manage our online reputation. The platform is intuitive, and the insights we get are invaluable. Our review response time has improved by 75%.",
      results: "75% faster response time"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "Urban Eats Restaurant Group",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 5,
      content: "As a restaurant owner, managing reviews across multiple platforms was a nightmare. Review Shield centralized everything and helped us increase our average rating from 3.2 to 4.8 stars.",
      results: "Increased rating to 4.8 stars"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Operations Manager",
      company: "Wellness Spa & Retreat",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 5,
      content: "The analytics dashboard gives us incredible insights into customer sentiment. We've been able to identify and fix issues before they become bigger problems. Highly recommended!",
      results: "Prevented 90% of potential issues"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Store Manager",
      company: "AutoCare Plus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 5,
      content: "Review Shield's automated response suggestions have saved us countless hours. The AI-powered insights help us craft perfect responses that actually convert negative reviews into positive outcomes.",
      results: "Saved 20+ hours per week"
    },
    {
      id: 5,
      name: "Lisa Parker",
      position: "Marketing Manager",
      company: "Boutique Hotel Chain",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 5,
      content: "The real-time monitoring feature is a game-changer. We get instant notifications and can respond to reviews while the experience is still fresh in our guests' minds.",
      results: "Real-time response capability"
    },
    {
      id: 6,
      name: "Robert Kim",
      position: "Owner",
      company: "Digital Marketing Agency",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 5,
      content: "We use Review Shield for all our clients. The white-label solution allows us to offer review management as part of our service package. It's been a huge revenue driver.",
      results: "30% increase in client retention"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: "👥" },
    { number: "500K+", label: "Reviews Managed", icon: "⭐" },
    { number: "4.9/5", label: "Customer Satisfaction", icon: "😊" },
    { number: "99.9%", label: "Platform Uptime", icon: "🚀" }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <HiStar
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6872ff] to-[#4c56d9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">What Our Clients Say</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what businesses are saying about Review Shield.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <FaQuoteLeft className="h-12 w-12 text-[#6872ff] opacity-20 absolute top-6 left-6" />
            
            <div className="text-center">
              <div className="mb-6">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="text-center">
                <p className="font-semibold text-gray-900 text-lg">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-[#6872ff] font-medium">
                  {testimonials[currentTestimonial].position}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].company}
                </p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <HiShieldCheck className="h-4 w-4 mr-2" />
                  {testimonials[currentTestimonial].results}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <HiArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <HiArrowRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#6872ff]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Businesses
            </h2>
            <p className="text-xl text-gray-600">
              See the impact Review Shield has made across industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#6872ff] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Read what our customers have to say about their experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-[#6872ff]">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-4">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <HiShieldCheck className="h-4 w-4 mr-1" />
                  {testimonial.results}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#6872ff] to-[#4c56d9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start managing your reviews like a pro and see the difference Review Shield can make for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/analyzer"
              className="bg-white text-[#6872ff] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/contact"
              className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors duration-200 border-2 border-white text-center"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
