"use client";

import NewsletterForm from "@/components/shared/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="relative bg-[#C4882A] text-[#1C1208] py-20 sm:py-28 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="os-container relative z-10" data-reveal data-delay="1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Editorial Headline */}
          <div className="lg:col-span-6 space-y-3">
            <div className="t-label text-xs tracking-widest text-[#1C1208]/75 uppercase">
              The Osotua Dispatch
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1208] font-light leading-tight m-0">
              Receive Seasonal Harvest Drops &amp; <br className="hidden sm:inline" />
              <em className="text-[#1C1208] font-normal italic underline decoration-[#1C1208]/30">Pedigree Stud Bulletins</em>
            </h2>

            <p className="t-body text-sm sm:text-base text-[#1C1208]/80 max-w-lg m-0">
              Join over 2,400 chefs, pastoral ranchers, and wholesome food enthusiasts across Kenya receiving direct paddock updates.
            </p>
          </div>

          {/* Right Column: Newsletter Form */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#1C1208]/10 border border-[#1C1208]/20 backdrop-blur-sm">
              <NewsletterForm />
              <div className="text-[11px] font-mono text-[#1C1208]/70 mt-3 flex items-center gap-2">
                <i className="bi bi-shield-check text-xs" aria-hidden="true" />
                <span>Zero spam. Unsubscribe with one click anytime.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
