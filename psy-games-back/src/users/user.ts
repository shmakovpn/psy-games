/**
 * User entity
 */
export interface User {
  userId: number;
  username: string;
}

/**
 * User with password entity
 */
export interface UserWithPassword extends User {
  password: string;
}
