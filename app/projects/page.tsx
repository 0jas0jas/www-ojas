import { title } from "@/components/primitives";
import { ProjectCard } from "@/components/projectCard";
import { Divider } from "@nextui-org/divider";

export default function ProjectsPage() {
  const projectData = [
    {
      projectName: "Popcorn",
      skills: "React, Python, NextJs, Scikit-learn",
      monthYear: "Apr. 2024",
      url: "https://github.com/0jas0jas/popcorn",
      desc: `Built a Next.js app that matches your Spotify playlists with movie recommendations. Collected over 10,000 songs and movies by web scraping and trained a machine learning model that got an 85% accuracy rate.`,
    },
    {
      projectName: "LiteraLingo",
      skills: "React, Docker, PostgreSQL, Prisma",
      monthYear: "Aug. 2024",
      url: "https://github.com/0jas0jas/literalingo",
      desc: `Developed an app with Hack4Impact to help autistic children learn English. Utilized React for UI, Prisma for database management, and Docker for deployment. Designed an adaptive platform for neurodiverse learners.`,
    },
    {
      projectName: "Where’s My Jam?",
      skills: "Next.js, FastAPI, Python",
      monthYear: "Nov. 2024",
      url: "https://github.com/0jas0jas/wheres-my-jam",
      desc: `Developed a gamified grocery app with four interactive modes, enhancing user engagement. Implemented a health-tracking system and recipe suggestions using barcode scanning. Leveraged Next.js for frontend, FastAPI for backend, and Python for functionality.`,
    },
    {
      projectName: "McMayhem",
      skills: "Godot, GDScript",
      monthYear: "2024",
      url: "https://github.com/0jas0jas/mcmayhem",
      desc: `Completed a 48-hour GameJam with a 3-member team, reconfiguring 10+ 3D models. Achieved recognition as one of the top 5 games out of 50 entries.`,
    },
    {
      projectName: "Conway’s Game of Life",
      skills: "JavaScript, HTML/CSS",
      monthYear: "2023",
      url: "https://github.com/0jas0jas/conways-game-of-life",
      desc: `Implemented a mathematical simulation using Vanilla JavaScript, developing a 3-dimensional data structure and enhancing performance by 20%.`,
    },
    {
      projectName: "Mon Cahier",
      skills: "GoLang, JavaScript, Web Development",
      monthYear: "2023",
      url: "https://github.com/0jas0jas/mon-cahier",
      desc: `Developed a blog on Computer Science and Mathematics, attracting over 1,000 monthly readers. Published 15+ articles and deployed using Hugo static site generator.`,
    },
    {
      projectName: "Can Computer Vision be Trusted with Autonomous Vehicles yet?",
      skills: "Python, OpenCV",
      monthYear: "2022",
      url: "https://github.com/0jas0jas/computer-vision-autonomous-vehicles",
      desc: `Implemented a real-time Computer Vision system with 95% detection accuracy, achieving an A-grade for a Cambridge International Project Qualification.`,
    },
    {
      projectName: "ChatBot with Python Workshop",
      skills: "Python, Pytz, Chatterbot",
      monthYear: "2023",
      url: "https://github.com/0jas0jas/chatbot-workshop",
      desc: `Developed an AI ChatBot using Python, handling 1,000+ queries and trained for specialized interactions. Conducted a workshop with 50+ participants.`,
    },
    {
      projectName: "YouTube Comment Analyzer",
      skills: "Python, NumPy, pandas",
      monthYear: "2023",
      url: "https://github.com/0jas0jas/youtube-comment-analyzer",
      desc: `Developed a classification model for YouTube comment analysis, achieving 86.7% accuracy using a dataset with over 1 million comments.`,
    },
    {
      projectName: "TrieApplication",
      skills: "JavaScript, Axios, Figlet",
      monthYear: "2023",
      url: "https://github.com/0jas0jas/trie-application",
      desc: `Developed a custom trie data structure for search applications, handling 10,000+ entries, with efficient data retrieval methods.`,
    },
    {
      projectName: "ChordsIdentifier",
      skills: "JavaScript, HTML/CSS, Google Teachable Machine",
      monthYear: "2023",
      url: "https://github.com/0jas0jas/chords-identifier",
      desc: `Created a classification model for guitar chord detection, achieving 80% accuracy. Won the NeoHacks hackathon for innovative use of ML.`,
    },
  ];

  return (
    <div>
      <h1 className={title()}>Things I've Made</h1>
      <Divider />
      <div className="h-24"></div>
      <div className="grid grid-cols-1 gap-8">
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            projectName={project.projectName}
            skills={project.skills}
            monthYear={project.monthYear}
            url={project.url}
            desc={project.desc}
          />
        ))}
      </div>
    </div>
  );
}
