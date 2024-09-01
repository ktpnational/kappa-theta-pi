'use client'

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Users, BookOpen, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] overflow-hidden">
      {/* Blob shapes */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#6246ea] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#d1d1e9] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-[#e45858] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <header className="relative z-10 p-4 flex justify-between items-center bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <div className="flex items-center space-x-2">
          <Image src="/placeholder.svg?height=50&width=50" alt="ΚΘΠ Logo" width={50} height={50} />
          <span className="text-2xl font-bold text-[#2b2c34]">Kappa Theta Pi</span>
        </div>
        <nav className="space-x-4">
          <Button variant="ghost">About Us</Button>
          <Button variant="ghost">Chapters</Button>
          <Button variant="ghost">Members</Button>
          <Button variant="ghost">Nationals</Button>
          <Button variant="default" className="bg-[#6246ea] text-white hover:bg-[#5b3fd4]">Member Login</Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-[#2b2c34]">Kappa Theta Pi National Portal</h1>
          <p className="text-xl mb-8 text-[#2b2c34]">Uniting tech enthusiasts and future innovators across the nation</p>
          <div className="flex justify-center space-x-6">
            <Button size="lg" className="bg-[#6246ea] text-white hover:bg-[#5b3fd4]">Join Kappa Theta Pi</Button>
            <Button size="lg" variant="outline" className="border-[#6246ea] text-[#6246ea] hover:bg-[#6246ea] hover:text-white">Explore Our Chapters</Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Search className="w-8 h-8 text-[#6246ea] mr-4" />
                <h2 className="text-2xl font-semibold text-[#2b2c34]">Member Database</h2>
              </div>
              <p className="mb-6 text-[#2b2c34]">Access our comprehensive database of Kappa Theta Pi members from all chapters. Connect with tech leaders across the country.</p>
              <div className="flex space-x-2">
                <Input placeholder="Search ΚΘΠ members..." className="flex-grow" />
                <Button className="bg-[#6246ea] text-white hover:bg-[#5b3fd4]">Search</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-[#e45858] mr-4" />
                <h2 className="text-2xl font-semibold text-[#2b2c34]">Chapter Resources</h2>
              </div>
              <p className="mb-6 text-[#2b2c34]">Find and share resources with other Kappa Theta Pi chapters nationwide. Access event planning tools, fundraising ideas, and more.</p>
              <Button className="w-full bg-[#e45858] text-white hover:bg-[#d14d4d]">Access ΚΘΠ Resources</Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#2b2c34]">Our Kappa Theta Pi Network</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Alpha', 'Beta', 'Gamma', 'Delta'].map((chapter, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={`/placeholder.svg?height=300&width=300&text=ΚΘΠ+${chapter}`} alt={`ΚΘΠ ${chapter} Chapter`} layout="fill" objectFit="cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#2b2c34]">ΚΘΠ {chapter} Chapter</h3>
                  <p className="text-sm text-[#2b2c34]">University Name</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-[#2b2c34]">Join Kappa Theta Pi</h2>
          <p className="text-xl mb-8 text-[#2b2c34]">Be part of the premier national technology fraternity and shape the future of tech with Kappa Theta Pi</p>
          <Button size="lg" className="bg-[#6246ea] text-white hover:bg-[#5b3fd4]">Apply to ΚΘΠ Now</Button>
        </section>

        <section className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#2b2c34]">Upcoming Kappa Theta Pi Events</h2>
          <ul className="space-y-4">
            {['ΚΘΠ Annual Tech Conference', 'Kappa Theta Pi Leadership Summit', 'ΚΘΠ Hackathon 2023', 'Kappa Theta Pi Alumni Networking Night'].map((event, index) => (
              <li key={index} className="flex items-center">
                <Globe className="w-6 h-6 text-[#6246ea] mr-4" />
                <span className="text-[#2b2c34]">{event}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="relative z-10 bg-[#2b2c34] text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#d1d1e9]">About Kappa Theta Pi</a></li>
              <li><a href="#" className="hover:text-[#d1d1e9]">ΚΘΠ Chapters</a></li>
              <li><a href="#" className="hover:text-[#d1d1e9]">ΚΘΠ Members</a></li>
              <li><a href="#" className="hover:text-[#d1d1e9]">ΚΘΠ Nationals</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Kappa Theta Pi</h3>
            <p>Email: info@kappathetapi.org</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow ΚΘΠ</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#d1d1e9]"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-[#d1d1e9]"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="hover:text-[#d1d1e9]"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-[#d1d1e9]"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Kappa Theta Pi National Technology Fraternity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}