import items from "@/items.json";
export const dynamic = "force-static";
export default function sitemap() {
  const filteredList = items.charitems.slice(1).flatMap((i) => i.items);
  /*return filteredList?.map(character => ({
        character: character.name.toLowerCase(),
    }));*/
  return [
    {
      url: "https://touhou.ir/home",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://touhou.ir/characters",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...filteredList.map((character) => {
      return {
        url: `https://touhou.ir/characters/${character.name.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      };
    }),
    {
      url: "https://touhou.ir/games",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://touhou.ir/games/soku",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
