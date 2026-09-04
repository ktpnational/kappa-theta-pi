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
            A Message from the National President
          </h2>
          <h3 className="text-xl font-semibold text-navy-blue mb-4">
            Year Three: Scaling Excellence
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            I’m honored to lead Kappa Theta Pi as we enter our third year with over 800 members nationwide.
            What began as a vision for connecting technology professionals has grown into a thriving network
            that’s reshaping how emerging technologists develop, collaborate, and build their careers.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            KTP’s impact on my own trajectory has been profound. The brotherhood fostered a culture of
            technical excellence, resilience, and mutual growth that shaped not just my skills, but my
            mindset. That experience—being surrounded by people who challenge themselves and each other
            to excel—is what I want every KTP member, across every chapter, to experience. Because when
            technologists grow together, the entire industry benefits.
          </p>
          <h3 className="text-xl font-semibold text-navy-blue mb-4">
            Our Strategic Priorities for This Year
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6">
            <li>
              <strong>Strengthen our foundation:</strong> We’re doubling down on adherence to KTP’s five
              pillars across all chapters. Consistency in our values isn’t bureaucracy—it’s how we ensure
              every member, across the country, receives the same caliber of experience.
            </li>
            <li>
              <strong>Build cross-chapter momentum:</strong> Geographic boundaries shouldn’t limit
              collaboration. We’re creating infrastructure that enables members to connect, share knowledge,
              and work together regardless of location—turning 800+ individuals into a unified national community.
            </li>
            <li>
              <strong>Maintain operational rigor:</strong> Our Constitution exists for a reason. By ensuring
              all chapters follow established governance standards, we create stability and trust that allows
              us to scale without losing our identity.
            </li>
            <li>
              <strong>Expand career pathways:</strong> We’re actively bridging students with alumni and
              industry professionals. We are currently in talks with multiple companies for strategic
              partnerships and sponsorships. Through strategic partnerships and direct access to meaningful
              opportunities across tech sectors, we’re opening doors that matter.
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-navy-blue mb-4">
            What Comes Next
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            We’re actively establishing new chapters at universities across the country, expanding access
            to KTP’s unique model. But growth isn’t the goal—impact is. We’re cultivating the next
            generation of technology leaders who will shape our industry. These aren’t just students
            accumulating credentials; they’re building the networks, skills, and mindset to create
            meaningful change.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            The energy across our chapters is undeniable. What we’re building together—a community where
            technical excellence, brotherhood, and career momentum reinforce each other—is rare. I’m
            energized by what’s ahead.
          </p>
          <p className="text-sm text-gray-600 font-semibold">Best,</p>
          <p className="text-sm text-gray-600 font-semibold">Siddhartha Paruchuri</p>
          <p className="text-sm text-gray-600 font-semibold">National President, Kappa Theta Pi</p>
        </div>
      </div>
    </div>
  );
};

AboutHistoryPage.displayName = "AboutHistoryPage";
export default AboutHistoryPage;
