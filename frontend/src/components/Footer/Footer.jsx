import React from 'react'
import { HiShieldCheck } from 'react-icons/hi'
import { 
  HiEnvelope, 
  HiPhone, 
  HiMapPin,
  HiArrowRight 
} from 'react-icons/hi2'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube 
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" }
  ]

  const services = [
    { name: "Review Management", href: "#review-management" },
    { name: "Reputation Monitoring", href: "#reputation-monitoring" },
    { name: "Business Analytics", href: "#analytics" },
    { name: "Customer Insights", href: "#insights" },
    { name: "Review Response", href: "#response" },
    { name: "Brand Protection", href: "#protection" }
  ]

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, href: "#", color: "hover:text-blue-500" },
    { name: "Twitter", icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: FaInstagram, href: "#", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: FaLinkedinIn, href: "#", color: "hover:text-blue-600" },
    { name: "YouTube", icon: FaYoutube, href: "#", color: "hover:text-red-500" }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#6872ff] to-[#4c56d9] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Review Shield</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest updates on review management, industry insights, and exclusive tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="bg-white text-[#6872ff] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
                Subscribe
                <HiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-[#6872ff] rounded-full flex items-center justify-center">
                  <HiShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Review Shield</h2>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner in managing and protecting your online reputation. 
                We help businesses build trust through authentic reviews and customer feedback.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 ${social.color} hover:bg-gray-700 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <HiArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <HiArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HiMapPin className="h-5 w-5 text-[#6872ff] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">
                      123 Business Street<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HiPhone className="h-5 w-5 text-[#6872ff] flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors duration-200">
                    +1 (234) 567-8900
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <HiEnvelope className="h-5 w-5 text-[#6872ff] flex-shrink-0" />
                  <a href="mailto:info@reviewshield.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                    info@reviewshield.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Review Shield. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#sitemap" className="text-gray-400 hover:text-white transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
