import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeQuest",
    short_name: "CodeQuest",
    description: "Learn programming languages like a chieftain.",
    start_url: "/",
    display: "standalone",
    background_color: "#160844",
    theme_color: "#ffd66b",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
