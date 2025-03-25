'use client';
import React, { useEffect, useState, useRef, useCallback} from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layouts/navbar/com';
import Footer from '@/components/layouts/footer/com';
import SmoothScrollContainer from '@/components/barProgres';


export default function about() {
  return (
    <SmoothScrollContainer>
      <div className="min-h-screen bg-white overflow-hidden">      
        {/* Navbar */}
        <header className="border-b border-gray-100">
          <Navbar />
        </header>
        
        <main className="space-y-16 md:space-y-24">
          {/* content 1 */}
          <section className="">
          
          </section>
          
          {/*  content 2 */}
          <section className="container mx-auto px-4">
          
          </section>
          
          {/* content 3 */}
          <section>
           
          </section>

          {/* content 4 */}
          <section className="container mx-auto px-4">
         
          </section>
        </main>

        {/* Footer */}
        <div>
          <Footer/>
        </div>
      </div>
    </SmoothScrollContainer>
  );
}