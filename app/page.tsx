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

  useEffect(() => {
    async function loadSite() {
      const { data: settingsData } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      const { data: sectionsData } = await supabase
        .from("site_sections")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      setSettings(settingsData);
      setSections(sectionsData || []);
    }

    loadSite();
  }, []);

  const getSection = (type: string) =>
    sections.find((section) => section.section_type === type);

  const hero = getSection("hero");
  const games = getSection("games");
  const offers = getSection("offers");
  const services = getSection("services");

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 font-black text-black">
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

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#games">الألعاب</a>
            <a href="#services">الخدمات</a>
            <a href="#offers">العروض</a>
          </nav>

          <Link
            href="/login"
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400"
          >
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {hero && (
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,.12),transparent_30%)]" />

          <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
            <div>
              <span className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-bold text-cyan-300">
                ⚡ DARK STORE
              </span>

              <h2 className="text-5xl font-black leading-tight md:text-7xl">
                {hero.content?.headline || "DARK STORE"}
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
                {hero.content?.subheadline ||
                  "متجرك الرقمي للألعاب والخدمات"}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-black text-black"
                >
                  {hero.content?.buttonText || "ابدأ الآن"}
                  <ArrowLeft size={18} />
                </Link>

                <Link
                  href="/services"
                  className="rounded-xl border border-white/10 px-6 py-3 font-bold"
                >
                  استكشف الخدمات
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto aspect-square max-w-md rounded-[40px] border border-cyan-400/20 bg-white/[0.03] p-6 shadow-2xl shadow-cyan-500/10">
                <div className="flex h-full items-center justify-center rounded-[32px] border border-yellow-400/10 bg-black">
                  <div className="text-center">
                    <div className="text-8xl font-black text-yellow-400">
                      D
                    </div>
                    <p className="mt-3 font-black tracking-[0.3em] text-cyan-300">
                      DARK STORE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {games && (
        <section id="games" className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10">
            <p className="text-sm font-bold text-yellow-400">
              GAMING
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {games.title || "الألعاب"}
            </h2>

            <p className="mt-2 text-zinc-500">
              {games.content?.description ||
                "شحن الألعاب والخدمات الرقمية"}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["🔥", "Free Fire", "شحن الجواهر"],
              ["🎯", "PUBG Mobile", "شحن الشدات"],
              ["⚡", "Call of Duty", "CP وشحن الحساب"],
            ].map(([icon, name, desc]) => (
              <Link
                href="/products"
                key={name}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-yellow-400/40"
              >
                <div className="text-4xl">{icon}</div>
                <h3 className="mt-5 text-xl font-black">{name}</h3>
                <p className="mt-2 text-sm text-zinc-500">{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {services && (
        <section
          id="services"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20">
            <p className="text-sm font-bold text-cyan-300">
              SOCIAL
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {services.title || "الخدمات"}
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["TikTok", "متابعين • لايكات • مشاهدات"],
                ["Facebook", "متابعين • تفاعلات • مشاهدات"],
                ["WhatsApp", "متابعين • تفاعلات • تصويتات"],
              ].map(([name, desc]) => (
                <Link
                  href="/services"
                  key={name}
                  className="rounded-3xl border border-white/10 bg-black/30 p-6"
                >
                  <Users className="text-cyan-300" />
                  <h3 className="mt-5 text-xl font-black">{name}</h3>
                  <p className="mt-2 text-sm text-zinc-500">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {offers && (
        <section id="offers" className="mx-auto max-w-7xl px-5 py-20">
          <div className="rounded-[32px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 to-cyan-400/5 p-8 md:p-12">
            <Gift className="text-yellow-400" size={32} />

            <h2 className="mt-5 text-3xl font-black">
              {offers.title || "العروض"}
            </h2>

            <p className="mt-3 text-zinc-400">
              {offers.content?.description ||
                "أقوى عروض DARK STORE"}
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-black text-black"
            >
              شاهد العروض
              <ArrowLeft size={18} />
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-16 md:grid-cols-3">
          {[
            [Zap, "سرعة التنفيذ", "خدمات رقمية بسرعة عالية"],
            [ShieldCheck, "أمان", "حماية وخصوصية للطلبات"],
            [Headphones, "دعم", "مساعدة عند الحاجة"],
          ].map(([Icon, title, desc]) => {
            const I = Icon as any;

            return (
              <div
                key={title as string}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <I className="text-yellow-400" />
                <h3 className="mt-4 font-black">{title as string}</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  {desc as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center">
        <p className="font-black text-yellow-400">
          {settings?.site_name || "DARK STORE"}
        </p>

        <p className="mt-2 text-xs text-zinc-600">
          متجر رقمي للألعاب والخدمات
        </p>
      </footer>
    </main>
  );
}
