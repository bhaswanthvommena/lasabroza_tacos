const env = import.meta.env;

export const BUSINESS_INFO = {
  name: env.VITE_BUSINESS_NAME ?? "La Sabroza Tacos",
  phoneDisplay: env.VITE_BUSINESS_PHONE_DISPLAY ?? "(512) 803-4565",
  phoneE164: env.VITE_BUSINESS_PHONE_E164 ?? "+15128034565",
  whatsappPhoneE164: env.VITE_WHATSAPP_PHONE_E164 ?? "15128034565",
  addressLine1: env.VITE_BUSINESS_ADDRESS_LINE1 ?? "106 W Parsons St",
  cityStateZip: env.VITE_BUSINESS_CITY_STATE_ZIP ?? "Manor, TX 78653",
  mapsUrl: env.VITE_BUSINESS_MAPS_URL ?? "https://maps.app.goo.gl/mK7HN5zLeja1gDcw6",
  facebookUrl: env.VITE_BUSINESS_FACEBOOK_URL ?? "https://www.facebook.com/lasabrozatacos/",
  instagramUrl: env.VITE_BUSINESS_INSTAGRAM_URL ?? "https://www.instagram.com/lasabrozatacos/",
} as const;
