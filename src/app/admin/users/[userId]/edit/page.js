import prisma from "@/lib/prisma";
import UserEditForm from "@/components/form/UserEditForm";
import BackButton from "@/components/buttons/BackButton";

export default async function UserEditPage({ params }) {
  const { userId } = await params;

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Fetch all restaurants
  const restaurants = await prisma.restaurant.findMany({
    select: { id: true, name: true },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={{ padding: 20 }}>
       <BackButton/>
      <UserEditForm user={user} restaurants={restaurants} />
     
    </div>
  );
}
