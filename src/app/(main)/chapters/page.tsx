"use client";

import { GoogleMaps } from "@/components";
import React from "react";

const chapters = [
  {
    school: "University of Michigan",
    greekLetter: "Alpha",
    email: "ktp-board@umich.edu",
  },
  {
    school: "University of Pittsburgh",
    greekLetter: "Beta",
    email: "upittkappathetapi@gmail.com",
  },
  {
    school: "Rose-Hulman Institute of Technology",
    greekLetter: "Gamma",
    email: "veep.ktp.rose@gmail.com",
  },
  {
    school: "Syracuse University",
    greekLetter: "Delta",
    email: "ktpsyracuse@gmail.com",
  },
  {
    school: "University of Maryland",
    greekLetter: "Epsilon",
    email: "Kappa Theta Pi",
  },
  {
    school: "The College of New Jersey",
    greekLetter: "Zeta",
    email: "ktp@tcnj.edu",
  },
  {
    school: "University of North Carolina at Chapel Hill",
    greekLetter: "Eta",
    email: "markmaio@ad.unc.edu",
  },
  {
    school: "University of Chicago",
    greekLetter: "Theta",
    email: "uchicagoktp@gmail.com",
  },
  {
    school: "University of Texas at Austin",
    greekLetter: "Iota",
    email: "texaskappathetapi@gmail.com",
  },
  {
    school: "Northwestern University",
    greekLetter: "Kappa",
    email: "ktpnorthwestern@gmail.com",
  },
  {
    school: "Boston University",
    greekLetter: "Lambda",
    email: "ktpbostonu@gmail.com",
  },
  {
    school: "University of Texas at Dallas",
    greekLetter: "Mu",
    email: "kappathetapiutd@gmail.com",
  },
  {
    school: "University of Colorado Boulder",
    greekLetter: "Nu",
    email: "ktp@colorado.edu",
  },
  {
    school: "Vanderbilt University",
    greekLetter: "Rho",
    email: "ktp@vanderbilt.edu",
  },
  {
    school: "University of Miami",
    greekLetter: "Sigma",
    email: "ktp@miami.edu",
  },
  {
    school: "University of Southern California",
    greekLetter: "Tau",
    email: "ktpusc@usc.edu",
  },
  {
    school: "Lewis University",
    greekLetter: "Upsilon",
    email: "nlange2021@gmail.com",
  },
  {
    school: "University of Georgia",
    greekLetter: "Phi",
    email: "uga.ktp@gmail.com",
  },
  {
    school: "Nova Southeastern University",
    greekLetter: "Chi",
    email: "kappathetapi@clubs.nova.edu",
  },
  {
    school: "Cameron University",
    greekLetter: "Psi",
    email: "ktp.cameron@gmail.com",
  },
  {
    school: "Northeastern University",
    greekLetter: "Omega",
    email: "ktp.northeastern@gmail.com",
  },
  {
    school: "University of Central Arkansas",
    greekLetter: "Alpha Alpha",
    email: "ktpuca@gmail.com",
  },
  {
    school: "New Brunswick (Rutgers University)",
    greekLetter: "Alpha Beta",
    email: "ktpnewbrunswick@gmail.com",
  },
  {
    school: "Virginia Polytechnic and State University",
    greekLetter: "Alpha Gamma",
    email: "ktpatvt@gmail.com",
  },
];

const ChaptersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10">
        Chapters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transform transition-transform hover:scale-105 text-center"
          >
            <img
              src={`/assets/college-logos/${chapter.school
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "")}.webp`}
              alt={`${chapter.school} logo`}
              className="mx-auto mb-4 h-20 w-20 object-contain"
            />
            <h2 className="text-xl font-semibold text-navy-blue mb-2">
              {chapter.school}
            </h2>
            <p className="text-sm text-gray-500">
              Greek Letter:{" "}
              <span className="font-medium">{chapter.greekLetter}</span>
            </p>
            <a
              href={`mailto:${chapter.email}`}
              className="text-sm text-medium-blue underline hover:text-light-blue mt-2 block"
            >
              Contact Chapter
            </a>
          </div>
        ))}
      </div>
      <section className="mb-16 md:mb-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#234c8b]">
          Our Chapters Map
        </h2>
        <GoogleMaps />
      </section>
    </div>
  );
};

ChaptersPage.displayName = "ChaptersPage";
export default ChaptersPage;
