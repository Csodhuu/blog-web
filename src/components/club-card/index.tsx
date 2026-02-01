/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Card } from "../ui/card";

export function ClubCard() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4  max-w-6xl  py-20 sm:px-6 lg:px-8">
        <p className="text-[40px] font-bold text-center">
          Бидний таньд санал болгож буй үйлчилгээнүүд
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <Card className=" bg-white rounded-none p-0 rounded-bl-[60px]">
            <div className="relative w-full h-[216px]">
              <Image
                src="/images/image2.jpg"
                alt="club"
                fill
                className="object-cover"
              />
            </div>

            <div className="text-center h-[98px] text-[25px] font-bold flex items-center justify-center ">
              Эрчимжүүлсэн бэлтгэл
            </div>
          </Card>
          <Card className=" bg-white rounded-none p-0 rounded-bl-[60px]">
            <div className="relative w-full h-[216px]">
              <Image
                src="/images/image1.jpg"
                alt="club"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center h-[98px] text-[25px] font-bold flex items-center justify-center ">
              Тэмцээн, уралдаан
            </div>
          </Card>
          <Card className=" bg-white rounded-none p-0 rounded-bl-[60px]">
            <div className="relative w-full h-[216px]">
              <Image
                src="/images/image3.jpg"
                alt="club"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center h-[98px] text-[25px] font-bold flex items-center justify-center ">
              Аялал
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
