"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Palette,
  LayoutDashboard,
  Package,
  Gift,
  ShoppingCart,
  Users,
  Wallet,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Save,
  LogOut,
  Monitor,
} from "lucide-react";

type Section = {
  id: string;
  section_type: string;
  title: string;
  content: Record<string, any>;
  sort_order: number;
  visible: boolean;
};

const sectionNames: Record<string, string> = {
  hero: "البانر الرئيسي",
  games: "قسم الألعاب",
  services: "الخدمات",
  offers: "العروض",
  products: "المنتجات",
  reviews: "آراء العملاء",
  faq: "الأسئلة الشائعة",
  footer: "الفوتر",
};

export default function DarkControl() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [role, setRole] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [selected, setSelected] = useState<Section | null>(null);
  const [activeMenu, setActiveMenu] = useState("builder");
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    async function loadControl() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || !["admin", "owner"].includes(profile.role)) {
        router.replace("/");
        return;
      }

      setRole(profile.role);
      setAuthorized(true);

      const { data: page } = await supabase
        .from("site_pages")
        .select("id")
        .eq("slug", "home")
        .single();

      if (page) {
        const { data } = await supabase
          .from("site_sections")
          .select("*")
          .eq("page_id", page.id)
          .order("sort_order", { ascending: true });

        setSections(data || []);
      }

      setLoading(false);
    }

    loadControl();
  }, [router]);

  async function saveSection() {
    if (!selected || role !== "owner") return;

    setSaving(true);

    const { error } = await supabase
      .from("site_sections")
      .update({
        title: selected.title,
        content: selected.content,
        visible: selected.visible,
        sort_order: selected.sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selected.id);

    if (!error) {
      setSections((old) =>
        old.map((item) =>
          item.id === selected.id ? selected : item
        )
      );
    }

    setSaving(false);
  }

  async function moveSection(index: number, direction: number) {
    if (role !== "owner") return;

    const target = index + direction;

    if (target < 0 || target >= sections.length) return;

    const current = sections[index];
    const other = sections[target];

    await supabase
      .from("site_sections")
      .update({ sort_order: other.sort_order })
      .eq("id", current.id);

    await supabase
      .from("site_sections")
      .update({ sort_order: current.sort_order })
      .eq("id", other.id);

    const copy = [...sections];

    [copy[index], copy[target]] = [copy[target], copy[index]];

    setSections(copy);
    setSelected(copy[target]);
  }

  async function toggleSection(section: Section) {
    if (role !== "owner") return;

    const visible = !section.visible;

    await supabase
      .from("site_sections")
      .update({ visible })
      .eq("id", section.id);

    const updated = { ...section, visible };

    setSections((old) =>
      old.map((item) =>
        item.id === section.id ? updated : item
      )
    );

    setSelected(updated);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#030303] text-white"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
          <p className="font-bold">جاري تشغيل DARK CONTROL...</p>
        </div>
      </main>
    );
  }

  if (!authorized) return null;

  const menu = [
    [LayoutDashboard, "نظرة عامة", "dashboard"],
    [Palette, "مصمم الموقع", "builder"],
    [Package, "المنتجات", "products"],
    [Gift, "العروض", "offers"],
    [ShoppingCart, "الطلبات", "orders"],
    [Users, "المستخدمين", "users"],
    [Wallet, "المحفظة", "wallet"],
    [ImageIcon, "مكتبة الصور", "media"],
    [Settings, "إعدادات الموقع", "settings"],
    [ShieldCheck, "الصلاحيات", "permissions"],
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[#030303] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-600 text-black">
              <Palette size={21} />
            </div>

            <div>
              <h1 className="font-black tracking-wide">
                DARK CONTROL
              </h1>

              <p className="text-[10px] text-zinc-500">
                {role === "owner"
                  ? "OWNER • FULL CONTROL"
                  : "ADMIN • CONTROL PANEL"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreview(!preview)}
              className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm md:flex"
            >
              <Monitor size={16} />
              {preview ? "إغلاق المعاينة" : "معاينة الموقع"}
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400"
            >
              <LogOut size={16} />
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[230px_1fr_330px]">
        <aside className="border-l border-white/10 bg-black/30 p-3">
          <p className="px-3 pb-3 pt-2 text-[10px] font-black tracking-widest text-zinc-600">
            CONTROL CENTER
          </p>

          {menu.map(([Icon, label, id]) => {
            const I = Icon as any;

            return (
              <button
                key={id as string}
                onClick={() => setActiveMenu(id as string)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-right text-sm font-bold transition ${
                  activeMenu === id
                    ? "bg-yellow-400 text-black"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <I size={18} />
                <span>{label as string}</span>
              </button>
            );
          })}
        </aside>

        <section className="min-h-[calc(100vh-64px)] p-4 lg:p-6">
          {activeMenu === "builder" ? (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Palette className="text-yellow-400" />
                  <h2 className="text-2xl font-black">
                    مصمم الموقع
                  </h2>
                </div>

                <p className="mt-1 text-sm text-zinc-500">
                  تحكم في ترتيب وأجزاء الصفحة الرئيسية.
                </p>
              </div>

              <div className="space-y-3">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    onClick={() => setSelected(section)}
                    className={`rounded-2xl border p-4 transition ${
                      selected?.id === section.id
                        ? "border-yellow-400/60 bg-yellow-400/10"
                        : "border-white/10 bg-white/[0.03]"
                    } ${
                      !section.visible ? "opacity-40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab text-zinc-600">
                        ☰
                      </div>

                      <div className="flex-1">
                        <h3 className="font-black">
                          {section.title ||
                            sectionNames[section.section_type] ||
                            section.section_type}
                        </h3>

                        <p className="mt-1 text-xs text-zinc-500">
                          {sectionNames[section.section_type] ||
                            section.section_type}
                        </p>
                      </div>

                      <button
                        disabled={role !== "owner"}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(index, -1);
                        }}
                        className="rounded-lg bg-white/5 p-2 disabled:opacity-20"
                      >
                        <ChevronUp size={17} />
                      </button>

                      <button
                        disabled={role !== "owner"}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(index, 1);
                        }}
                        className="rounded-lg bg-white/5 p-2 disabled:opacity-20"
                      >
                        <ChevronDown size={17} />
                      </button>

                      <button
                        disabled={role !== "owner"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(section);
                        }}
                        className="rounded-lg bg-white/5 p-2 disabled:opacity-20"
                      >
                        {section.visible ? (
                          <Eye size={17} />
                        ) : (
                          <EyeOff size={17} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="text-2xl font-black">
                {menu.find((item) => item[2] === activeMenu)?.[1]}
              </h2>

              <p className="mt-3 text-sm text-zinc-500">
                هذا القسم جاهز للربط ببيانات DARK STORE.
              </p>
            </div>
          )}
        </section>

        <aside className="border-r border-white/10 bg-black/20 p-4 lg:p-5">
          <div className="sticky top-24">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-black text-yellow-400">
                خصائص العنصر
              </h3>

              {selected && (
                <span className="rounded-lg bg-white/5 px-2 py-1 text-[10px] text-zinc-500">
                  {selected.section_type}
                </span>
              )}
            </div>

            {!selected ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">
                <Palette className="mx-auto mb-3 text-zinc-700" size={30} />

                <p className="text-sm text-zinc-500">
                  اختر قسمًا من المصمم لبدء التعديل.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm font-bold">
                  اسم القسم

                  <input
                    disabled={role !== "owner"}
                    value={selected.title || ""}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        title: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] p-3 outline-none focus:border-yellow-400/50 disabled:opacity-50"
                  />
                </label>

                <label className="block text-sm font-bold">
                  العنوان

                  <input
                    disabled={role !== "owner"}
                    value={selected.content?.headline || ""}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        content: {
                          ...selected.content,
                          headline: e.target.value,
                        },
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] p-3 outline-none focus:border-yellow-400/50 disabled:opacity-50"
                  />
                </label>

                <label className="block text-sm font-bold">
                  الوصف

                  <textarea
                    disabled={role !== "owner"}
                    value={selected.content?.subheadline || ""}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        content: {
                          ...selected.content,
                          subheadline: e.target.value,
                        },
                      })
                    }
                    className="mt-2 min-h-24 w-full resize-none rounded-xl border border-white/10 bg-[#080808] p-3 outline-none focus:border-yellow-400/50 disabled:opacity-50"
                  />
                </label>

                <label className="block text-sm font-bold">
                  نص الزر

                  <input
                    disabled={role !== "owner"}
                    value={selected.content?.buttonText || ""}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        content: {
                          ...selected.content,
                          buttonText: e.target.value,
                        },
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] p-3 outline-none focus:border-yellow-400/50 disabled:opacity-50"
                  />
                </label>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">
                      ظهور القسم
                    </span>

                    <button
                      disabled={role !== "owner"}
                      onClick={() => toggleSection(selected)}
                      className={`rounded-lg px-3 py-2 text-xs font-bold ${
                        selected.visible
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {selected.visible ? "ظاهر" : "مخفي"}
                    </button>
                  </div>
                </div>

                <button
                  disabled={role !== "owner" || saving}
                  onClick={saveSection}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 p-3 font-black text-black transition hover:bg-yellow-300 disabled:opacity-40"
                >
                  <Save size={17} />
                  {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>

                {role !== "owner" && (
                  <p className="rounded-xl bg-red-500/10 p-3 text-center text-xs text-red-400">
                    التعديل الكامل متاح للـ OWNER فقط.
                  </p>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
