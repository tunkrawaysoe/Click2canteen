// components/menu/SpecialsSectionWrapper.tsx
import { getAllSpecialMenus } from "@/lib/data/menu/menu";
import SpecialsSection from "./SpecialSection";

export default async function SpecialsSectionWrapper() {
  const specialMenus = await getAllSpecialMenus();

  return <SpecialsSection specialMenus={specialMenus} />;
}
