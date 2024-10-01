export const user_role = {
  admin: 'admin',
  user: 'user',
} as const;

export const user_status = {
  active: 'active',
  blocked: 'blocked',
} as const;

export const UserSearchableFields = [
  'name',
  'email',
  'phone',
  'role',
  'status',
];
