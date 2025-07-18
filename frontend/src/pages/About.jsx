import React from 'react'
import { Link } from 'react-router-dom'
import { 
  HiShieldCheck, 
  HiUsers, 
  HiLightBulb, 
  HiHeart,
  HiTrophy,
  HiGlobeAlt,
  HiCheckCircle
} from 'react-icons/hi2'
import { HiStar } from 'react-icons/hi'

const About = () => {
  const values = [
    {
      icon: HiShieldCheck,
      title: "Trust & Transparency",
      description: "We believe in building authentic relationships through honest communication and transparent practices."
    },
    {
      icon: HiUsers,
      title: "Customer Success",
      description: "Your success is our success. We're committed to helping businesses thrive through better review management."
    },
    {
      icon: HiLightBulb,
      title: "Innovation",
      description: "We continuously evolve our platform with cutting-edge technology to stay ahead of industry trends."
    },
    {
      icon: HiHeart,
      title: "Passion for Excellence",
      description: "We're passionate about delivering exceptional service and helping businesses build lasting relationships."
    }
  ]

  const stats = [
    { number: "2018", label: "Founded", icon: HiTrophy },
    { number: "10,000+", label: "Active Users", icon: HiUsers },
    { number: "50+", label: "Countries", icon: HiGlobeAlt },
    { number: "500K+", label: "Reviews Managed", icon: HiStar }
  ]

  const team = [
    {
      name: "Alex Johnson",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bio: "Former tech executive with 15+ years in customer experience and digital transformation."
    },
    {
      name: "Sarah Chen",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9ad88c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bio: "AI and machine learning expert who leads our technical innovation and product development."
    },
    {
      name: "Michael Rodriguez",
      position: "VP of Customer Success",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bio: "Customer success specialist with deep expertise in helping businesses optimize their online reputation."
    },
    {
      name: "Emma Thompson",
      position: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bio: "Marketing strategist focused on helping businesses understand the power of authentic customer feedback."
    }
  ]

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to help businesses manage their online reputation effectively."
    },
    {
      year: "2019",
      title: "First 1,000 Users",
      description: "Reached our first milestone with small businesses embracing our platform."
    },
    {
      year: "2020",
      title: "AI Integration",
      description: "Launched AI-powered review analysis and response suggestions."
    },
    {
      year: "2021",
      title: "Enterprise Launch",
      description: "Expanded to serve enterprise clients with advanced features and white-label solutions."
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Extended our services to over 25 countries worldwide."
    },
    {
      year: "2023",
      title: "10,000+ Customers",
      description: "Celebrated serving over 10,000 businesses globally."
    },
    {
      year: "2024",
      title: "Advanced Analytics",
      description: "Launched comprehensive analytics dashboard with predictive insights."
    },
    {
      year: "2025",
      title: "Industry Leadership",
      description: "Recognized as the leading review management platform with 500K+ reviews managed."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6872ff] to-[#4c56d9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">About Review Shield</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to help businesses build trust and grow through authentic customer feedback. 
              Since 2018, we've been the trusted partner for companies looking to master their online reputation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To empower businesses of all sizes to build authentic relationships with their customers 
                through transparent, effective review management. We believe that every review is an 
                opportunity to improve, grow, and strengthen customer trust.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <HiCheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Simplify review management across all platforms</p>
                </div>
                <div className="flex items-start space-x-3">
                  <HiCheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Provide actionable insights from customer feedback</p>
                </div>
                <div className="flex items-start space-x-3">
                  <HiCheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Help businesses respond professionally and promptly</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#6872ff] rounded-full flex items-center justify-center mx-auto mb-6">
                    <HiShieldCheck className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To become the world's most trusted review management platform, 
                    where businesses and customers connect through authentic, meaningful feedback 
                    that drives continuous improvement and mutual success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#6872ff] rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#6872ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to helping your business succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-[#6872ff] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#6872ff] font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a small startup to industry leader - here's how we've grown
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#6872ff] opacity-20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-[#6872ff] mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-[#6872ff] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#6872ff] to-[#4c56d9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Review Shield to manage their online reputation 
            and build stronger customer relationships.
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
