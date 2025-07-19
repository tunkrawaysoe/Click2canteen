// lib/rbac.js
export const roles = {
  SYSTEM_ADMIN: ["*"], // full access
  ADMIN: ["create:menu", "read:menu", "update:menu", "delete:menu"],
  CUSTOMER: ["read:menu"],
};

/**
 * Check if user has permission for action on resource.
 * @param {Object} user - user object with role property
 * @param {string} action - e.g. 'create', 'read', 'update', 'delete'
 * @param {string} resource - e.g. 'menu', 'restaurant'
 * @returns {boolean}
 */
export function hasPermission(user, action, resource) {
  if (!user?.role) return false;

  const permission = `${action}:${resource}`;
  const userPermissions = roles[user.role] || [];

  if (userPermissions.includes("*")) {
    return true;
  }

  return userPermissions.includes(permission);
}
