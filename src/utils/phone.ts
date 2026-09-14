/** `tel:` href for a display-formatted number such as "+7 495 532 12 10". */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
