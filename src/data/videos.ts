import { withPrefix } from "gatsby";
import { vkEmbedUrl } from "../utils/vkVideo";

/**
 * Single source of truth for every video on the site.
 *
 * Each slot below is either `ready` (a real clip plays) or `pending` (the tile
 * renders in the same approved styling, minus the player). To publish a clip
 * that has just been recorded, change that one slot — nothing else in the
 * codebase needs to move:
 *
 *   heroShowreel = pending   ->  heroShowreel = vk(456239140)
 *   heroShowreel = pending   ->  heroShowreel = file("/videos/hero.mp4")
 *
 * Keep the slot as `pending` rather than pointing it at an unrelated clip: the
 * placeholder is honest about what is not filmed yet, a stand-in clip is not.
 */

export type VideoSlot =
  /** Hosted on the Prizma Flow VK Video community. */
  | { readonly status: "ready"; readonly kind: "vk"; readonly id: number }
  /** Self-hosted file under `static/` — pass the path as `/videos/name.mp4`. */
  | { readonly status: "ready"; readonly kind: "file"; readonly src: string }
  /** Not filmed yet; the UI renders a placeholder instead of a broken player. */
  | { readonly status: "pending" };

/** Marks a slot whose clip has not been delivered yet. */
export const pending: VideoSlot = { status: "pending" };

/** Marks a slot served from VK Video. */
export const vk = (id: number): VideoSlot => ({
  status: "ready",
  kind: "vk",
  id,
});

/** Marks a slot served from a file in `static/`. */
export const file = (src: string): VideoSlot => ({
  status: "ready",
  kind: "file",
  src,
});

export const isReady = (
  slot: VideoSlot,
): slot is Extract<VideoSlot, { status: "ready" }> => slot.status === "ready";

/**
 * Resolves a ready slot to the props a player needs: VK slots render in an
 * iframe, file slots in a `<video>`. `params` only applies to VK slots.
 */
export function resolveVideo(
  slot: VideoSlot,
  params: Record<string, string> = {},
): { embedSrc: string; src?: undefined } | { src: string; embedSrc?: undefined } | null {
  if (!isReady(slot)) return null;
  return slot.kind === "vk"
    ? { embedSrc: vkEmbedUrl(slot.id, params) }
    : { src: withPrefix(slot.src) };
}

// ---------------------------------------------------------------------------
// Slots
// ---------------------------------------------------------------------------

/** Short showreel behind the hero — no narration, so one clip serves every locale. */
export const heroShowreel: VideoSlot = vk(456239131);

/** Narrated product tour, recorded once per language. */
export const productTourByLanguage: Record<string, VideoSlot> = {
  en: vk(456239130),
  ru: vk(456239133),
  tr: vk(456239132),
};

/** Cards of the Features grid, in display order; keys match `features.items.*`. */
export const featureKeys = [
  "budget",
  "projects",
  "approvals",
  "routes",
  "control",
  "history",
  "export",
  "monitoring",
  "integration",
  "personnel",
  "hr",
  "ar",
] as const;

export type FeatureKey = (typeof featureKeys)[number];

/** A narrated module walkthrough, self-hosted under `static/videos/features/<lang>/`. */
export interface FeatureVideo {
  src: string;
  poster: string;
  /** Name of the walkthrough; replaces the card label when the video exists. */
  title: string;
  /** Running time shown on the card, m:ss. */
  duration: string;
}

const featureVideo = (
  lang: string,
  n: string,
  title: string,
  duration: string,
): FeatureVideo => ({
  src: `/videos/features/${lang}/${n}.mp4`,
  poster: `/videos/features/${lang}/${n}.jpg`,
  title,
  duration,
});

/**
 * Walkthrough videos per site language. Video N belongs to card N of the grid.
 * A card without a video in the current language keeps its placeholder tile,
 * so add an entry here (and the two files) as each recording is delivered.
 * Source recordings are compressed with:
 *   ffmpeg -i in.mov -vf "fps=24,scale=1280:-2" -c:v libx264 -preset slow -crf 28
 *     -tune animation -pix_fmt yuv420p -c:a aac -b:a 64k -ac 1 -movflags +faststart out.mp4
 */
const featureVideos: Record<string, Partial<Record<FeatureKey, FeatureVideo>>> = {
  tr: {
    budget: featureVideo("tr", "01", "Satın Alma Siparişi", "5:30"),
    projects: featureVideo("tr", "02", "Ödeme Talebi", "5:31"),
    approvals: featureVideo("tr", "03", "ERP — 1C Entegrasyonu", "3:11"),
    routes: featureVideo("tr", "04", "İK — Personel Yönetimi", "3:53"),
    control: featureVideo("tr", "05", "İK — Puantaj ve Bordro", "4:13"),
    history: featureVideo("tr", "06", "Ekipman", "4:23"),
    export: featureVideo("tr", "07", "İSG — Projeler ve Uygunsuzluklar", "3:24"),
    monitoring: featureVideo("tr", "08", "İSG — Denetim ve Takip", "4:53"),
    integration: featureVideo("tr", "09", "Legal — Dava ve Duruşma Yönetimi", "4:02"),
    personnel: featureVideo("tr", "10", "Disk — Doküman Yönetimi", "4:10"),
    hr: featureVideo("tr", "11", "Raporlar — Finansal Dashboard", "5:47"),
    ar: featureVideo("tr", "12", "Raporlar — Proje Dashboard", "6:53"),
  },
};

export const getFeatureVideo = (
  language: string,
  key: FeatureKey,
): FeatureVideo | undefined => {
  const video = featureVideos[language]?.[key];
  return video && { ...video, src: withPrefix(video.src), poster: withPrefix(video.poster) };
};
