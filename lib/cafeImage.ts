const CLOUD_NAME = "dtym11krp";
const BASE_PATH = "palembang-coffee/cafes";

type ImageType = "cover" | "gallery" | "menu";

const TRANSFORMS: Record<ImageType, string> = {
  cover: "w_1600,h_900,c_fill,g_auto,q_auto,f_auto",
  gallery: "w_900,h_600,c_fill,g_auto,q_auto,f_auto",
  menu: "w_800,c_limit,q_auto,f_auto",
};

export function cafeImage(slug: string, path: string, type: ImageType) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${TRANSFORMS[type]}/${BASE_PATH}/${slug}/${path}.jpg`;
}
