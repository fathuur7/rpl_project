import { 
    PaletteIcon, 
    LayoutGridIcon, 
    BookOpen
  } from 'lucide-react';
  
  const services = [
    {
      icon: <PaletteIcon className="w-12 h-12 text-indigo-600" />,
      title: "Web Design",
      description: "Crafting visually stunning and user-friendly websites that provide seamless digital experiences.",
      fullDescription: `
        Web design is not just about aesthetics; it’s about creating a functional and engaging user experience. We design modern, responsive, and intuitive websites that enhance brand presence and customer engagement.
  
        Our services include:
        - Custom website designs tailored to your brand
        - Responsive and mobile-friendly layouts
        - UI/UX strategies to increase user engagement
        - Integration of interactive animations
      `,
      details: [
        { title: "Landing Page", explanation: "Creating eye-catching main pages for campaigns or product promotions." },
        { title: "Corporate Website", explanation: "Professional websites that showcase business identity and services." },
        { title: "Portfolio Website", explanation: "Presenting creative works in an engaging and professional manner." },
        { title: "E-commerce UI", explanation: "Designing UI/UX for online stores to enhance the shopping experience." },
        { title: "Website Redesign", explanation: "Refreshing website appearance and structure for a modern, functional look." }
      ],
      processSteps: [
        "Research & Requirement Analysis",
        "Wireframing & Prototyping",
        "Visual Design",
        "Testing & Revisions",
        "Finalization & Handover"
      ]
    },
    {
      icon: <LayoutGridIcon className="w-12 h-12 text-green-600" />,
      title: "Mobile App Design",
      description: "Designing intuitive, visually appealing mobile apps that provide seamless user experiences.",
      fullDescription: `
        A well-designed mobile app enhances user engagement and brand credibility. Our designs focus on user experience, ease of navigation, and responsiveness to ensure a smooth app interface.
  
        Key aspects of our approach:
        - User-friendly and aesthetically appealing designs
        - Interactive and engaging UI elements
        - Scalable layouts for different screen sizes
        - Cross-platform consistency for iOS and Android
      `,
      details: [
        { title: "UI/UX Wireframing", explanation: "Creating structured blueprints for mobile app layouts." },
        { title: "Interactive Prototypes", explanation: "Developing clickable models for testing before development." },
        { title: "User Flow Optimization", explanation: "Enhancing navigation and interaction patterns for better usability." },
        { title: "Custom App Design", explanation: "Tailoring app visuals to align with brand identity and target audience." },
        { title: "Accessibility & Usability", explanation: "Ensuring the app is user-friendly for diverse audiences." }
      ],
      processSteps: [
        "User Research & Persona Development",
        "Information Architecture",
        "Wireframing & Prototyping",
        "User Testing & Refinement",
        "Final Design Handover"
      ]
    },
    {
      icon: <BookOpen className="w-12 h-12 text-purple-600" />,
      title: "Logo & Branding",
      description: "Creating impactful visual identities that define your brand and leave a lasting impression.",
      fullDescription: `
        Your logo and branding are the foundation of your business identity. We craft visually compelling logos and cohesive branding that communicate your brand story effectively.
  
        What we offer:
        - Custom logo design reflecting brand identity
        - Comprehensive branding guidelines
        - Unique color palettes and typography selection
        - Visual identity system development
      `,
      details: [
        { title: "Logo Design", explanation: "Creating distinct, memorable brand marks tailored to your business." },
        { title: "Brand Guidelines", explanation: "Providing a structured guide for consistent brand representation." },
        { title: "Typography & Color Palette", explanation: "Choosing font styles and colors that align with brand personality." },
        { title: "Visual Identity System", explanation: "Developing a complete brand aesthetic across all platforms." },
        { title: "Business Card & Stationery", explanation: "Designing branded assets for professional representation." }
      ],
      processSteps: [
        "Brand Discovery & Research",
        "Concept Development",
        "Logo & Identity Design",
        "Revisions & Refinement",
        "Brand Rollout & Implementation"
      ]
    },
    {
      icon: <PaletteIcon className="w-12 h-12 text-yellow-600" />,
      title: "Packaging Design",
      description: "Designing product packaging that stands out on shelves and resonates with consumers.",
      fullDescription: `
        Packaging is more than protection; it’s a marketing tool that influences purchasing decisions. We create visually appealing and functional packaging designs that align with brand identity.
  
        Our packaging solutions include:
        - Product label and box design
        - Eco-friendly and sustainable packaging concepts
        - Custom typography and graphics
        - Market research-based packaging strategies
      `,
      details: [
        { title: "Product Labels", explanation: "Designing unique and informative labels for products." },
        { title: "Box Packaging", explanation: "Creating structural and visual elements for effective branding." },
        { title: "Minimalist & Modern Designs", explanation: "Offering sleek, contemporary packaging concepts." },
        { title: "Luxury Packaging", explanation: "Crafting high-end, premium packaging for exclusive products." },
        { title: "Sustainable Packaging", explanation: "Designing environmentally friendly packaging solutions." }
      ],
      processSteps: [
        "Product & Market Research",
        "Concept Ideation",
        "Prototype & Material Selection",
        "Design Finalization",
        "Production & Implementation"
      ]
    },
    {
      icon: <LayoutGridIcon className="w-12 h-12 text-red-600" />,
      title: "Social Media Design",
      description: "Crafting visually appealing content that boosts engagement and enhances brand presence online.",
      fullDescription: `
        Social media is a crucial marketing tool, and visually compelling content helps brands connect with their audience. We design high-quality graphics tailored for various social platforms.
  
        Our offerings:
        - Social media post and ad creatives
        - Story and carousel designs
        - Infographics and promotional banners
        - Consistent branding across all social platforms
      `,
      details: [
        { title: "Instagram & Facebook Posts", explanation: "Designing engaging visuals for social media campaigns." },
        { title: "LinkedIn & Twitter Graphics", explanation: "Creating professional content for corporate branding." },
        { title: "Story & Highlight Covers", explanation: "Designing aesthetic icons for profile highlights." },
        { title: "YouTube Thumbnails & Banners", explanation: "Crafting eye-catching thumbnails and channel art." },
        { title: "Infographic Design", explanation: "Presenting complex data in a visually appealing format." }
      ],
      processSteps: [
        "Content Strategy & Research",
        "Mood Board & Style Guide",
        "Design Creation",
        "Feedback & Revisions",
        "Final Delivery & Scheduling"
      ]
    },
    {
      icon: <BookOpen className="w-12 h-12 text-cyan-600" />,
      title: "Print & Editorial Design",
      description: "Bringing creative ideas to life through beautifully designed print materials and editorial layouts.",
      fullDescription: `
        From brochures to magazines, we create stunning print materials that leave a lasting impact. Our editorial designs are carefully crafted for clarity, engagement, and brand consistency.
  
        We specialize in:
        - Magazine and book layouts
        - Corporate brochures and catalogs
        - Posters, flyers, and event materials
        - High-quality print-ready graphics
      `,
      details: [
        { title: "Brochure & Catalog Design", explanation: "Creating visually compelling marketing materials." },
        { title: "Magazine & Editorial Layouts", explanation: "Designing well-structured publications for readability." },
        { title: "Business Reports & Presentations", explanation: "Crafting professional documents for corporate use." },
        { title: "Flyer & Poster Design", explanation: "Producing high-impact promotional materials." },
        { title: "Print-Ready Files", explanation: "Ensuring high-resolution designs optimized for printing." }
      ],
      processSteps: [
        "Concept Development",
        "Layout Design",
        "Typography & Imagery",
        "Proofing & Revisions",
        "Final Print File Preparation"
      ]
    }
  ];
  

export default services;