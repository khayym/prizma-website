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
 *   budget: pending,              ->  budget: vk(456239140),
 *   budget: pending,              ->  budget: file("/videos/budget.mp4"),
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

/**
 * Per-feature preview clips for the Features grid.
 *
 * All twelve are awaiting capture. Until each one lands, its card shows the
 * branded placeholder; the keys match `features.items.*` in the locale files.
 */
export const featurePreviews = {
  budget: pending,
  projects: pending,
  approvals: pending,
  routes: pending,
  control: pending,
  history: pending,
  export: pending,
  monitoring: pending,
  integration: pending,
  personnel: pending,
  hr: pending,
  ar: pending,
} satisfies Record<string, VideoSlot>;

export type FeatureKey = keyof typeof featurePreviews;
