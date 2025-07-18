import React from 'react'
import { Link } from 'react-router-dom'
import { 
  HiShieldCheck, 
  HiChartBarSquare, 
  HiChatBubbleBottomCenterText, 
  HiBell,
  HiCog6Tooth,
  HiGlobeAlt,
  HiCheckCircle,
  HiArrowRight,
  HiStar,
  HiUsers,
  HiLightBulb
} from 'react-icons/hi2'

const Services = () => {
  const mainServices = [
    {
      icon: HiShieldCheck,
      title: "Review Management",
      description: "Centralized platform to monitor, manage, and respond to reviews across all major platforms including Google, Yelp, Facebook, and more.",
      features: [
        "Multi-platform monitoring",
        "Automated review alerts",
        "Response templates",
        "Review filtering & sorting"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: HiChartBarSquare,
      title: "Analytics & Insights",
      description: "Comprehensive analytics dashboard with actionable insights to help you understand customer sentiment and improve your business.",
      features: [
        "Sentiment analysis",
        "Performance metrics",
        "Trend tracking",
        "Custom reports"
      ],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: HiChatBubbleBottomCenterText,
      title: "AI-Powered Responses",
      description: "Smart response suggestions powered by AI to help you craft professional, personalized replies that convert negative experiences into positive outcomes.",
      features: [
        "AI response generation",
        "Tone customization",
        "Brand voice training",
        "Quick response templates"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: HiBell,
      title: "Real-time Monitoring",
      description: "Stay ahead of your reputation with instant notifications whenever new reviews are posted, allowing you to respond quickly and effectively.",
      features: [
        "Instant notifications",
        "Email & SMS alerts",
        "Custom monitoring rules",
        "Team collaboration"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: HiCog6Tooth,
      title: "Workflow Automation",
      description: "Streamline your review management process with automated workflows that save time and ensure consistent responses.",
      features: [
        "Automated routing",
        "Response workflows",
        "Escalation rules",
        "Integration APIs"
      ],
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: HiGlobeAlt,
      title: "White-Label Solutions",
      description: "Offer review management services to your clients with our fully customizable white-label platform that matches your brand.",
      features: [
        "Custom branding",
        "Multi-tenant architecture",
        "Reseller dashboard",
        "Client management tools"
      ],
      color: "from-teal-500 to-cyan-600"
    }
  ]

  const additionalServices = [
    {
      title: "Review Generation",
      description: "Automated campaigns to encourage satisfied customers to leave positive reviews",
      icon: HiStar
    },
    {
      title: "Team Management",
      description: "Multi-user access with role-based permissions and collaboration tools",
      icon: HiUsers
    },
    {
      title: "Custom Integrations",
      description: "Connect with your existing tools and systems through our robust API",
      icon: HiLightBulb
    }
  ]

  const pricingTiers = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small businesses getting started with review management",
      features: [
        "Up to 3 locations",
        "Basic analytics",
        "Email notifications",
        "Standard support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Ideal for growing businesses with multiple locations",
      features: [
        "Up to 10 locations",
        "Advanced analytics",
        "AI-powered responses",
        "Priority support",
        "Custom branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Tailored solutions for large organizations and agencies",
      features: [
        "Unlimited locations",
        "White-label options",
        "Custom integrations",
        "Dedicated support",
        "Advanced security"
      ],
      popular: false
    }
  ]

  const industries = [
    { name: "Restaurants", icon: "🍽️" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Retail", icon: "🛍️" },
    { name: "Hotels", icon: "🏨" },
    { name: "Automotive", icon: "🚗" },
    { name: "Legal", icon: "⚖️" },
    { name: "Beauty", icon: "💄" },
    { name: "Fitness", icon: "💪" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6872ff] to-[#4c56d9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive review management solutions designed to help your business build trust, 
              improve customer relationships, and grow your online reputation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to master your online reputation in one powerful platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mr-4`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <HiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Extended capabilities to enhance your review management experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#6872ff] rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by businesses across various industries to manage their online reputation
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors duration-300">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options to fit businesses of all sizes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg ${tier.popular ? 'ring-2 ring-[#6872ff] relative' : ''} hover:shadow-xl transition-shadow duration-300`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#6872ff] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#6872ff]">{tier.price}</span>
                    <span className="text-gray-600 ml-2">{tier.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <HiCheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/analyzer"
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-center block ${
                      tier.popular 
                        ? 'bg-[#6872ff] text-white hover:bg-[#5562e8]' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
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
            Ready to Transform Your Review Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Review Shield to manage their online reputation 
            and build stronger customer relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/analyzer"
              className="bg-white text-[#6872ff] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Start Free Trial
              <HiArrowRight className="ml-2 h-5 w-5" />
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

export default Services
