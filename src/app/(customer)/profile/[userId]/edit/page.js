
import UpdateProfileForm from "@/components/form/UpdateProfileForm";
import { getUser } from "@/lib/data/user/user";

export default async function EditPage({ params }) {
  const { userId } = await params;
  const user = await getUser();
  return (
    <>
      <div>
        <UpdateProfileForm user={user} />
      </div>
    </>
  );
}
