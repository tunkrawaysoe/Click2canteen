import BackButton from "@/components/BackButton";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getUser } from "@/lib/data/user/user";

export default async function EditPage({ params }) {
  const { userId } = await params;
  const user = await getUser();
  return (
    <>
      <UpdateProfileForm user={user} />
      
    </>
  );
}
