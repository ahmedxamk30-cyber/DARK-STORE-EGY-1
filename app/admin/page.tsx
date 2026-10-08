"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Section = {
  id: string;
  section_type: string;
  title: string;
  content: Record<string, string>;
  sort_order: number;
  visible: boolean;
};

const typeNames: Record<string, string> = {
  hero: "البانر الرئيسي",
  games: "الألعاب",
  services: "الخدمات",
  offers: "العروض",
  products: "المنتجات",
  reviews: "آراء العملاء",
  faq: "الأسئلة الشائعة",
  footer: "الفوتر",
};

export default function Admin() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [owner, setOwner] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [selected, setSelected] = useState<Section | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("builder");

  useEffect(() => {
    async function load() {
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

      setAllowed(true);
      setOwner(profile.role === "owner");

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
          .order("sort_order");

        setSections(data || []);
      }

      setLoading(false);
    }

    load();
  }, [router]);

  async function saveSection() {
    if (!selected || !owner) return;

    setSaving(true);

    await supabase
      .from("site_sections")
      .update({
        title: selected.title,
        content: selected.content,
        visible: selected.visible,
        sort_order: selected.sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selected.id);

    setSections((old) =>
      old.map((x) => (x.id === selected.id ? selected : x))
    );

    setSaving(false);
  }

  async function moveSection(index: number, direction: number) {
    if (!owner) return;

    const target = index + direction;
    if (target < 0 || target >= sections.length) return;

    const current = sections[index];
    const other = sections[target];

    await Promise.all([
      supabase
        .from("site_sections")
        .update({ sort_order: other.sort_order })
        .eq("id", current.id),
      supabase
        .from("site_sections")
        .update({ sort_order: current.sort_order })
        .eq("id", other.id),
    ]);

    const copy = [...sections];
    [copy[index], copy[target]] = [copy[target], copy[index]];

    copy.forEach((x, i) => (x.sort_order = i));

    setSections(copy);
    setSelected(copy[target]);
  }

  async function toggleSection(section: Section) {
    if (!owner) return;

    const visible = !section.visible;

    await supabase
      .from("site_sections")
      .update({ visible })
      .eq("id", section.id);

    setSections((old) =>
      old.map((x) => (x.id === section.id ? { ...x, visible } : x))
    );

    setSelected((x) =>
      x?.id === section.id ? { ...x, visible } : x
    );
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#050505] text-white"
      >
        جاري تحميل DARK CONTROL...
      </main>
    );
  }

  if (!allowed) return null;

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-yellow-400">
              DARK CONTROL
            </h1>
            <p className="text-xs text-zinc-500">
              {owner ? "OWNER • صلاحيات كاملة" : "ADMIN • صلاحيات محدودة"}
            </p>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/login");
            }}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm"
          >
            خروج
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 p-4 lg:grid-cols-[220px_1fr_300px]">
        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-3 px-3 text-xs font-bold text-zinc-500">
            CONTROL CENTER
          </p>

          {[
            ["builder", "🎨 مصمم الموقع"],
            ["products", "📦 المنتجات"],
            ["orders", "🧾 الطلبات"],
            ["users", "👥 المستخدمون"],
            ["settings", "⚙️ الإعدادات"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`mb-2 w-full rounded-xl p-3 text-right text-sm font-bold ${
                tab === id
                  ? "bg-yellow-400 text-black"
                  : "bg-white/5 text-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}
        </aside>

        <section>
          {tab === "builder" ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">مصمم الموقع 🎨</h2>
                  <p className="text-sm text-zinc-500">
                    رتب وعدّل أقسام الموقع بدون لمس الكود.
                  </p>
                </div>

                {!owner && (
                  <span className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">
                    المالك فقط يستطيع التعديل
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    onClick={() => setSelected(section)}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      selected?.id === section.id
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-white/10 bg-white/[0.03]"
                    } ${!section.visible ? "opacity-40" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="cursor-grab text-xl">☰</span>

                      <div className="flex-1">
                        <p className="font-black">
                          {section.title || typeNames[section.section_type]}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {typeNames[section.section_type] ||
                            section.section_type}
                        </p>
                      </div>

                      <button
                        disabled={!owner}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(index, -1);
                        }}
                        className="rounded-lg bg-white/5 px-3 py-2"
                      >
                        ↑
                      </button>

                      <button
                        disabled={!owner}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(index, 1);
                        }}
                        className="rounded-lg bg-white/5 px-3 py-2"
                      >
                        ↓
                      </button>

                      <button
                        disabled={!owner}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(section);
                        }}
                        className="rounded-lg bg-white/5 px-3 py-2"
                      >
                        {section.visible ? "👁️" : "🚫"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="text-2xl font-black">
                {tab === "products"
                  ? "إدارة المنتجات 📦"
                  : tab === "orders"
                  ? "إدارة الطلبات 🧾"
                  : tab === "users"
                  ? "إدارة المستخدمين 👥"
                  : "إعدادات الموقع ⚙️"}
              </h2>
              <p className="mt-3 text-zinc-500">
                القسم موجود في النظام وسيتم ربط أدواته بقاعدة البيانات.
              </p>
            </div>
          )}
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-lg font-black text-yellow-400">
            محرر العنصر
          </h3>

          {!selected ? (
            <p className="mt-5 text-sm text-zinc-500">
              اختار أي قسم من الموقع لعرض أدوات التعديل.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              <label className="block text-sm font-bold">
                اسم القسم
                <input
                  disabled={!owner}
                  value={selected.title}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      title: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black p-3 outline-none"
                />
              </label>

              <label className="block text-sm font-bold">
                النص الرئيسي
                <textarea
                  disabled={!owner}
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
                  className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-black p-3 outline-none"
                />
              </label>

              <label className="block text-sm font-bold">
                الوصف
                <textarea
                  disabled={!owner}
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
                  className="mt-2 min-h-20 w-full rounded-xl border border-white/10 bg-black p-3 outline-none"
                />
              </label>

              <button
                disabled={!owner || saving}
                onClick={saveSection}
                className="w-full rounded-xl bg-yellow-400 p-3 font-black text-black disabled:opacity-40"
              >
                {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
