import { ChevronRight } from "lucide-react";

export function ClubCard() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4  max-w-6xl  py-20 sm:px-6 lg:px-8">
        <div className=" mx-auto bg-indigo-900 rounded-lg p-4 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-8 min-h-[200px]">
          {/* Left Section - Logo and Club Info */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-start">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600 font-medium text-xs md:text-sm">
                LOGO
              </span>
            </div>
            <div className="text-white text-center md:text-left">
              <h2 className="text-lg md:text-xl font-bold mb-1">CLUB NAME</h2>
              <p className="text-base md:text-lg mb-2 md:mb-3">NAME</p>
              <button className="text-red-500 font-medium flex items-center gap-1 hover:text-red-400 transition-colors justify-center md:justify-start">
                See more
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Section - Vertical Text */}
          <div className="flex md:items-center gap-4 w-full md:w-auto">
            <div className="w-full h-1 md:w-1 md:h-32 bg-red-500 md:flex-shrink-0"></div>
            <div className="bg-gray-200 px-3 py-4 md:px-4 md:py-8 flex items-center justify-center min-h-[60px] md:min-h-[120px] w-full md:w-auto">
              <span className="text-gray-700 font-medium text-xs md:text-sm tracking-wider block md:hidden">
                PERSON PLACEMENT
              </span>
              <span
                className="text-gray-700 font-medium text-sm tracking-wider hidden md:block"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                PERSON PLACEMENT
              </span>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="flex-1 border-2 border-red-500 p-4 md:p-6 text-white w-full">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">TITLE</h3>
            <p className="text-xs md:text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
