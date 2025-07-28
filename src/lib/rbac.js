// lib/rbac.js

export const roles = {
  SYSTEM_ADMIN: [
    "read:user",
    "read:restaurant",
    "create:restaurant",
    "update:restaurant",
    "delete:restaurant",
  ],
  ADMIN: [
    "create:menu",
    "read:menu",
    "update:menu",
    "delete:menu",
    "read:restaurant",
    "read:order",
  ],
  CUSTOMER: ["read:menu", "read:restaurant"],
  GUEST: ["read:restaurant"],
};

/**
 * Check if user has permission for an action on a resource.
 * SYSTEM_ADMIN: full access as defined in the list
 * ADMIN: can access only resources they own (by restaurantId)
 * Others: role-based access
 *
 * @param {Object} user - user object with `role` and optionally `restaurantId`
 * @param {string} action - e.g. 'create', 'read', 'update', 'delete'
 * @param {string} resource - e.g. 'menu', 'restaurant', 'user'
 * @param {string} [resourceRestaurantId] - restaurant ID of the resource, used for ADMIN role
 * @returns {boolean}
 */
export function hasPermission(user, action, resource, resourceRestaurantId) {
  if (!user?.role) return false;

  const permission = `${action}:${resource}`;
  const userPermissions = roles[user.role] || [];

  if (userPermissions.includes("*")) {
    return true;
  }

  if (!userPermissions.includes(permission)) {
    return false;
  }

  if (user.role === "ADMIN") {
    // ADMINs can only access resources tied to their own restaurant
    if (resourceRestaurantId) {
      return user.restaurantId === resourceRestaurantId;
    }
    return false;
  }

  return true;
}
