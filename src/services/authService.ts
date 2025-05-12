
// Mock user data for testing
type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Administrador',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Usuário Teste',
    role: 'user',
  },
];

// Auth tokens are stored in localStorage
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

/**
 * Attempts to log in a user with the provided credentials
 */
export const loginUser = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if email exists
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }
  
  // In a real app, you would hash and compare passwords
  // For demo, we'll accept any password that meets the length requirement
  if (password.length < 8) {
    throw new Error('INVALID_PASSWORD');
  }
  
  // Generate a fake token
  const token = `token_${Math.random().toString(36).substring(2)}`;
  
  // Store auth data
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  
  return true;
};

/**
 * Logs out the current user
 */
export const logoutUser = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  window.location.href = '/login';
};

/**
 * Checks if a user is currently logged in
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Gets the current authenticated user
 */
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};
