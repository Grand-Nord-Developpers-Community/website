import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Alice Kouam",
    role: "Développeuse Web",
    content:
      "GNDC m'a offert une plateforme incroyable pour développer mes compétences et rencontrer d'autres passionnés de technologie.",
  },
  {
    name: "Paul Biya",
    role: "Entrepreneur Tech",
    content:
      "Grâce aux événements de GNDC, j'ai pu transformer mon idée en une start-up prospère. Leur soutien a été inestimable.",
  },
  {
    name: "Marie Tchuente",
    role: "Étudiante en Informatique",
    content:
      "Les ateliers et hackathons de GNDC m'ont permis d'appliquer mes connaissances théoriques à des projets concrets.",
  },
];

const TestimonialCarousel = () => {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto space-x-6 py-8 px-4 snap-x snap-mandatory">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="flex-shrink-0 w-80 snap-center">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-500 font-semibold">
                    {testimonial.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
        <ChevronLeft className="text-gray-600" />
      </button>
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
        <ChevronRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default TestimonialCarousel;
