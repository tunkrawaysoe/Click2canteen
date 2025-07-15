import AddMenuFormClient from "./addmenu";

export default async function AddMenuPage({ params }) {
  const {canteenId}= await params;
  return <AddMenuFormClient canteenId={canteenId} />;
}
