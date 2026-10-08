"use client";

import {
  ArrowLeft,
  ChevronLeft,
  Gamepad2,
  ShoppingCart,
  Smartphone,
  Zap,
  ShieldCheck,
  Headphones,
  Sparkles,
} from "lucide-react";

const games = [
  { name: "Free Fire", icon: "🔥", text: "جواهر وشحن سريع" },
  { name: "PUBG Mobile", icon: "🎯", text: "UC وباقات متنوعة" },
  { name: "Call of Duty", icon: "⚡", text: "CP وشحن فوري" },
];

const services = [
  { name: "TikTok", icon: "♪", text: "متابعين • لايكات • مشاهدات" },
  { name: "Facebook", icon: "f", text: "متابعين • تفاعلات • مشاهدات" },
  { name: "WhatsApp", icon: "◉", text: "متابعين وتفاعلات" },
];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white selection:bg-cyan-400 selection:text-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
              <Zap className="text-cyan-300" size={22} />
            </div>
            <div>
              <div className="text-xl font-black tracking-wide">
                DARK <span className="text-yellow-400">STORE</span>
              </div>
              <div className="text-[10px] text-gray-500">EGYPT • DIGITAL STORE</div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-gray-300 md:flex">
            <a href="#" className="text-white">الرئيسية</a>
            <a href="#games" className="hover:text-cyan-300">الألعاب</a>
            <a href="#services" className="hover:text-cyan-300">الخدمات</a>
            <a href="#offers" className="hover:text-cyan-300">العروض</a>
          </nav>

          <button className="rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-300">
            تسجيل الدخول
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[-100px] top-10 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs text-cyan-300">
              <Sparkles size={14} />
              أسرع متجر رقمي في مكان واحد
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              DARK
              <span className="block text-yellow-400">STORE</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              شحن ألعاب، خدمات سوشيال، عروض وباقات رقمية
              <span className="text-white"> بسرعة وأمان.</span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:scale-105"
              >
                تصفح المنتجات
                <ArrowLeft size={18} />
              </a>

              <a
                href="#services"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                استكشف الخدمات
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm text-gray-400">DARK STORE</span>
                <span className="flex items-center gap-2 text-xs text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  ONLINE
                </span>
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-7">
                <Gamepad2 className="mb-5 text-yellow-400" size={42} />
                <div className="text-3xl font-black">شحن سريع ⚡</div>
                <p className="mt-3 text-gray-400">
                  خدماتك الرقمية في مكان واحد.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <ShieldCheck className="text-cyan-300" size={22} />
                  <p className="mt-2 text-sm font-bold">موثوق</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <Headphones className="text-yellow-300" size={22} />
                  <p className="mt-2 text-sm font-bold">دعم العملاء</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="games" className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle title="الألعاب" subtitle="اشحن لعبتك بسرعة" icon={<Gamepad2 size={22} />} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {games.map((game) => (
            <div key={game.name} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-cyan-400/30">
              <div className="flex items-center justify-between">
                <div className="text-4xl">{game.icon}</div>
                <ChevronLeft className="text-gray-600 group-hover:text-cyan-300" />
              </div>
              <h3 className="mt-5 text-xl font-black">{game.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{game.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle title="الخدمات الرقمية" subtitle="خدمات السوشيال في مكان واحد" icon={<Smartphone size={22} />} />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="rounded-2xl border border-white/10 bg-[#080808] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl font-black text-cyan-300">
                  {service.icon}
                </div>
                <h3 className="mt-5 text-xl font-black">{service.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 via-transparent to-cyan-400/10 p-8 md:p-12">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-yellow-300">عروض DARK STORE</span>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              عروض قوية بدون تعقيد
            </h2>
            <p className="mt-4 leading-7 text-gray-400">
              باقات مختارة وأسعار واضحة وتجربة شراء بسيطة.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={<ShoppingCart />} title="طلب سريع" text="اختار الخدمة وابدأ الطلب بسهولة." />
          <Feature icon={<ShieldCheck />} title="أمان" text="نظام قابل للتوسع وإدارة الطلبات." />
          <Feature icon={<Headphones />} title="دعم" text="تواصل مباشر لخدمة العملاء." />
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-gray-500">
        <div className="font-black text-white">DARK STORE</div>
        <p className="mt-2">© 2026 DARK STORE EGY • جميع الحقوق محفوظة</p>
      </footer>
    </main>
  );
}

function SectionTitle({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-cyan-300">{icon}</div>
        <h2 className="mt-2 text-3xl font-black">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      </div>
      <ChevronLeft className="hidden text-gray-600 md:block" />
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-cyan-300">{icon}</div>
      <h3 className="mt-4 text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>
    </div>
  );
}
