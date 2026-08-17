/** Owner id of the Prizma Flow VK Video community (negative for communities). */
const VK_OWNER_ID = -228882614;

/**
 * Builds an embeddable VK Video player URL.
 *
 * The public `vkvideo.ru/video-<oid>_<id>` links are viewer pages and cannot be
 * framed — `vk.com/video_ext.php` is the embed endpoint (the `vkvideo.ru` one
 * bounces through an autologin redirect).
 */
export function vkEmbedUrl(
  videoId: number,
  params: Record<string, string> = {},
): string {
  const search = new URLSearchParams({
    oid: String(VK_OWNER_ID),
    id: String(videoId),
    hd: "2",
    ...params,
  });
  return `https://vk.com/video_ext.php?${search.toString()}`;
}
