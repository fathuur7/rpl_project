import React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Dribbble 
} from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long"}),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const formItemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const iconBoxVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const ContactSection = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    // In a real application, you would send this data to your server
  }

  return (
    <motion.section 
      className="py-20 bg-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={itemVariants}
            >
              Ready to start your design project? Contact us today for a
              consultation. We&apos;d love to hear about your ideas and how we can
              help bring them to life.
            </motion.p>
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="bg-indigo-100 p-3 rounded-full mr-4"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <MapPin className="text-indigo-600" size={20} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Our Location
                  </h3>
                  <p className="text-gray-600">
                    123 Design Street, Creative District, CA 90210
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="bg-indigo-100 p-3 rounded-full mr-4"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Mail className="text-indigo-600" size={20} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Email Us
                  </h3>
                  <p className="text-gray-600">info@designtify.com</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="bg-indigo-100 p-3 rounded-full mr-4"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Phone className="text-indigo-600" size={20} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Call Us
                  </h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="bg-indigo-100 p-3 rounded-full mr-4"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Clock className="text-indigo-600" size={20} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="mt-8"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Follow Us
              </h3>
              <motion.div 
                className="flex space-x-4"
                variants={containerVariants}
              >
                <motion.a
                  href="#"
                  className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
                  variants={iconBoxVariants}
                  whileHover="hover"
                >
                  <Dribbble size={20} />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              delay: 0.3 
            }}
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
            }}
          >
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Send Us a Message
            </motion.h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <motion.div
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
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
                </motion.div>
                <motion.div
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.7 }}
                >
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
                </motion.div>
                <motion.div
                  variants={formItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.8 }}
                >
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="rounded-button w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;