/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Target, Zap, Award, Crown } from "lucide-react";

const cardData = [
  {
    id: 1,
    title: "Championship League",
    description:
      "Join the ultimate competition and prove your skills against the best players worldwide.",
    icon: Trophy,
    badge: "Featured",
    status: "active",
  },
  {
    id: 2,
    title: "Skills Challenge",
    description:
      "Test your abilities in various skill-based challenges and earn exclusive rewards.",
    icon: Target,
    badge: "New",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Speed Tournament",
    description:
      "Fast-paced matches where quick thinking and rapid execution determine the winner.",
    icon: Zap,
    badge: "Popular",
    status: "active",
  },
  {
    id: 4,
    title: "Elite Masters",
    description:
      "Exclusive tournament for top-tier players seeking the ultimate challenge.",
    icon: Crown,
    badge: "Elite",
    status: "invitation",
  },
  {
    id: 5,
    title: "Rising Stars",
    description:
      "Perfect for newcomers to showcase their potential and climb the rankings.",
    icon: Star,
    badge: "Beginner",
    status: "active",
  },
  {
    id: 6,
    title: "Achievement Hunt",
    description:
      "Complete various objectives and unlock special achievements and titles.",
    icon: Award,
    badge: "Quest",
    status: "ongoing",
  },
];

const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case "Featured":
      return "default";
    case "New":
      return "secondary";
    case "Popular":
      return "outline";
    case "Elite":
      return "destructive";
    case "Beginner":
      return "secondary";
    case "Quest":
      return "outline";
    default:
      return "default";
  }
};

export function Competitions() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4  max-w-6xl  py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4 text-balance">
            Тэмцээнүүд
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ур чадвараа шалгаж, өөрийнхөө хязгаарыг даван туулахад зориулагдсан
            сонирхолтой тэмцээн, сорилтууд таныг хүлээж байна.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.id}
                className="group relative overflow-hidden bg-card border-border hover:bg-muted transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <div className="absolute top-4 right-4 z-10">
                  <Badge
                    variant={getBadgeVariant(card.badge)}
                    className="text-xs font-medium"
                  >
                    {card.badge}
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-foreground transition-colors duration-300">
                    {card.title}
                  </CardTitle>
                </CardHeader>

                {/* Image Placeholder */}
                <div className="mx-6 mb-4 h-32 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={`https://www.finaltouch.co.in/abstract-geometric-shapes.webp`}
                    alt={`${card.title} banner`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Card Content */}
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {card.description}
                  </CardDescription>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors duration-300"
                    size="sm"
                  >
                    {card.status === "active"
                      ? "Join Now"
                      : card.status === "upcoming"
                      ? "Register"
                      : card.status === "invitation"
                      ? "Request Invite"
                      : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Ирээдүйд олон тэмцээнүүд зохиогдох болно. Сонирхолтой мэдээллүүдэд
            анхаарлаа хандуулаарай !
          </p>
        </div>
      </div>
    </section>
  );
}
