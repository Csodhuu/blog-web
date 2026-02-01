import Image from "next/image";
import Frame from "../../../public/Frame.png";

export function HeroSection() {
  return (
    <section className="w-full">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* LEFT */}
          <div className="w-full">
            <h1 className="text-[172px] uppercase font-bold leading-[0.7] tracking-[-0.04em]">
              аялал
            </h1>

            <div className="text-[47px] uppercase font-bold leading-[1] tracking-[-0.01em] text-red-500 ">
              олон улсын тэмцээн
            </div>

            <div className="text-[80px] uppercase font-bold leading-[0.7] tracking-[-0.01em]">
              бүгд нэг дор
            </div>

            <p className="text-justify mt-6 text-lg leading-7 tracking-[-0.01em] pr-[52px]">
              Мэргэжлийн спортын аялал, тэмцээний логистик, боловсролын
              зөвлөгөө, олон улсын тамирчны боломжууд бүгд нэг дор найдвартай
              үйлчилгээнд.
            </p>
          </div>

          {/* RIGHT */}
          {/* RIGHT */}
          <div className="w-full">
            <div className="relative w-full aspect-[776/706]">
              <Image
                src={Frame}
                alt="hero"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
