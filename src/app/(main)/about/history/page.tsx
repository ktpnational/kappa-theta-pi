import React from "react";

const AboutHistoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-navy-blue mb-8">
          About Us
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-navy-blue mb-4">
            A Message from the President
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Hi, my name is <strong>Shriya Srinivasan</strong>, and I’m excited to continue
            as the President of the KTP National Organization in our second year of operation. 
            Working with our talented board has been incredibly rewarding as we've tackled new 
            challenges and expanded our impact across the technology landscape.
            Building on the strong foundation established in our inaugural year, we've witnessed 
            remarkable growth as our community has expanded to over 800+ members nationwide. This 
            milestone reflects not only our reach but also the powerful impact KTP continues to have 
            in connecting technology professionals and fostering innovation across universities.
          </p>
          <h3 className="text-xl font-semibold text-navy-blue mb-4">
            As We Enter Our Second Year, Our Strategic Focus Areas Include:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6">
            <li>Strengthening adherence to the five KTP pillars across all local chapters to ensure
              consistency in our values and mission.</li>
            <li>
              Fostering cross-chapter collaboration to create a unified national community where 
              members can connect, share knowledge, and work together regardless of geographic boundaries.
            </li>
            <li>
              Launching exciting project opportunities, including our flagship KTP National Hackathon with 
              industry sponsors, providing members hands-on experience and networking opportunities.
            </li>
            <li>
              Maintaining operational excellence by ensuring all chapters follow our established KTP 
              Constitution for consistent governance and chapter management.
            </li>
            <li>Expanding career development initiatives by connecting chapters with industry contacts
              and opening pathways to meaningful job opportunities across various tech sectors.</li>
          </ul>
          <p className="text-sm text-gray-600 mb-6">
            With our momentum building, we're actively working to establish new chapters at universities across 
            the country, expanding access to KTP's unique blend of professional development and technical excellence. 
            We're focused on creating meaningful connections that transcend individual chapters by building bridges 
            between students, alumni, and industry professionals to create lasting impact in the tech community.
            The energy and passion I see across our chapters inspire me daily. Together, we're not just growing an organization; 
            we're cultivating the next generation of technology leaders who will shape our industry's future.
          </p>
          <p className="text-sm text-gray-600 font-semibold">Best,</p>
          <p className="text-sm text-gray-600 font-semibold">Shriya Srinivasan</p>
        </div>
      </div>
    </div>
  );
};

AboutHistoryPage.displayName = "AboutHistoryPage";
export default AboutHistoryPage;
