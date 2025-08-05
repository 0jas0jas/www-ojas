import { Link } from "@nextui-org/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { siteConfig } from "@/config/site";
import { SpotifyCard } from "@/components/spotifyCard";

export default function Home() {
  return (
    <section className="max-w-full h-fit-content gap-4 grid grid-cols-2 md:grid-cols-4 auto-rows-fr px-10 pb-20">
      <div className="col-span-2 row-span-1 rounded-2xl p-6 w-full h-full flex items-center justify-end pr-16" style={{backgroundImage: 'url(/media/pfp.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <h2 className="text-4xl font-bold">ojas</h2>
      </div>

      <div className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-end justify-center aspect-square" style={{backgroundImage: 'url(/hackathon.jpg)', backgroundSize: 'cover', backgroundPosition: 'right'}}>
        <h2 className="text-4xl font-bold text-center mix-blend-difference">i host hackathons</h2>
      </div>

      <a href="https://notebook.knowojas.com" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-center justify-center aspect-square" style={{backgroundColor: 'var(--bg-sec)'}}>
        <h2 className="text-3xl font-bold text-center">explore my digital garden</h2>
      </a>

      <div className="col-span-2 row-span-1 rounded-2xl p-6 w-full h-full flex flex-col items-start justify-center" style={{backgroundColor: 'var(--bg-ter)'}}>
        <h2 className="text-4xl font-bold text-left">bachelor's in mathematics and computer science at</h2>
        <h2 className="text-6xl font-bold text-left">mcgill university</h2>
      </div>

      <a href="https://knowojas.com/projects" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-center justify-center aspect-square" style={{backgroundColor: 'var(--bg-sec)'}}>
        <h2 className="text-4xl font-bold text-center">things i've made</h2>
      </a>

      <a href="https://letterboxd.com/f1shf1sh" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-start justify-center aspect-square relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url(/film.jpeg)', backgroundSize: 'cover', backgroundPosition: 'top'}}></div>
        <h2 className="text-2xl font-bold text-center text-white text-outline z-10">i LOVE films.</h2>
      </a>

      <a href="https://unsplash.com/@f1shf1sh" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-start justify-center aspect-square relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url(/sikkim.jpg)', backgroundSize: 'cover', backgroundPosition: 'top', filter: 'blur(3px)'}}></div>
        <h2 className="text-2xl font-bold text-center text-white text-outline z-10">look at my pictures</h2>
      </a>

      <a href="https://codeday.org" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl w-full h-full flex items-end justify-start aspect-square" style={{backgroundImage: 'url(/codeday.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex flex-col items-start justify-end w-fit-content bg-black/40 rounded-bl-2xl rounded-tr-2xl pb-2 pl-2 pr-4 pt-4 backdrop-blur-md">
          <img src="/media/codeday.svg" alt="CodeDay" className="max-w-[50px] max-h-[50px] rotate-45" />
        </div>
      </a>

      <div className="col-span-2 row-span-2 rounded-2xl w-full h-full flex items-end" style={{backgroundImage: 'url(/montreal.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex flex-col items-start justify-end w-full bg-white/40 rounded-b-2xl p-6 backdrop-blur-md">
          <h2 className="text-4xl text-[var(--bg-pri)] font-bold text-center">the where.</h2>
          <h2 className="text-4xl text-[var(--bg-pri)] font-bold text-center">montreal, QC</h2>
        </div>
      </div>

      <a href="https://nuclearapp.ca" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-center justify-center aspect-square" style={{backgroundColor: 'var(--bg-ter)'}}>
        <h2 className="text-4xl font-bold text-center">nuclear</h2>
      </a>

      <div className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-center justify-center aspect-square" style={{backgroundImage: 'url(/speed.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

      <a href="https://zcal.co/f1shf1sh/30min" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl w-full h-full flex items-center justify-center aspect-square" style={{backgroundImage: 'url(/tisme.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <h2 className="text-4xl font-bold text-center text-outline">let's meet (online)</h2>
      </a>

      <a href="mailto:ojas@knowojas.com" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl w-full h-full flex items-end justify-center aspect-square" style={{backgroundImage: 'url(/lucknow.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex flex-col items-center justify-center w-full bg-white/40 rounded-b-2xl p-2 backdrop-blur-md">
          <h2 className="text-4xl text-white font-bold text-center">email?</h2>
        </div>
      </a>

      <div className="col-span-2 row-span-1 rounded-2xl w-full h-full flex flex-col items-center justify-center" style={{backgroundColor: 'var(--accent)'}}>
        <SpotifyCard />
      </div>

      <div className="col-span-2 row-span-1 rounded-2xl p-6 w-full h-full flex flex-col items-start gap-4 justify-center" style={{backgroundColor: 'var(--bg-pri)'}}>
        <h2 className="text-4xl font-bold text-left text-[var(--accent)]">david lynch</h2>
        <h2 className="text-xl font-bold font-mono text-left text-[var(--accent)]">“everything i learned in my life, i learned because i decided to try something new.”</h2>
      </div>

      <a href="https://github.com/0jas0jas" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-center justify-center aspect-square" style={{backgroundColor: 'var(--bg-sec)'}}>
        <h2 className="text-4xl font-bold text-center">other stuff</h2>
      </a>

      <a href="https://f1shf1sh.itch.io/" target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl p-6 w-full h-full flex items-center justify-center aspect-square" style={{backgroundColor: 'var(--bg-ter)'}}>
        <h2 className="text-4xl font-bold text-center">games i've made</h2>
      </a>
      
    </section>
  );
}
