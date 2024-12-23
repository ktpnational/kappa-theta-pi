import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-navy-blue mb-8">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Have questions or want to get in touch? Fill out the form below, or
          reach out to us directly!
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-navy-blue mb-4">
              Contact Information
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Feel free to reach out via email or social media. We’d love to
              hear from you!
            </p>
            <ul className="space-y-4">
              <li>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                <a
                  href="mailto:contact@ktp.org"
                  className="text-medium-blue underline hover:text-light-blue"
                >
                  contact@ktp.org
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-navy-blue mb-4">
              Send Us a Message
            </h2>
            <form action="#" method="POST">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md focus:ring-medium-blue focus:outline-none"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-medium-blue focus:outline-none"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:ring-medium-blue focus:outline-none"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-navy-blue text-white py-2 px-4 rounded-md hover:bg-medium-blue transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactPage.displayName = "ContactPage";
export default ContactPage;
