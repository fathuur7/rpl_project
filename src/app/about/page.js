'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PaletteIcon, 
  LayoutGridIcon, 
  BookOpen, 
  ArrowLeftIcon, 
  CheckCircle2Icon 
} from 'lucide-react';
import Navbar from '@/components/layouts/navbar/com';

const AboutUs = () => {
  const router = useRouter();

  const services = [
    {
      category: 'Graphic Design',
      description: 'Transforming brand identities through innovative visual storytelling and strategic design solutions.',
      items: [
        'Professional Logo Design',
        'Corporate Branding',
        'Marketing Collateral',
        'Social Media Graphics',
        'Print Design',
        'Visual Identity Systems'
      ],
      icon: <PaletteIcon className="w-12 h-12 text-blue-600" />,
      color: 'blue'
    },
    {
      category: 'Product Design',
      description: 'Crafting compelling product experiences that elevate brand perception and market competitiveness.',
      items: [
        'Packaging Design',
        'Product Visualization',
        'Merchandise Design',
        'Branded Merchandise',
        'Conceptual Prototyping',
        'Industrial Design Consulting'
      ],
      icon: <LayoutGridIcon className="w-12 h-12 text-green-600" />,
      color: 'green'
    },
    {
      category: 'UI/UX Design',
      description: 'Creating intuitive, user-centered digital experiences that engage and delight your audience.',
      items: [
        'Website Design',
        'Mobile App Interface',
        'User Experience Research',
        'Interactive Prototyping',
        'Usability Testing',
        'Design System Development'
      ],
      icon: <BookOpen className="w-12 h-12 text-purple-600" />,
      color: 'purple'
    }
  ];

  const keyStrengths = [
    'Creative Excellence',
    'Client-Centric Approach',
    'Cutting-Edge Design Techniques',
    'Tailored Solutions',
    'Timely Delivery',
    'Competitive Pricing'
  ];

  return (
    <main>
      <Navbar/>
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8 ">
      
      <div className="max-w-7xl mx-auto ">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            TIF Design Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering brands through innovative design solutions that transform vision into visual excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-300 border-${service.color}-100 hover:border-${service.color}-300`}
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                {service.icon}
                <CardTitle className="text-2xl text-gray-800">
                  {service.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 h-20">
                  {service.description}
                </p>
                <ul className="space-y-2 text-gray-700">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2Icon className={`w-4 h-4 mr-2 text-${service.color}-500`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-10 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our Key Strengths
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {keyStrengths.map((strength, index) => (
              <div 
                key={index} 
                className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {strength}
                </h3>
                <p className="text-gray-600">
                  {getStrengthDescription(strength)}
                </p>
              </div>
            ))}
          </div>
        </div>

    </div>
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-xl mb-6">
            Let&apos;s collaborate and bring your creative vision to life.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => Router.push('/contact')}
            className="px-8 py-3 text-lg"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  );
};

// Helper function to provide descriptions for key strengths
function getStrengthDescription(strength) {
  const descriptions = {
    'Creative Excellence': 'Pushing boundaries with innovative design approaches.',
    'Client-Centric Approach': 'Tailoring solutions to meet unique client needs.',
    'Cutting-Edge Design Techniques': 'Leveraging latest design trends and technologies.',
    'Tailored Solutions': 'Custom strategies for each project.',
    'Timely Delivery': 'Efficient workflows ensuring project deadlines.',
    'Competitive Pricing': 'High-quality design at affordable rates.'
  };
  return descriptions[strength];
}

export default AboutUs;