"use client";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";

export function NoteCard() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl py-20 sm:px-6 lg:px-8">
        {/* <Card className="p-8 bg-white"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image placeholders */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Small images */}
            <div className="space-y-4 md:w-[208px] w-full">
              <div className="h-[140px] rounded overflow-hidden">
                <img
                  src="/images/image2.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[140px] rounded overflow-hidden">
                <img
                  src="/images/image3.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Big image */}
            <div className="h-[298px] w-full md:w-[298px] rounded overflow-hidden">
              <img
                src="/images/image1.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
              ISA ACADEMY. Кемп хөтөлбөр.
            </h1>

            <div>
              <p>16 өдрийн турш өглөө, орой эрчимжүүлсэн бэлтгэл</p>
              <p>ISA Academy-ийн мэргэжлийн дасгалжуулагчтай бэлтгэл</p>
              <p>Олон улсын ISA Academy-ийн сертификат</p>
              <p>Хэзээ ч мартагдахгүй гайхалтай дурсамж бүтээх боломжтой</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/camps")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium"
              >
                Дэлгэрэнгүй
              </Button>
              <Button
                onClick={() => router.push("/contact")}
                variant="outline"
                className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-medium bg-transparent"
              >
                Холбоо барих
              </Button>
            </div>
          </div>
        </div>
        {/* </Card> */}
      </div>
    </section>
  );
}
