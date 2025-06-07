import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ServicesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = [
          {
            id: 1,
            name: "Brand Identity Design",
            description: "Create compelling brand identities that resonate with your target audience and stand out in the marketplace.",
            services: ["Logo Design", "Brand Guidelines", "Color Palette", "Poster Design", "Brochure"]
          },
          {
            id: 2,
            name: "Merchandise Design",
            description: "Craft visually appealing and functional product designs that elevate your brand and connect with your audience.",
            services: ["Packaging Design", "T-shirt & Merchandise Design", "Sticker & Label Design", "Interior & Space Branding"]
          },
          {
            id: 3,
            name: "UI/UX Design",
            description: "Design intuitive user experiences that delight users and achieve your business objectives.",
            services: ["User Research", "Wireframing & Prototyping", "User Interface Design", "Usability Testing", "Interface Design"]
          },
          {
            id: 4,
            name: "Mobile App Design",
            description: "Create stunning mobile applications that provide exceptional user experiences across all devices.",
            services: ["iOS App Design", "Android App Design", "Cross-platform Solutions", "App Store Optimization", "User Testing"]
          },
          // {
          //   id: 2,
          //   name: "Web Development",
          //   description: "Build responsive, fast, and user-friendly websites that drive engagement and conversions.",
          //   services: ["Responsive Design", "E-commerce Solutions", "CMS Development", "Performance Optimization", "SEO Integration"]
          // },
          // {
          //   id: 3,
          //   name: "UI/UX Design",
          //   description: "Design intuitive user experiences that delight users and achieve your business objectives.",
          //   services: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Interface Design"]
          // },
          // {
          //   id: 4,
          //   name: "Digital Marketing",
          //   description: "Comprehensive digital marketing strategies to grow your online presence and reach your audience.",
          //   services: ["Social Media Management", "Content Strategy", "PPC Advertising", "Email Marketing", "Analytics & Reporting"]
          // },
          // {
          //   id: 5,
          //   name: "Mobile App Design",
          //   description: "Create stunning mobile applications that provide exceptional user experiences across all devices.",
          //   services: ["iOS App Design", "Android App Design", "Cross-platform Solutions", "App Store Optimization", "User Testing"]
          // },
          // {
          //   id: 6,
          //   name: "Print Design",
          //   description: "Professional print design services that make your brand tangible and memorable.",
          //   services: ["Business Cards", "Brochures", "Packaging Design", "Event Materials", "Corporate Stationery"]
          // }
        ];
        
        setCategories(mockData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Memoized data to prevent unnecessary re-renders
  const { gradients, icons } = useMemo(() => ({
    gradients: [
      'from-violet-600 via-purple-600 to-blue-600',
      'from-emerald-500 via-teal-500 to-cyan-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-indigo-600 via-purple-600 to-pink-600',
      'from-green-500 via-emerald-500 to-teal-600',
      'from-yellow-500 via-orange-500 to-red-500'
    ],
    icons: [
      // Brand Identity
      <svg key="brand" className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>,
      // Web Development
      <svg key="web" className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
      </svg>,
      // UI/UX Design
      <svg key="uiux" className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>
      </svg>,
      // Mobile App
      <svg key="mobile" className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z"/>
      </svg>,
      // Digital Marketing
      <svg key="marketing" className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 8.12,16.5 8.91,15.77L10.36,17.22C9.35,18.22 8.24,18.5 7.07,18.28M18.93,18.28C17.76,18.5 16.65,18.22 15.64,17.22L17.09,15.77C17.88,16.5 18.5,17.38 18.93,18.28M12,15.5C10.07,15.5 8.5,13.93 8.5,12C8.5,10.07 10.07,8.5 12,8.5C13.93,8.5 15.5,10.07 15.5,12C15.5,13.93 13.93,15.5 12,15.5Z"/>
      </svg>,
      // Print Design
      <svg key="print" className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18,3H6V7H18V3M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16V19M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z"/>
      </svg>
    ]
  }), []);

  // Loading state
  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 font-medium animate-pulse">
              Loading our amazing services...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
              <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <p className="font-semibold">Oops! Something went wrong</p>
              <p className="text-sm opacity-90 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 opacity-0 animate-[slideInUp_0.8s_ease-out_forwards]">
          <div className="transform translate-y-4 opacity-0 animate-[slideInUp_0.6s_ease-out_0.2s_forwards]">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-full mb-6">
              Our Services
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Design Services That
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Transform Ideas
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We offer comprehensive design solutions tailored to meet your specific needs and goals. 
            From concept to completion, we bring your vision to life with creativity and precision.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.id || index}
              className="group opacity-0 translate-y-8 animate-[slideInUp_0.6s_ease-out_forwards] hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-white/80 backdrop-blur-sm border-0 rounded-3xl">
                <div className="h-56 overflow-hidden relative group-hover:scale-105 transition-transform duration-400">
                  <div className={`w-full h-full flex items-center justify-center relative bg-gradient-to-br ${gradients[index % gradients.length]} shadow-inner`}>
                    {/* Simplified background pattern */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)`,
                        backgroundSize: '40px 40px, 20px 20px'
                      }}
                    />
                    
                    {/* Static decorative elements */}
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white/30 rounded-full animate-pulse" />
                    <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/40 rotate-45" />
                    
                    {/* Icon and Title */}
                    <div className="text-center text-white relative z-10">
                      <div className="mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        {icons[index % icons.length]}
                      </div>
                      <h4 className="text-xl font-bold mb-2 drop-shadow-lg">
                        {category.name || `Service ${index + 1}`}
                      </h4>
                      <div className="w-12 h-1 bg-white/60 mx-auto rounded-full" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {category.name || "Service"}
                  </h3>
                  
                  <div className="text-gray-600 mb-6">
                    {category.description && (
                      <p className="mb-6 text-lg leading-relaxed">{category.description}</p>
                    )}
                    
                    {category.services && Array.isArray(category.services) && (
                      <ul className="space-y-3">
                        {category.services.slice(0, 4).map((service, serviceIndex) => (
                          <li 
                            key={serviceIndex}
                            className="flex items-center group/item opacity-0 -translate-x-4 animate-[slideInRight_0.4s_ease-out_forwards]"
                            style={{ animationDelay: `${serviceIndex * 0.1}s` }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200" />
                            <span className="group-hover/item:text-indigo-600 transition-colors duration-200 font-medium">
                              {typeof service === 'string' ? service : service.name || service.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <Button className="rounded-2xl w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 group/btn">
                    <span className="flex items-center justify-center">
                      Learn More
                      <svg 
                        className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        {categories.length === 0 && !loading && (
          <div className="text-center py-16 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-lg">
              <svg className="w-16 h-16 mx-auto mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xl text-gray-600 font-medium">No services available at the moment.</p>
              <p className="text-gray-500 mt-2">Please check back later for updates.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;