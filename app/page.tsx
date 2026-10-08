"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Gamepad2,
  Users,
  Gift,
  Zap,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Section = {
  id: string;
  section_type: string;
  title: string;
  content: Record<string, any>;
  sort_order: number;
  visible: boolean;
};

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSite() {
      const [{ data: settingsData }, { data: sectionsData }] =
        await Promise.all([
          supabase.from("site_settings").select("*").limit(1).single(),
          supabase
            .from("site_sections")
            .select("*")
            .eq("visible", true)
            .order("sort_order", { ascending: true }),
        ]);

      setSettings(settingsData);
      setSections(sectionsData || []);
      setLoading(false);
    }

    loadSite();
  }, []);

  const renderSection = (section: Section) => {
    const type = section.section_type;

    if (type === "hero" || type === "banner") {
      return (
        <section
          key={section.id}
          className="relative overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,.14),transparent_30%)]" />

          <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                <Zap size={16} />
                DARK STORE
              </div>

              <h2 className="text-5xl font-black leading-[1.1] md:text-7xl">
                {section.content?.headline ||
                  section.title ||
                  "متجرك الرقمي"}
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                {section.content?.subheadline ||
                  "شحن ألعاب وخدمات رقمية بسرعة وأمان"}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-7 py-4 font-black text-black shadow-lg shadow-yellow-400/10 transition hover:scale-[1.02]"
                >
                  {section.content?.buttonText || "ابدأ الآن"}
                  <ArrowLeft size={18} />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold transition hover:bg-white/10"
                >
                  استكشف الخدمات
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ["⚡", "سرعة"],
                  ["🛡️", "أمان"],
                  ["💎", "جودة"],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
                  >
                    <div className="text-2xl">{icon}</div>
                    <div className="mt-2 text-sm font-bold text-zinc-300">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative aspect-square rounded-[42px] border border-cyan-400/20 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-500/10">
                <div className="flex h-full flex-col items-center justify-center rounded-[34px] border border-yellow-400/20 bg-black/70">
                  <div className="text-9xl font-black text-yellow-400">
                    D
                  </div>

                  <div className="mt-4 text-xl font-black tracking-[0.3em] text-white">
                    DARK STORE
                  </div>

                  <div className="mt-2 text-xs font-bold tracking-[0.4em] text-cyan-300">
                    DIGITAL STORE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (type === "games") {
      return (
        <section
          key={section.id}
          id="games"
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <Gamepad2 className="text-yellow-400" />
              <span className="text-sm font-black text-yellow-400">
                GAMING
              </span>
            </div>

            <h2 className="mt-3 text-4xl font-black">
              {section.title || "الألعاب"}
            </h2>

            <p className="mt-3 text-zinc-500">
              {section.content?.description ||
                "شحن الألعاب والخدمات الرقمية"}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["🔥", "Free Fire", "شحن الجواهر"],
              ["🎯", "PUBG Mobile", "شحن الشدات"],
              ["⚡", "Call of Duty", "CP وشحن الحساب"],
            ].map(([icon, name, desc]) => (
              <Link
                href="/products"
                key={name}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-white/[0.06]"
              >
                <div className="text-5xl">{icon}</div>
                <h3 className="mt-6 text-2xl font-black">{name}</h3>
                <p className="mt-2 text-sm text-zinc-500">{desc}</p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-yellow-400">
                  شحن الآن
                  <ArrowLeft size={16} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      );
    }

    if (type === "services") {
      return (
        <section
          key={section.id}
          id="services"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20">
            <div className="flex items-center gap-3">
              <Users className="text-cyan-300" />
              <span className="text-sm font-black text-cyan-300">
                SOCIAL
              </span>
            </div>

            <h2 className="mt-3 text-4xl font-black">
              {section.title || "الخدمات"}
            </h2>

            <p className="mt-3 text-zinc-500">
              {section.content?.description ||
                "خدمات السوشيال ميديا المختلفة"}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                ["TikTok", "متابعين • لايكات • مشاهدات"],
                ["Facebook", "متابعين • تفاعلات • مشاهدات"],
                ["WhatsApp", "متابعين • تفاعلات • تصويتات"],
              ].map(([name, desc]) => (
                <Link
                  href="/services"
                  key={name}
                  className="rounded-3xl border border-white/10 bg-black/40 p-7 transition hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">
                    <Users className="text-cyan-300" />
                  </div>

                  <h3 className="mt-6 text-2xl font-black">{name}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    {desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (type === "offers") {
      return (
        <section
          key={section.id}
          id="offers"
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <div className="relative overflow-hidden rounded-[36px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-black to-cyan-400/10 p-8 md:p-14">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-3xl" />

            <Gift className="relative text-yellow-400" size={38} />

            <h2 className="relative mt-6 text-4xl font-black">
              {section.title || "العروض"}
            </h2>

            <p className="relative mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
              {section.content?.description || "أقوى عروض DARK STORE"}
            </p>

            <Link
              href="/products"
              className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-7 py-4 font-black text-black"
            >
              شاهد العروض
              <ArrowLeft size={18} />
            </Link>
          </div>
        </section>
      );
    }

    if (type === "products") {
      return (
        <section
          key={section.id}
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-3xl font-black">
              {section.title || "المنتجات"}
            </h2>
            <p className="mt-3 text-zinc-500">
              {section.content?.description || "منتجات DARK STORE"}
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-black text-black"
            >
              تصفح المنتجات
            </Link>
          </div>
        </section>
      );
    }

    if (type === "reviews") {
      return (
        <section
          key={section.id}
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <h2 className="text-3xl font-black">
            {section.title || "آراء العملاء"}
          </h2>
          <p className="mt-3 text-zinc-500">
            {section.content?.description || "ثقة عملائنا هي أهم شيء"}
          </p>
        </section>
      );
    }

    if (type === "faq") {
      return (
        <section
          key={section.id}
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <h2 className="text-3xl font-black">
            {section.title || "الأسئلة الشائعة"}
          </h2>
          <p className="mt-3 text-zinc-500">
            {section.content?.description ||
              "إجابات عن أهم الأسئلة حول DARK STORE"}
          </p>
        </section>
      );
    }

    if (type === "text") {
      return (
        <section
          key={section.id}
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-3xl font-black">
              {section.content?.headline || section.title || "قسم جديد"}
            </h2>
            <p className="mt-4 leading-8 text-zinc-400">
              {section.content?.description ||
                section.content?.subheadline ||
                ""}
            </p>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#050505] text-white"
      style={{
        backgroundColor: settings?.background_color || "#050505",
      }}
    >
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl font-black text-black"
              style={{
                backgroundColor: settings?.primary_color || "#facc15",
              }}
            >
              D
            </div>

            <div>
              <h1
                className="font-black"
                style={{
                  color: settings?.primary_color || "#facc15",
                }}
              >
                {settings?.site_name || "DARK STORE"}
              </h1>
              <p className="text-[10px] text-zinc-500">
                DIGITAL STORE
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-zinc-300 md:flex">
            <a href="#games" className="transition hover:text-yellow-400">
              الألعاب
            </a>
            <a
              href="#services"
              className="transition hover:text-cyan-300"
            >
              الخدمات
            </a>
            <a href="#offers" className="transition hover:text-yellow-400">
              العروض
            </a>
          </nav>

          <Link
            href="/login"
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400"
          >
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {loading ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400" />
            <p className="mt-4 text-sm text-zinc-500">
              جاري تحميل DARK STORE...
            </p>
          </div>
        </div>
      ) : sections.length > 0 ? (
        sections.map((section) => renderSection(section))
      ) : (
        <section className="mx-auto max-w-4xl px-5 py-32 text-center">
          <div className="text-7xl font-black text-yellow-400">D</div>
          <h2 className="mt-6 text-4xl font-black">DARK STORE</h2>
          <p className="mt-4 text-zinc-500">
            لم يتم إنشاء أقسام الموقع بعد.
          </p>
        </section>
      )}

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-16 md:grid-cols-3">
          {[
            [Zap, "سرعة التنفيذ", "خدمات رقمية بسرعة عالية"],
            [ShieldCheck, "أمان", "حماية وخصوصية للطلبات"],
            [Headphones, "دعم", "مساعدة عند الحاجة"],
          ].map(([Icon, title, desc]) => (
            <div
              key={title as string}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
            >
              <Icon className="text-yellow-400" size={28} />
              <h3 className="mt-5 font-black">{title as string}</h3>
              <p className="mt-2 text-sm text-zinc-500">
                {desc as string}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()}{" "}
            {settings?.site_name || "DARK STORE"}
          </span>
          <span>Digital Store</span>
        </div>
      </footer>
    </main>
  );
}
