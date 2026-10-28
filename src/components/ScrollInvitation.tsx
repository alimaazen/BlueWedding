import { motion } from "framer-motion";
import bismillahImg from "@/assets/finalbismillah.png";
import ScrollSection from "./ScrollSection";

const ScrollInvitation = () => {
  return (
    <div className="relative">
      {/* 1. Bismillah & Cordial Invitation */}
      <section className="min-h-[100svh] flex items-center justify-center px-5 py-12">
        <div className="text-center max-w-lg">
          <img
            src={bismillahImg}
            alt="Bismillah - In the name of Allah"
            className="w-full max-w-[280px] sm:max-w-[320px] mx-auto h-auto drop-shadow-md select-none"
          />
          <p className="mt-6 text-[#2C3E50] font-body text-[10px] min-[360px]:text-[11px] min-[400px]:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          <p className="mt-5 text-sm md:text-base text-[#2C3E50]/90 font-body italic leading-relaxed">
            We cordially invite your esteemed presence on the auspicious occasion of the wedding ceremony of
          </p>
        </div>
      </section>

      {/* 2. Bride & Groom Section */}
      <ScrollSection>
        <motion.div
          className="relative text-center px-2 w-full"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Groom */}
          <div className="mb-5">
            <p
              className="text-3xl min-[360px]:text-4xl md:text-5xl text-[#2C3E50] mb-2 font-bold whitespace-nowrap drop-shadow-sm tracking-wide"
              style={{ fontFamily: "'Reem Kufi', sans-serif" }}
              dir="rtl"
              lang="ar"
            >
              زهير عمر فاروق
            </p>
            <p
              className="text-[12px] min-[360px]:text-xs min-[390px]:text-sm sm:text-base text-[#2C3E50] tracking-[0.16em] min-[360px]:tracking-[0.2em] sm:tracking-[0.24em] font-semibold whitespace-nowrap"
              style={{ fontFamily: "'Reem Kufi', 'Cormorant Garamond', serif" }}
            >
              ZUHAIR UMAR FAROOKH
            </p>
            <p className="text-[11px] sm:text-xs text-[#5D6D7E] mt-1 font-medium italic">
              s/o Umar Farookh and Sabira Umar Farookh
            </p>
          </div>

          {/* Ampersand Accent */}
          <p className="text-3xl font-display text-[#5D6D7E] my-3 select-none">
            &
          </p>

          {/* Bride */}
          <div>
            <p
              className="text-3xl min-[360px]:text-4xl md:text-5xl text-[#2C3E50] mb-2 font-bold whitespace-nowrap drop-shadow-sm tracking-wide"
              style={{ fontFamily: "'Reem Kufi', sans-serif" }}
              dir="rtl"
              lang="ar"
            >
              نجلاء ناصر
            </p>
            <p
              className="text-[12px] min-[360px]:text-xs min-[390px]:text-sm sm:text-base text-[#2C3E50] tracking-[0.16em] min-[360px]:tracking-[0.2em] sm:tracking-[0.24em] font-semibold whitespace-nowrap"
              style={{ fontFamily: "'Reem Kufi', 'Cormorant Garamond', serif" }}
            >
              NAJLA NASSER
            </p>
            <p className="text-[11px] sm:text-xs text-[#5D6D7E] mt-1 font-medium italic">
              d/o Nasser Edavana Meethal and Raseena Nasser
            </p>
          </div>
        </motion.div>
      </ScrollSection>

      {/* 3. Save the Date (Nikkah - November 27, 2026) */}
      <ScrollSection>
        <div className="text-center max-w-lg w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-[#5D6D7E] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-7 uppercase">
              SAVE THE DATE
            </h2>
            <div>
              <h3
                className="text-4xl min-[360px]:text-5xl md:text-6xl text-[#2C3E50] mb-3 select-none"
                style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
              >
                Nikkah
              </h3>
              <div className="flex items-center justify-center gap-2.5 min-[360px]:gap-3.5 md:gap-6 w-full max-w-[370px] mx-auto px-1">
                <div className="text-right flex flex-col justify-center flex-1 min-w-0 pr-1">
                  <span className="text-[11px] min-[360px]:text-xs min-[390px]:text-sm sm:text-base font-heading tracking-[0.03em] uppercase text-[#2C3E50] font-bold block whitespace-nowrap">
                    Friday
                  </span>
                  <span
                    className="text-[10px] min-[360px]:text-xs min-[390px]:text-sm md:text-base font-heading tracking-[0.05em] uppercase text-[#5D6D7E] font-semibold mt-0.5 block whitespace-nowrap"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    5:30 PM
                  </span>
                </div>
                <div className="h-10 md:h-14 w-[1.5px] shrink-0 bg-[#5D6D7E]/50 shadow-[0_0_6px_rgba(93,109,126,0.3)]"></div>
                <div className="flex flex-col items-center justify-center w-12 min-[360px]:w-14 md:w-16 shrink-0">
                  <span
                    className="text-4xl min-[360px]:text-5xl md:text-6xl text-[#2C3E50] font-bold drop-shadow-sm"
                    style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
                  >
                    27
                  </span>
                </div>
                <div className="h-10 md:h-14 w-[1.5px] shrink-0 bg-[#5D6D7E]/50 shadow-[0_0_6px_rgba(93,109,126,0.3)]"></div>
                <div className="text-left flex flex-col justify-center flex-1 min-w-0 pl-1">
                  <span className="text-[11px] min-[360px]:text-xs min-[390px]:text-sm sm:text-base font-heading tracking-[0.03em] uppercase text-[#2C3E50] font-bold block whitespace-nowrap">
                    November
                  </span>
                  <span
                    className="text-[10px] min-[360px]:text-xs min-[390px]:text-sm md:text-base font-heading tracking-[0.05em] uppercase text-[#5D6D7E] font-semibold mt-0.5 block whitespace-nowrap"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* 4. Venue Section */}
      <ScrollSection>
        <div className="text-center max-w-lg w-full px-4">
          <motion.p
            className="text-[#5D6D7E] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-7 uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            VENUE
          </motion.p>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="text-2xl min-[360px]:text-3xl md:text-4xl text-[#2C3E50] font-bold mb-2 leading-relaxed drop-shadow-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              dir="rtl"
              lang="ar"
            >
              استراحة الماسه للعطلات
            </h3>
            <p className="text-sm min-[360px]:text-base tracking-[0.18em] uppercase text-[#5D6D7E] font-heading font-semibold mb-1">
              Al Masa Holiday Resort
            </p>
            <p className="text-sm md:text-base font-heading text-[#2C3E50] mb-6">
              Umm Al Amad, Qatar
            </p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=25.4939697,51.3944551"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#2C3E50]/20 shadow-xl bg-white/40 backdrop-blur-md">
                <div className="aspect-[16/10] w-full">
                  <iframe
                    src="https://www.google.com/maps?q=25.4939697,51.3944551&hl=ar&z=14&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-3 bg-[#2C3E50]/90 border-t border-[#2C3E50]/30 flex items-center justify-center gap-2 group-hover:bg-[#2C3E50] transition-colors duration-300">
                  <span className="text-xs uppercase tracking-widest text-[#F5F2EC] font-heading font-semibold">
                    Open in Google Maps / عرض الاتجاهات
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
  );
};

export default ScrollInvitation;
