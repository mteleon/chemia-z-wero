import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, BarChart, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createPageUrl } from "@/utils";
import type { Course } from "@/Utilities/Course";

type Props = { course: Course };

export default function CourseCard({ course }: Props) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300"
    >
      {/* Image Area */}
      <div className="h-48 bg-[#FFFBF0] relative overflow-hidden">
        {course.image_url ? (
          <img 
            src={course.image_url} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#D97745] to-[#F4B942] flex items-center justify-center">
            <span className="text-white font-bold text-lg opacity-50">Chemia z Wero</span>
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <Badge className="bg-white/90 text-[#D97745] hover:bg-white backdrop-blur-sm font-semibold">
            {course.level === 'rozszerzony' ? 'Poziom Rozszerzony' : 
             course.level === 'podstawowy' ? 'Poziom Podstawowy' :
             course.level === 'wszystkie' ? 'Podst. + Rozsz.' : 'Studia'}
          </Badge>
          {course.status === 'coming_soon' && (
            <Badge className="bg-[#1A3B47]/90 text-white hover:bg-[#1A3B47] backdrop-blur-sm font-semibold">
              Wkrótce dostępny
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#1A3B47] mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-[#1A3B47]/70 text-sm mb-4 line-clamp-2 flex-grow">
          {course.short_description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-[#1A3B47]/60 mb-6">
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{course.duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <BarChart className="h-3.5 w-3.5" />
            <span className="capitalize">{course.level}</span>
          </div>
        </div>

        {/* Features Preview */}
        {course.features && course.features.length > 0 && (
          <div className="space-y-1.5 mb-6">
            {course.features!.slice(0, 2).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-[#1A3B47]/80">
                <CheckCircle className="h-4 w-4 text-[#D97745] mt-0.5 flex-shrink-0" />
                <span className="text-xs">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#D97745]/10">
          <div>
            <span className="text-2xl font-bold text-[#1A3B47]">{course.price} zł</span>
          </div>
          {course.status === 'coming_soon' ? (
            <Button size="sm" disabled className="bg-[#1A3B47]/50 text-white cursor-not-allowed">
              Wkrótce
            </Button>
          ) : (
            <Button size="sm" className="bg-[#1A3B47] hover:bg-[#2c505e] text-white gap-2" asChild>
              <Link to={createPageUrl(`CourseDetails?id=${course.id}`)}>
                Szczegóły <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}