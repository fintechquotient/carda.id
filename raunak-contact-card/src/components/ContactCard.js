'use client'

import React, { useState } from 'react';

const ContactCard = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    countryCode: '91',
    phone: '',
    email: '',
    tags: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneProgress, setPhoneProgress] = useState(0);

  const availableTags = ['#meeting', '#event', '#GFF', '#fintechquotient'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    
    setPhoneProgress(value.length);
    
    if (errors.phone && value.length === 10) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Please enter your full name.';
    }
    
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const selectedTags = formData.tags.join(' ');
      const message = `Hi Raunak! I'm ${formData.fullname}. ${selectedTags ? `Context: ${selectedTags}` : 'Looking forward to connecting!'}`;
      const whatsappUrl = `https://wa.me/${formData.countryCode}${formData.phone}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      
      setFormData({
        fullname: '',
        countryCode: '91',
        phone: '',
        email: '',
        tags: []
      });
      setPhoneProgress(0);
    }, 1000);
  };

  const getProgressColor = () => {
    if (phoneProgress === 0) return '#ef4444';
    if (phoneProgress < 10) return '#f59e0b';
    return '#10b981';
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/raunakdembla',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'X',
      url: 'https://x.com/raunakdembla?s=21&t=ZRkUOJHJl8quGSMgKvsENA',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="text-center p-8 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 rounded-b-3xl text-white shadow-2xl">
          <div className="relative inline-block mb-6">
            <img 
              src="/profile-photo.jpg" 
              alt="Raunak Dembla Profile Picture" 
              className="w-40 h-40 rounded-full object-cover object-top border-4 border-white/30 shadow-xl"
              style={{
                objectPosition: 'center 15%'
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Raunak Dembla</h1>
          <h2 className="text-lg mb-4 text-blue-100 leading-relaxed text-justify" style={{textAlignLast: 'center'}}>
            Founding Member at Decentro, Host of the Fintech Quotient Podcast, Executive MBA candidate at ISB PGPpro 2026
          </h2>
          <p className="text-blue-200 flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Bangalore, India · 10+ Years
          </p>
        </div>

        {/* About Section */}
        <div className="mt-6 p-6 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg rounded-2xl shadow-lg border border-white/80">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">About Me</h3>
          <p className="text-gray-700 leading-relaxed text-justify">
            I'm a business generalist with 10+ years in early-stage startups, currently leading business at Decentro for over 5 years. In that time, I've stitched together solutions for 200+ fintech and BFSI players across India. Earlier, I was at Perpule, which got acquired by Amazon soon after. I also host the Fintech Quotient podcast — my attempt at building a community for fintech founders, operators, and investors. I'm currently pursuing an Executive MBA at ISB.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-6 p-6 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg rounded-2xl shadow-lg border border-white/80">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-blue-900 to-cyan-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:from-blue-800 hover:to-cyan-500"
                >
                  {link.icon}
                  <span className="hidden sm:inline">Connect on {link.name}</span>
                  <span className="sm:hidden">{link.name}</span>
                </a>
              ))}
            </div>
            <a
              href="https://www.youtube.com/@fintechquotient"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-blue-900 to-cyan-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:from-blue-800 hover:to-cyan-500"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe to Fintech Quotient
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-6 p-6 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg rounded-2xl shadow-lg border border-white/80">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Let's Connect</h3>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                placeholder="Full Name (required)"
                className={`w-full p-4 border-2 rounded-xl bg-white/70 backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fullname ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {errors.fullname}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="w-24 p-4 border-2 border-gray-200 rounded-xl bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="91">🇮🇳 +91</option>
                  <option value="1">🇺🇸 +1</option>
                  <option value="44">🇬🇧 +44</option>
                  <option value="61">🇦🇺 +61</option>
                  <option value="65">🇸🇬 +65</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Mobile Number (required)"
                  className={`flex-1 p-4 border-2 rounded-xl bg-white/70 backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              
              <div className="mt-2">
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${Math.max(10, (phoneProgress / 10) * 100)}%`,
                      backgroundColor: getProgressColor()
                    }}
                  />
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  {phoneProgress < 10 ? `${10 - phoneProgress} digits to go` : 'All done! ✅'}
                </p>
              </div>
              
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Context (optional):</p>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      formData.tags.includes(tag)
                        ? 'bg-gradient-to-r from-blue-900 to-cyan-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address (optional)"
                className={`w-full p-4 border-2 rounded-xl bg-white/70 backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 bg-gradient-to-r from-blue-900 to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:shadow-lg hover:-translate-y-1 hover:from-blue-800 hover:to-cyan-500'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                  Connect with me on WhatsApp
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              🔒 Your information is secure and will only be used to connect with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;