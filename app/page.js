import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex p-48 pt-6 bg-[url('/bg.png')]">
      <section className="grid grid-cols-4 gap-3 w-screen">
        <div className="flex flex-col gap-1 col-span-4 row-span-1 items-center">
          <div className="p-4 pt-2 pb-2 transition fixed flex flex-row w-96 h-14 rounded-full backdrop-blur-sm backdrop-brightness-150 bg-opacity-70 bg-[#525252]">
            <div className="w-full flex flex-row h-full rounded-full hover:shadow-2xl hover:text-[14px] ease-linear duration-200 text-center"> <p className="m-auto">projects.</p> </div>
            <div className="w-full flex flex-row h-full bg-[#171719] rounded-full hover:shadow-2xl hover:text-[14px] hover:bg-[#121212] ease-linear duration-200 text-center"> <p className="m-auto">ojas.</p> </div>
            <div className="w-full flex flex-row h-full rounded-full hover:shadow-2xl hover:text-[14px] ease-linear duration-200 text-center "> <p className="m-auto">mon cahier.</p> </div>
          </div>
        </div>
        <div className="flex w-96 h-16  flex-col gap-1 col-span-4 row-span-1 items-center">
        </div>

        <div className="p-12 tracking-widest bg-[#151515] rounded-[12px] flex flex-col gap-1 col-span-2 row-span-3">
          <Image src="/profile.JPG" alt="Ojas Srivastava" width={200} height={200} className="rounded-full object-none bg-[59%_-4px]" ></Image>
          <p className="text-[45px] font-black">ojas srivastava is 
                                      <span className="text-[28px] text-gray-400 font-bold"> pursuing his bachelor's of science
                                      in mathematics and computer science from McGill University and is an aspiring</span> research scientist. </p>
        </div>
        <div className="p-12 bg-[url('/calcy.JPG')] bg-cover rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <span className="text-[28px] font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">i love calculators.</span>
        </div>
        <div className="p-12 bg-[#151515] group hover:bg-[#E5E5E5] rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <span className="text-[28px] text-left group-hover:text-[#151515] font-black">explore my digital garden.</span>
        </div>
        <div className="p-12 bg-[#151515] group hover:bg-[#E5E5E5] rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <p className="text-[28px] text-left font-black group-hover:text-[#151515]">things i've created<span className="text-[16px]"></span></p>
        </div>
        <div className="p-12 bg-[url('/2.JPG')] bg-cover rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <span className="text-[28px] font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">i love hosting hackathons.</span>
        </div>
        <div className="p-12 bg-[url('/montreal.jpg')] bg-cover rounded-[12px] flex flex-col gap-1 col-span-2 row-span-1">
          <span className="text-[48px] text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)] font-black m-auto">the where.</span>
          <span className="text-[20px] font-bold m-auto shadow-2xl hover: hover:shadow-none transition ease-linear duration-100  rounded-full p-6 bg-[#000000]">Montréal, QC</span>
        </div>
        <div className="flex flex-col gap-1 col-span-4 row-span-1 items-center">
          <div className="p-4 pt-2 pb-2 transition flex flex-row w-full h-20 rounded-2xl backdrop-blur-sm backdrop-brightness-150 bg-opacity-70 bg-[#525252]">
            <div className="w-full flex flex-row h-full rounded-2xl hover:bg-[#171719] hover:shadow-2xl text-[20px] hover:text-[18px] ease-linear duration-200 text-center font-black"> <p className="m-auto">github.</p> </div>
            <div className="w-full flex flex-row h-full rounded-2xl hover:bg-[#171719] hover:shadow-2xl text-[20px] hover:text-[18px] ease-linear duration-200 text-center font-black"> <p className="m-auto">email.</p> </div>
            <div className="w-full flex flex-row h-full rounded-2xl hover:bg-[#171719] hover:shadow-2xl text-[20px] hover:text-[18px] ease-linear duration-200 text-center font-black"> <p className="m-auto">linkedin.</p> </div>
          </div>
        </div>
        <div className="p-12 bg-[url('/calcy.JPG')] bg-cover rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <span className="text-[28px] font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">i love calculators.</span>
        </div>
        <div className="p-12 bg-[#151515] group hover:bg-[#E5E5E5] rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <span className="text-[28px] text-left group-hover:text-[#151515] font-black">explore my digital garden.</span>
        </div>
        <div className="p-12 tracking-widest bg-[#151515] rounded-[12px] flex flex-col gap-1 col-span-2 row-span-2">
          <p className="text-[55px] font-black">paulo coelho </p>
          <span className="text-[35px] text-gray-400 font-bold"> when you want something, all the universe conspires in helping you to achieve it.</span>
        </div>
        <div className="p-12 bg-[#151515] group hover:bg-[#E5E5E5] rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <p className="text-[28px] text-left font-black group-hover:text-[#151515]">things i've created<span className="text-[16px]"></span></p>
        </div>
        <div className="p-12 bg-[url('/2.JPG')] bg-cover rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1">
          <span className="text-[28px] font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">i love hosting hackathons.</span>
        </div>
        <div className="p-12 bg-[url('/montreal.jpg')] bg-cover rounded-[12px] flex flex-col gap-1 col-span-2 row-span-1">
          <span className="text-[48px] text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)] font-black m-auto">the where.</span>
          <span className="text-[20px] font-bold m-auto shadow-2xl hover: hover:shadow-none transition ease-linear duration-100  rounded-full p-6 bg-[#000000]">Montréal, QC</span>
        </div>

      </section>
    </main>
  )
}
