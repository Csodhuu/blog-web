export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6 h-[338px] lg:h-[440px]">
            <p className="uppercase -mb-8 text-[142px] font-bold">аялал</p>
            <p className="uppercase text-[40px] font-bold text-red-500 -mb-4">
              олон улсын тэмцээн
            </p>
            <p className="uppercase text-[70px] font-bold -mb-4 ">
              бүгд нэг дор
            </p>
            <p className="uppercase text-[22px] text-wrap">
              Мэргэжлийн спортын аялал, тэмцээний логистик, боловсролын
              зөвлөгөө, олон улсын тамирчны боломжууд бүгд нэг дор найдвартай
              үйлчилгээнд.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[52px] bg-gradient-to-br from-[#5d1c6c] via-[#2a2b6a] to-[#131a3b] shadow-[0_30px_60px_-30px_rgba(13,16,35,0.55)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,96,0,0.35)_0%,transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(135,90,255,0.35)_0%,transparent_55%)]" />
              <div className="absolute -left-10 bottom-10 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffb34a_0%,#ffb34a_55%,#d6452f_100%)] shadow-[0_20px_35px_-20px_rgba(0,0,0,0.45)]" />
              <div className="absolute -right-6 bottom-0 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f7c84b_0%,#f7c84b_55%,#1e2a5c_100%)] shadow-[0_20px_35px_-20px_rgba(0,0,0,0.45)]" />
              <div className="absolute right-6 top-4 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f59e0b_0%,#f59e0b_55%,#f97316_100%)] opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <span className="text-[64px] font-black tracking-tight">
                  SPORT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
