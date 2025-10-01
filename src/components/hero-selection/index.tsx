import { TypingAnimation } from "../ui/typing-animation";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4  max-w-6xl  py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="font-extrabold leading-none text-black ">
              <p className="uppercase md:text-[44px] text-[24px] ">Be the</p>
              <TypingAnimation
                startOnView={true}
                className="uppercase md:text-[66px] text-red-500 text-[50px]"
              >
                Best Athlete
              </TypingAnimation>
              <div className="flex items-baseline gap-3">
                <p className="md:text-[27px] text-[24px] lowercase">that</p>
                <p className="uppercase md:text-[66px] text-[44px]">
                  You Can Be.
                </p>
              </div>
            </div>

            <p
              className="text-lg text-muted-foreground max-w-md leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.9s" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry s standard dummy text
              ever since the 1500s, when an unknown printer took a galley
            </p>

            <div
              className="animate-slide-up"
              style={{ animationDelay: "1.2s" }}
            >
              <button className=" bg-gradient-to-tr from-primary text-white  to-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 group border-0">
                <span>Get Started</span>
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right Content - Basketball Graphics */}
        </div>
      </div>
    </section>
  );
}
