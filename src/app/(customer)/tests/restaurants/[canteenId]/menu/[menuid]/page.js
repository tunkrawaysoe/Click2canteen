
import { getMenuWithAddons } from "@/lib/data/menu/menu";
import MenuDetailClient from "@/components/MenuDetailClient";


export default async function MenuDetailPage({ params }) {
  const {menuid} = await params;
  console.log(menuid)
  

  const menu = await getMenuWithAddons(menuid);
  console.log(menu)
   
  // includes add-ons
  return <MenuDetailClient menu={menu} />;
}
