import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="max-w-full gap-4 grid grid-cols-4">
      <Card
        // isHoverable // Makes the card respond to hover events
        // isPressable // Allows for click or press actions on the card
        className="col-span-4 row-span-3 sm:col-span-2 p-12 " // Add custom styles via class names
      >
        <Image
          alt="Profile Picture"
          src="/profile.JPG"
          className="w-2/4 rounded-full shadow-lg"
        />

        <CardHeader className="font-regular text-3xl leading-loose tracking-wider">
          <h1>
            {" "}
            <span className="font-black text-6xl">ojas srivastava</span> is
            pursuing his bachlor's of science in mathematics and computer
            science from{" "}
            <span className="font-black text-6xl">McGill University</span>.
          </h1>
        </CardHeader>
      </Card>

      <Card
        className="col-span-4 row-span-1 content-center sm:col-span-1 p-4" // Add custom styles via class names
      >
        <div className="absolute inset-0 z-0">
          <Image
            // removeWrapper;
            src="/hackathon.JPG"
            alt="hackathons"
            className=" z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          />
        </div>

        <CardHeader className="text-4xl font-black text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h4>i host hackathons</h4>
        </CardHeader>
      </Card>

      <Card
        isHoverable // Makes the card respond to hover events
        isPressable // Allows for click or press actions on the card
        className="col-span-4 row-span-1 sm:col-span-1 p-4" // Add custom styles via class names
      >
        <Link href="https://0jas0jas.github.io/mon-cahier/">
          <CardHeader className="text-4xl font-black text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h4>explore my digital garden.🡕</h4>
          </CardHeader>
        </Link>
      </Card>

      <Card
        isHoverable // Makes the card respond to hover events
        isPressable // Allows for click or press actions on the card
        className="col-span-4 row-span-1 content-center sm:col-span-1 p-4 " // Add custom styles via class names
      >
        <Link href="/projects">
          <CardHeader className="text-4xl font-black text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h4>things i've made.</h4>
          </CardHeader>
        </Link>
      </Card>

      <Card
        className="col-span-4 row-span-1 sm:col-span-1 p-4" // Add custom styles via class names
      >
        <div className="absolute inset-0 z-0">
          <Image
            removeWrapper
            src="/film.jpeg"
            alt="hackathons"
            className=" z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          />
        </div>

        <CardHeader className="text-5xl font-black text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h4>i study films</h4>
        </CardHeader>
      </Card>

      <Card isFooterBlurred className="aspect-video col-span-4 sm:col-span-2">
        <Image
          removeWrapper
          alt="montreal"
          className="z-0 -translate-y-6 object-cover"
          src="/montreal.jpg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10">
          <div>
            <p className="text-black font-black text-2xl">the where.</p>
            <p className="text-black font-black text-4xl">Montréal, QC.</p>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
