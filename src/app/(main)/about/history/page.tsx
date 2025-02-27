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
            Hi, my name is <strong>Zoey Lee</strong>, and I’m honored to serve
            as the inaugural President of the KTP National Organization. It’s a
            privilege to work alongside a dedicated team of board members—
            Tommy, Anjali, Nate, Kairavi, Emily, Makayla, Pranav and
            Beatriz—each a leader and pillar within their respective local
            chapters.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            As KTP grew, several local leaders recognized the need for an
            overarching body to guide new chapter development and strengthen the
            bonds between existing chapters. From this realization, the KTP
            National Organization was born.
          </p>
          <h3 className="text-xl font-semibold text-navy-blue mb-4">
            In Our Inaugural Year, Our Goals Include:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6">
            <li>Upholding the five KTP pillars in every local chapter.</li>
            <li>
              Developing a community platform to foster inter-chapter
              communication.
            </li>
            <li>
              Building a comprehensive KTP National Organization website to
              share our mission, highlight our chapters, facilitate new chapter
              inquiries, and feature our sponsors.
            </li>
            <li>
              Updating the KTP National Constitution to better support our
              mission.
            </li>
            <li>Appointing a board of directors aligned with KTP’s values.</li>
          </ul>
          <p className="text-sm text-gray-600 mb-6">
            By striving toward these objectives, we will create a strong
            foundation for KTP’s future endeavors and ensure that our community
            continues to thrive. With over 30+ chapters and growing, the future
            of KTP is bright. I look forward to seeing everything we accomplish
            together!
          </p>
          <p className="text-sm text-gray-600 font-semibold">Best,</p>
          <p className="text-sm text-gray-600 font-semibold">Zoey Lee</p>
        </div>
      </div>
    </div>
  );
};

AboutHistoryPage.displayName = "AboutHistoryPage";
export default AboutHistoryPage;
