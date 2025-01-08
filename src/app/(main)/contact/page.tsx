import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-navy-blue mb-8">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Have questions or want to get in touch? Use the form below, or reach
          out to us directly!
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-navy-blue mb-4">
              Contact Information
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Feel free to reach out via email or social media. We’d love to
              hear from you!
            </p>
            <ul className="space-y-4">
              <li>
                <span className="font-medium text-gray-800">Email:</span>{" "}
                <a
                  href="mailto:contact@kappathetapi.org"
                  className="text-medium-blue underline hover:text-light-blue"
                >
                  contact@kappathetapi.org
                </a>
              </li>
              <li>
                <span className="font-medium text-gray-800">Instagram:</span>{" "}
                <a
                  href="https://www.instagram.com/ktpnational"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium-blue underline hover:text-light-blue"
                >
                  @ktpnational
                </a>
              </li>
              <li>
                <span className="font-medium text-gray-800">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/company/kappa-theta-pi-national/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium-blue underline hover:text-light-blue"
                >
                  Kappa Theta Pi National
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-navy-blue mb-4">
              Send Us a Message
            </h2>
            <form
              action="mailto:contact@kappathetapi.org"
              method="POST"
              encType="text/plain"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 mb-2"
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
                  className="block text-sm font-medium text-gray-800 mb-2"
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
                  className="block text-sm font-medium text-gray-800 mb-2"
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
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-blue text-white py-3 px-6 rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactPage.displayName = "ContactPage";
export default ContactPage;
