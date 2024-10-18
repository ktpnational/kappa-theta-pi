'use client';

import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '../ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#234c8b] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="hover:text-[#8BB9FF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/chapters" className="hover:text-[#8BB9FF] transition-colors">
                  Chapters
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-[#8BB9FF] transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8BB9FF] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/company-portal" className="hover:text-[#8BB9FF] transition-colors">
                  Company Portal
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8BB9FF] transition-colors">
                  Student Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#8BB9FF] transition-colors">
                  New Company Interest Form
                </Link>
              </li>
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
              <a
                href="https://www.instagram.com/ktpnational?igsh=MWJkcGt2dDN1NHRzNQ=="
                className="hover:text-[#8BB9FF] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/kappa-theta-pi-national/"
                className="hover:text-[#8BB9FF] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p>
            &copy; {new Date().getFullYear()} Kappa Theta Pi National Technology Fraternity. All
            rights reserved.
          </p>
          <div className="mt-4 space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-white hover:text-[#8BB9FF]">
                  Terms of Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Terms of Service</DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto">
                  <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
                  <p className="mb-4">
                    By accessing and using the Kappa Theta Pi website, you agree to be bound by
                    these Terms of Service and all applicable laws and regulations. If you do not
                    agree with any part of these terms, you may not use our website.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">2. Use License</h2>
                  <p className="mb-4">
                    Permission is granted to temporarily download one copy of the materials on Kappa
                    Theta Pi's website for personal, non-commercial transitory viewing only. This is
                    the grant of a license, not a transfer of title.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">3. Disclaimer</h2>
                  <p className="mb-4">
                    The materials on Kappa Theta Pi's website are provided on an 'as is' basis.
                    Kappa Theta Pi makes no warranties, expressed or implied, and hereby disclaims
                    and negates all other warranties including, without limitation, implied
                    warranties or conditions of merchantability, fitness for a particular purpose,
                    or non-infringement of intellectual property or other violation of rights.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">4. Limitations</h2>
                  <p className="mb-4">
                    In no event shall Kappa Theta Pi or its suppliers be liable for any damages
                    (including, without limitation, damages for loss of data or profit, or due to
                    business interruption) arising out of the use or inability to use the materials
                    on Kappa Theta Pi's website.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">5. Revisions and Errata</h2>
                  <p className="mb-4">
                    The materials appearing on Kappa Theta Pi's website could include technical,
                    typographical, or photographic errors. Kappa Theta Pi does not warrant that any
                    of the materials on its website are accurate, complete or current.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">6. Links</h2>
                  <p className="mb-4">
                    Kappa Theta Pi has not reviewed all of the sites linked to its website and is
                    not responsible for the contents of any such linked site. The inclusion of any
                    link does not imply endorsement by Kappa Theta Pi of the site. Use of any such
                    linked website is at the user's own risk.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">7. Modifications</h2>
                  <p className="mb-4">
                    Kappa Theta Pi may revise these terms of service for its website at any time
                    without notice. By using this website you are agreeing to be bound by the then
                    current version of these Terms of Service.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">8. Governing Law</h2>
                  <p>
                    These terms and conditions are governed by and construed in accordance with the
                    laws of [Your State/Country] and you irrevocably submit to the exclusive
                    jurisdiction of the courts in that State or location.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-white hover:text-[#8BB9FF]">
                  Privacy Policy
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Privacy Policy</DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto">
                  <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
                  <p className="mb-4">
                    We collect information you provide directly to us, such as when you create an
                    account, submit a form, or communicate with us. This may include your name,
                    email address, phone number, and any other information you choose to provide.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
                  <p className="mb-4">
                    We use the information we collect to operate, maintain, and improve our website,
                    to process your requests, to send you administrative information, and to
                    communicate with you about Kappa Theta Pi events, services, and opportunities.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">
                    3. Information Sharing and Disclosure
                  </h2>
                  <p className="mb-4">
                    We do not share, sell, rent or trade your personal information with third
                    parties for their commercial purposes. We may disclose your information if
                    required by law or if we believe that such action is necessary to comply with
                    legal processes or protect the rights, property, or safety of Kappa Theta Pi,
                    its members, or others.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">4. Data Security</h2>
                  <p className="mb-4">
                    We use reasonable measures to help protect information about you from loss,
                    theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    However, no internet or email transmission is ever fully secure or error free.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">5. Your Choices</h2>
                  <p className="mb-4">
                    You may update, correct or delete your account information at any time by
                    logging into your online account or by contacting us. You may also opt out of
                    receiving promotional communications from us by following the instructions in
                    those messages.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">6. Changes to this Policy</h2>
                  <p className="mb-4">
                    We may change this privacy policy from time to time. If we make changes, we will
                    notify you by revising the date at the top of the policy and, in some cases, we
                    may provide you with additional notice.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">7. Contact Us</h2>
                  <p>
                    If you have any questions about this privacy policy, please contact us at:
                    privacy@kappathetapi.org
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-white hover:text-[#8BB9FF]">
                  Copyright Notice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Copyright Notice</DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto">
                  <p className="mb-4">
                    © {new Date().getFullYear()} Kappa Theta Pi National Technology Fraternity. All
                    rights reserved.
                  </p>

                  <p className="mb-4">
                    All content on this website, including but not limited to text, graphics, logos,
                    button icons, images, audio clips, digital downloads, data compilations, and
                    software, is the property of Kappa Theta Pi or its content suppliers and
                    protected by United States and international copyright laws.
                  </p>

                  <p className="mb-4">
                    The compilation of all content on this site is the exclusive property of Kappa
                    Theta Pi and protected by U.S. and international copyright laws. All software
                    used on this site is the property of Kappa Theta Pi or its software suppliers
                    and protected by United States and international copyright laws.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">Use of Content</h2>
                  <p className="mb-4">
                    You may not use, reproduce, distribute, perform, publicly display, or prepare
                    derivative works based on any of the content found on this website without prior
                    written consent from Kappa Theta Pi.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">Trademarks</h2>
                  <p className="mb-4">
                    Kappa Theta Pi's name, logo, and all related names, logos, product and service
                    names, designs, and slogans are trademarks of Kappa Theta Pi or its affiliates.
                    You may not use such marks without the prior written permission of Kappa Theta
                    Pi.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">Copyright Infringement</h2>
                  <p className="mb-4">
                    If you believe that any content on this site infringes upon your copyright,
                    please notify us immediately. We will respond to notices of alleged copyright
                    infringement that comply with applicable law.
                  </p>

                  <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                  <p>
                    If you have any questions about this Copyright Notice, please contact us at:
                    copyright@kappathetapi.org
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
};
