'use client'

import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ChevronDown, 
  PaletteIcon, 
  LayoutGridIcon, 
  CodeIcon, 
  ContactIcon 
} from 'lucide-react';
import EnhancedNavbar from '@/components/layouts/navbar/com';
import Footer from '@/components/layouts/footer/com';

const FAQPage = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { 
      id: 'general', 
      icon: <PaletteIcon className="mr-2 h-5 w-5" />,
      title: 'General Questions' 
    },
    { 
      id: 'services', 
      icon: <LayoutGridIcon className="mr-2 h-5 w-5" />,
      title: 'Services & Products' 
    },
    { 
      id: 'process', 
      icon: <CodeIcon className="mr-2 h-5 w-5" />,
      title: 'Work Process' 
    },
    { 
      id: 'contact', 
      icon: <ContactIcon className="mr-2 h-5 w-5" />,
      title: 'Contact Information' 
    }
  ];

  const faqData = {
    general: [
      {
        question: "What is DesignTify?",
        answer: "DesignTify is a design agency specializing in graphic design services, offering logo design, branding, posters, brochures, product packaging, UI/UX design, and creative visual solutions for individuals and companies."
      },
      {
        question: "What design services do you offer?",
        answer: "We provide three main design categories:\n1. Graphic Design\n- Logo Branding\n- Poster Design\n- Brochure Design\n- Institutional Design\n\n2. Product Design\n- Packaging Design\n- T-Shirt Design\n- Sticker Design\n- Interior Design\n\n3. UI/UX Design\n- Website Design\n- Mobile App Design"
      }
    ],
    services: [
      {
        question: "What makes our design unique?",
        answer: "- Logos that reflect business or personal branding identity\n- Creative visuals for promotional needs\n- Packaging designs that strengthen product branding\n- User-friendly and attractive website interface layouts"
      },
      {
        question: "Who are our target customers?",
        answer: "We serve:\n- Individuals needing design services\n- Small and medium enterprises\n- Startups\n- Organizations\n- Business owners requiring visual branding"
      }
    ],
    process: [
      {
        question: "How do I order design services?",
        answer: "1. Contact us through available channels\n2. Consult your design needs\n3. Discuss project concept and details\n4. Receive quote and project timeline\n5. Design process and revisions\n6. Final design delivery"
      },
      {
        question: "What are the design timelines?",
        answer: "Depends on project complexity:\n- Logo Design: 3-5 days\n- Poster/Brochure Design: 2-4 days\n- UI/UX Design: 1-2 weeks"
      }
    ],
    contact: [
      {
        question: "How can I reach you?",
        answer: "- Email: contact@designtify.com\n- Phone: +62 XXX-XXXX-XXXX\n- Social Media: @DesignTify"
      },
      {
        question: "Do you offer design revisions?",
        answer: "Yes, we provide design revisions to ensure client satisfaction within agreed-upon limits defined at the project's start."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <Card className="shadow-2xl border-none">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-t-lg p-6">
            <CardTitle className="flex items-center text-xl md:text-2xl font-bold">
              <PaletteIcon className="mr-3 h-6 md:h-8 w-6 md:w-8" />
              DesignTify - Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 md:p-6">
            {/* Section Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 border-b pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex items-center px-3 md:px-4 py-2 rounded-md transition-all text-sm md:text-base
                    ${activeSection === section.id 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white' 
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}
                  `}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible>
              {faqData[activeSection].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="mb-2">
                  <AccordionTrigger className="hover:bg-indigo-50 px-3 rounded-md text-left text-sm md:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-3 text-gray-600 text-sm md:text-base whitespace-pre-line bg-indigo-50/50 rounded-md p-3">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© 2024 DesignTify. All rights reserved.</p>
          <p className="mt-2 text-xs">Crafting visual solutions that tell your story</p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;