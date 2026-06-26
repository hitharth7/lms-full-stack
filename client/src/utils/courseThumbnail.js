export const thumbnailThemes = [
  {
    label: "Ocean Blue",
    value: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
    className: "thumbnail-theme-ocean"
  },
  {
    label: "Cosmic Purple",
    value: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
    className: "thumbnail-theme-cosmic"
  },
  {
    label: "Sunset Amber",
    value: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    className: "thumbnail-theme-sunset"
  },
  {
    label: "Emerald Forest",
    value: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    className: "thumbnail-theme-emerald"
  },
  {
    label: "Rose Petal",
    value: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    className: "thumbnail-theme-rose"
  }
];

export const isGradientThumbnail = (courseThumbnail) => {
  return Boolean(courseThumbnail?.startsWith("linear-gradient"));
};

export const getThumbnailThemeClass = (courseThumbnail) => {
  return thumbnailThemes.find((theme) => theme.value === courseThumbnail)?.className || "thumbnail-theme-default";
};
