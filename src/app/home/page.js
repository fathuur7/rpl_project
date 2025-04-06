'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EnhancedNavbar from "@/components/layouts/navbar/com";
import Footer from "@/components/layouts/footer/com";

const formSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long"}),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});


const Home = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  function onSubmit(values ) {
    console.log(values);
    // In a real application, you would send this data to your server
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <EnhancedNavbar />

      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://public.readdy.ai/ai/img_res/d5c77385025fdf9445e8440af65bb749.jpg"
            alt="Design Studio"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Bringing Your Vision to Life Through Creative Design
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              TIF Design specializes in creating stunning visual solutions for
              businesses and individuals. From branding to UI/UX, we transform
              ideas into impactful designs.
            </p>
            <div className="flex space-x-4">
              <Button className="!rounded-button bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                Explore Our Work
              </Button>
              <Button
                variant="outline"
                className="!rounded-button border-indigo-600 text-indigo-600 hover:bg-indigo-50 cursor-pointer whitespace-nowrap"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Design Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive design solutions tailored to meet your
              specific needs and goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Graphic Design */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/bf4e42c28e163971219053ec72f2e792.jpg"
                  alt="Graphic Design"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Graphic Design
                </h3>
                <ul className="text-gray-600 mb-4 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Logo & Brand Identity
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Marketing Materials
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Posters & Brochures
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Social Media Graphics
                  </li>
                </ul>
                <Button className="!rounded-button w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                  Learn More
                </Button>
              </div>
            </Card>
            {/* Product Design */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/bfa92193209ef703b16cd4d25c0345fa.jpg"
                  alt="Product Design"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Product Design
                </h3>
                <ul className="text-gray-600 mb-4 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Packaging Design
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    T-shirt & Merchandise
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Stickers & Labels
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Interior Design Elements
                  </li>
                </ul>
                <Button className="!rounded-button w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                  Learn More
                </Button>
              </div>
            </Card>
            {/* UI/UX Design */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/88efaa3ee0c86290961589d16de2384d.jpg"
                  alt="UI/UX Design"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  UI/UX Design
                </h3>
                <ul className="text-gray-600 mb-4 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Website Design
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Mobile App Interfaces
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    User Experience Optimization
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Interactive Prototypes
                  </li>
                </ul>
                <Button className="!rounded-button w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/* Target Audience Section */}
      <section id="clients" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our design solutions are tailored for both individuals and
              businesses, each with unique needs and goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Individual Clients */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/6a849140c004533eb1135e81550150ec.jpg"
                  alt="Individual Clients"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  For Individuals
                </h3>
                <p className="text-gray-600 mb-6">
                  We help entrepreneurs, freelancers, and individuals establish
                  a strong personal brand through custom design solutions that
                  reflect your unique identity and goals.
                </p>
                <ul className="text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-user-circle text-indigo-600 mr-3 text-lg"></i>
                    Personal branding packages
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-palette text-indigo-600 mr-3 text-lg"></i>
                    Custom design solutions
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-laptop text-indigo-600 mr-3 text-lg"></i>
                    Portfolio websites
                  </li>
                </ul>
                <Button className="!rounded-button bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                  See Individual Solutions
                </Button>
              </div>
            </div>
            {/* Business Clients */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/02edea738684d189aca55f5b0ed1d6fb.jpg"
                  alt="Business Clients"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  For Businesses
                </h3>
                <p className="text-gray-600 mb-6">
                  We partner with companies of all sizes to develop
                  comprehensive brand identities, marketing materials, and
                  digital experiences that drive business growth.
                </p>
                <ul className="text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-building text-indigo-600 mr-3 text-lg"></i>
                    Corporate identity systems
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-bullhorn text-indigo-600 mr-3 text-lg"></i>
                    Marketing campaign materials
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe text-indigo-600 mr-3 text-lg"></i>
                    Website & app design
                  </li>
                </ul>
                <Button className="!rounded-button bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                  See Business Solutions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our recent projects and see how we've helped clients
              achieve their design goals.
            </p>
          </div>
          <Tabs defaultValue="all" className="w-full mb-12">
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger
                  value="all"
                  className="!rounded-button cursor-pointer whitespace-nowrap"
                >
                  All Projects
                </TabsTrigger>
                <TabsTrigger
                  value="graphic"
                  className="!rounded-button cursor-pointer whitespace-nowrap"
                >
                  Graphic Design
                </TabsTrigger>
                <TabsTrigger
                  value="product"
                  className="!rounded-button cursor-pointer whitespace-nowrap"
                >
                  Product Design
                </TabsTrigger>
                <TabsTrigger
                  value="uiux"
                  className="!rounded-button cursor-pointer whitespace-nowrap"
                >
                  UI/UX Design
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Portfolio Items */}
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/d0e6fb821e3c5341815d280f208e3b2d.jpg"
                  title="Tech Company Rebrand"
                  category="Graphic Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/b1c059443594d367695d8f9fadb3c71d.jpg"
                  title="Luxury Cosmetics Packaging"
                  category="Product Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/fa0386cca2174f2f89a779e2d00055d9.jpg"
                  title="E-commerce Website"
                  category="UI/UX Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/37e9a40e3b03468513708d821537b07a.jpg"
                  title="Music Festival Campaign"
                  category="Graphic Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/901900ff1caf2ddad022400710f44bdf.jpg"
                  title="Sports Team Merchandise"
                  category="Product Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/2b4c7d3e921fa81fb7e05d176a8902b4.jpg"
                  title="Banking App Interface"
                  category="UI/UX Design"
                />
              </div>
            </TabsContent>
            <TabsContent value="graphic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/e98ffcbf50c2eb7b487ddd495edda17c.jpg"
                  title="Tech Company Rebrand"
                  category="Graphic Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/c637a2d9bdb8940f4bff11daed5ec687.jpg"
                  title="Music Festival Campaign"
                  category="Graphic Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/69c734059e672e73dd4f6f3f1acf0a88.jpg"
                  title="Annual Report Design"
                  category="Graphic Design"
                />
              </div>
            </TabsContent>
            <TabsContent value="product">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/745a1e8af5c30843ddb8070f02215b4c.jpg"
                  title="Luxury Cosmetics Packaging"
                  category="Product Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/fd4ab9a62256ecbe9a229d5bacb2ddaa.jpg"
                  title="Sports Team Merchandise"
                  category="Product Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/569703b9b1df42783e0c4f550b1a627b.jpg"
                  title="Organic Food Packaging"
                  category="Product Design"
                />
              </div>
            </TabsContent>
            <TabsContent value="uiux">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/8521e81a78332b6612c87e8181b83498.jpg"
                  title="E-commerce Website"
                  category="UI/UX Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/a2cf5dde10892d193a979f204de8dcaa.jpg"
                  title="Banking App Interface"
                  category="UI/UX Design"
                />
                <PortfolioItem
                  image="https://public.readdy.ai/ai/img_res/e3f5f3d33e8985f953578918d2816166.jpg"
                  title="E-Learning Platform"
                  category="UI/UX Design"
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="text-center">
            <Button className="!rounded-button bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
              View All Projects
            </Button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://public.readdy.ai/ai/img_res/da90644c88564f07cab9a9ae92590622.jpg"
                alt="Our Team"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About TIF Design
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, TIF Design is a creative studio dedicated to
                delivering exceptional design solutions that help our clients
                stand out in today's competitive market.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team of experienced designers combines artistic vision with
                strategic thinking to create designs that not only look
                beautiful but also achieve business objectives.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-gray-600">
                    To empower businesses and individuals through innovative
                    design that communicates effectively and inspires action.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">
                    Our Vision
                  </h3>
                  <p className="text-gray-600">
                    To be the leading design studio known for creativity,
                    quality, and client satisfaction.
                  </p>
                </div>
              </div>
              <Button className="!rounded-button bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about working with TIF Design.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="TIF Design transformed our brand identity with a stunning logo and marketing materials that perfectly capture our company's vision."
              author="Sarah Johnson"
              company="Tech Innovations"
            />
            <TestimonialCard
              quote="The product packaging design they created for our new line exceeded our expectations and has significantly boosted our sales."
              author="Michael Chen"
              company="Organic Essentials"
            />
            <TestimonialCard
              quote="Working with TIF Design on our website redesign was a game-changer. The user experience is fantastic and our conversion rates have improved by 40%."
              author="Emma Rodriguez"
              company="Global Solutions"
            />
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Ready to start your design project? Contact us today for a
                consultation. We'd love to hear about your ideas and how we can
                help bring them to life.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt text-indigo-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Our Location
                    </h3>
                    <p className="text-gray-600">
                      123 Design Street, Creative District, CA 90210
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <i className="fas fa-envelope text-indigo-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email Us
                    </h3>
                    <p className="text-gray-600">info@tifdesign.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <i className="fas fa-phone-alt text-indigo-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Call Us
                    </h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <i className="fas fa-clock text-indigo-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  >
                    <i className="fab fa-facebook-f text-lg"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  >
                    <i className="fab fa-twitter text-lg"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  >
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  >
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  >
                    <i className="fab fa-behance text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            {...field}
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-[120px] border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="!rounded-button w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}

      <Footer />
      
    </div>
  );
};


const PortfolioItem = ({
  image,
  title,
  category,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-indigo-300">{category}</p>
        <Button
          variant="outline"
          className="!rounded-button mt-4 text-white border-white hover:bg-white/20 cursor-pointer whitespace-nowrap"
        >
          View Project
        </Button>
      </div>
    </div>
  );
};


const TestimonialCard = ({
  quote,
  author,
  company,
}) => {
  return (
    <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-indigo-600 mb-4">
        <i className="fas fa-quote-left text-3xl"></i>
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
          <i className="fas fa-user text-indigo-600"></i>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{author}</h4>
          <p className="text-gray-600">{company}</p>
        </div>
      </div>
    </Card>
  );
};

export default Home;
