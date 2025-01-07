import { title } from "@/components/primitives";
import { ProjectCard } from "@/components/projectCard";
import { Divider } from "@nextui-org/divider";

export default function AboutPage() {
  const descs = [
    `Built a Next.js app that matches your Spotify playlists with movie recommendations.
     Collected over 10,000 songs and movies by web scraping and trained a machine learning 
     model that got an 85% accuracy rate.`]
  return (
    <div>
      <h1 className={title()}>Things I've Made</h1>
      <Divider />
      <div className="h-24"></div>
      <div className="grid grid-col-1 gap-8">
        <ProjectCard projectName={"Popcorn"} skills={"React, Python, NextJs, Scikit-learn"} monthYear={"Apr. 2024"} url={"new tgubg"} desc={descs[0]} />
      </div>
    </div>
  );
}
