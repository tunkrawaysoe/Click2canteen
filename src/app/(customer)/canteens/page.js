import Link from "next/link";

export default function Canteen() {
  return (
    <div className="flex flex-col">
      Welcome to the canteens
      <Link href={"/canteens/1/menu"}>Canteen 1</Link>
      <Link href={"/canteens/2/menu"}>Canteen 2</Link>
      <Link href={"/canteens/3/menu"}>Canteen 3</Link>
    </div>
  );
}
