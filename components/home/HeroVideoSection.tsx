import { SectionHeader } from "./common";

export function HeroVideoSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          title="See ResumeMax in Action"
          subtitle="Watch how our AI-powered resume builder transforms your career story into a compelling, professional resume in minutes."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Al0yKjtmJrw?si=dS32UJmGXWj9eHcq"
              title="ResumeMax Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
