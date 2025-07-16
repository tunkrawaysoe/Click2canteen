
import { getMenuWithAddons } from "@/lib/data/menu/menu";
import MenuDetailClient from "./MenuDetailClient";


export default async function MenuDetailPage({ params }) {
  const menuId = await params.menuid;
  console.log(menuId)
  

  const menu = await getMenuWithAddons(menuId);
  console.log(menu)
   
  // includes add-ons
  return <MenuDetailClient menu={menu} />;
}
