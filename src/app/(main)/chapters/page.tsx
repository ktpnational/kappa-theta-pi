import React from "react";

const chapters = [
  {
    school: "University of Michigan",
    greekLetter: "Alpha",
    date: "3/10/2012",
    website: "https://ktp-board@umich.edu",
  },
  {
    school: "University of Pittsburgh",
    greekLetter: "Beta",
    date: "11/1/2016",
    website: "mailto:uptktpalpha1@gmail.com",
  },
  {
    school: "Rose-Hulman Institute of Technology",
    greekLetter: "Gamma",
    date: "1/1/2016",
    website: "https://veep.ktp.rose",
  },
  {
    school: "Syracuse University",
    greekLetter: "Delta",
    date: "11/9/2017",
    website: "mailto:ktpsyraucse@gmail.com",
  },
  {
    school: "University of Maryland",
    greekLetter: "Epsilon",
    date: "3/1/2018",
    website: "mailto:ihkaprep@gmail.com",
  },
  {
    school: "The College of New Jersey",
    greekLetter: "Zeta",
    date: "1/1/2020",
    website: "mailto:wdaz61@tcnj.edu",
  },
  {
    school: "University of North Carolina at Chapel Hill",
    greekLetter: "Eta",
    date: "1/1/2020",
    website: "mailto:mariakajd@unc.edu",
  },
  {
    school: "University of Chicago",
    greekLetter: "Theta",
    date: "1/1/2020",
    website: "mailto:uchicago.ktp@gmail.com",
  },
  {
    school: "University of Texas at Austin",
    greekLetter: "Iota",
    date: "1/1/2020",
    website: "mailto:teaskapktpaustin@gmail.com",
  },
  {
    school: "Northwestern University",
    greekLetter: "Kappa",
    date: "1/1/2022",
    website: "mailto:ktpnorthwestern@gmail.com",
  },
  {
    school: "Boston University",
    greekLetter: "Lambda",
    date: "1/1/2023",
    website: "mailto:ktpbostonu@gmail.com",
  },
  {
    school: "University of Texas at Dallas",
    greekLetter: "Mu",
    date: "1/1/2023",
    website: "mailto:ktpdallasutd@gmail.com",
  },
  {
    school: "University of Colorado Boulder",
    greekLetter: "Nu",
    date: "3/1/2023",
    website: "mailto:ktp@colorado.edu",
  },
  {
    school: "Vanderbilt University",
    greekLetter: "Rho",
    date: "4/6/2023",
    website: "mailto:ktp@vanderbilt.edu",
  },
  {
    school: "University of Miami",
    greekLetter: "Sigma",
    date: "4/6/2023",
    website: "mailto:miav@miami.edu",
  },
  {
    school: "University of Southern California",
    greekLetter: "Tau",
    date: "4/6/2023",
    website: "mailto:ktpusc@usc.edu",
  },
  {
    school: "Lewis University",
    greekLetter: "Upsilon",
    date: "9/30/2024",
    website: "mailto:nlange2021@gmail.com",
  },
];

const ChaptersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10">
        Chapters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transform transition-transform hover:scale-105 text-center"
          >
            <h2 className="text-xl font-semibold text-navy-blue mb-2">
              {chapter.school}
            </h2>
            <p className="text-sm text-gray-500">
              Greek Letter:{" "}
              <span className="font-medium">{chapter.greekLetter}</span>
            </p>
            <p className="text-sm text-gray-400">
              Established: <span className="font-medium">{chapter.date}</span>
            </p>
            {chapter.website && (
              <a
                href={chapter.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-medium-blue underline hover:text-light-blue mt-2 block"
              >
                Visit Chapter Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

ChaptersPage.displayName = "ChaptersPage";
export default ChaptersPage;
