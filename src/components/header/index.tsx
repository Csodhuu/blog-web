import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";
import { HyperText } from "../ui/hyper-text";

export function Header() {
  return (
    <header className="w-full glass-card sticky top-0 z-50 border-b border-white/20 md:px-[109px]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-scale-in">
            <div className="w-12 h-12 bg-gradient-to-br from-[#261F61] to-secondary rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:rotate-6">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-[#261F61] rounded-sm"></div>
              </div>
            </div>
            <div className="-space-y-4">
              <HyperText className="text-lg font-bold text-[#262362]">
                GATEWAY SPORTS
              </HyperText>
              <HyperText className="text-sm text-muted-foreground">
                TRAVEL MANAGEMENT
              </HyperText>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-[#261F61] transition-all duration-300 hover:scale-105 relative group"
            >
              Бидний тухай
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#261F61] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-[#261F61] transition-all duration-300 hover:scale-105 relative group"
            >
              Танилцуулга
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#261F61] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-[#261F61] transition-all duration-300 hover:scale-105 relative group"
            >
              Зур зохион байгуулах
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#261F61] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-[#261F61] transition-all duration-300 hover:scale-105 relative group"
            >
              Спорт
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#261F61] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-[#261F61] transition-all duration-300 hover:scale-105 relative group"
            >
              Санал хүсэлт
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#261F61] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-[#261F61] transition-all duration-300 hover:scale-105 relative group"
            >
              Холбоо барих
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#261F61] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover-glow hover:bg-[#261F61]/10 hover:text-[#261F61]"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover-glow hover:bg-[#261F61]/10 hover:text-[#261F61]"
            >
              <Instagram className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
