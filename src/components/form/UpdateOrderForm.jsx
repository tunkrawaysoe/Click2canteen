"use server";
import { updateOrderStatus } from "@/actions/orders";

export default function EditOrder({ params }) {
  const orderId = params.orderId;

  return (
    <form action={updateOrderStatus} className="space-y-4">
      <input type="hidden" name="orderId" value={orderId} />

      <label htmlFor="status" className="block font-semibold">
        Status:
      </label>
      <select name="status" id="status" className="border rounded px-3 py-2">
        <option value="PENDING">Pending</option>
        <option value="PREPARING">Preparing</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
}
