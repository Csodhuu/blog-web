import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";

export function NoteCard() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4  max-w-6xl  py-20 sm:px-6 lg:px-8">
        <Card className="p-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Image placeholders */}
            <div className="flex flex-col md:flex-row  gap-4">
              <div className=" rounded space-y-4 ">
                <div className="bg-gray-500 md:w-[208px] w-full h-[140px] rounded"></div>
                <div className="bg-gray-500 md:w-[208px] w-full h-[140px] rounded"></div>
              </div>
              <div className="bg-gray-500  h-[298px] w-[298px] rounded"></div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                Stay Connected. Stay Active. Play Hard.
              </h1>

              <p className="text-gray-700 text-lg leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry s Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry s
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium">
                  Дэлгэрэнгүй
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-medium bg-transparent"
                >
                  Холбоо барих
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
