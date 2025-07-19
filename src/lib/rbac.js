// lib/rbac.js

export const roles = {
  SYSTEM_ADMIN: ["*"], // full access
  ADMIN: [
    "create:menu",
    "read:menu",
    "update:menu",
    "delete:menu",
    "read:restaurant",

    // add more restaurant permissions as needed
  ],
  CUSTOMER: [
    "read:menu",
    "read:restaurant", // allow customers to see restaurants
  ],
  GUEST: ["read:restaurant"], // no or minimal permissions
};

/**
 * Check if user has permission for action on resource.
 * For ADMIN role, restrict access only to their assigned restaurant.
 * Other roles ignore restaurant ownership.
 *
 * @param {Object} user - user object with role and optionally restaurantId
 * @param {string} action - e.g. 'create', 'read', 'update', 'delete'
 * @param {string} resource - e.g. 'menu', 'restaurant'
 * @param {string} [resourceRestaurantId] - the restaurant ID of the resource to verify ownership
 * @returns {boolean}
 */
export function hasPermission(user, action, resource, resourceRestaurantId) {
  if (!user?.role) return false;

  const permission = `${action}:${resource}`;
  const userPermissions = roles[user.role] || [];

  if (userPermissions.includes("*")) {
    // SYSTEM_ADMIN or other roles with full access
    return true;
  }

  if (!userPermissions.includes(permission)) {
    // User lacks this permission completely
    return false;
  }

  if (user.role === "ADMIN") {
    // ADMIN must own the resource (match restaurantId)
    if (resourceRestaurantId) {
      return user.restaurantId === resourceRestaurantId;
    }
    // deny if no resourceRestaurantId provided for ownership check
    return false;
  }

  // Other roles with permission granted, no ownership check
  return true;
}
