import Test from "@/components/Test";
import { pusherServer } from "@/lib/pusher";

// Server Action
export async function triggerPusher(formData) {
  "use server";
  console.log("working");

  await pusherServer.trigger("test-channel", "test-event", {
    message: "Hello from Server Action!",
  });
}

export default function PusherTestPage() {
  const cluster = process.env.PUSHER_CLUSTER || "ap1"; // Pass this as prop

  return (
    <>
      <h1>Pusher Server Action Test</h1>

      <form action={triggerPusher}>
        <button type="submit">Trigger Pusher Event</button>
      </form>

      <Test />
    </>
  );
}
