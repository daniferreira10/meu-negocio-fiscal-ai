
// Mock user data for testing
type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

// Initial mock users
const initialMockUsers: User[] = [
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
const REGISTERED_USERS_KEY = 'registered_users';

/**
 * Ensure localStorage is available and working
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('LocalStorage is not available:', e);
    return false;
  }
}

/**
 * Get all registered users from localStorage
 */
const getRegisteredUsers = (): User[] => {
  if (!isLocalStorageAvailable()) {
    console.error('LocalStorage unavailable, returning empty array');
    return [];
  }
  
  try {
    const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);
    const registeredUsers = storedUsers ? JSON.parse(storedUsers) : [];
    console.log('Retrieved registered users:', registeredUsers);
    return registeredUsers;
  } catch (error) {
    console.error('Error getting registered users:', error);
    return [];
  }
};

/**
 * Get all users (including initial mock users and registered ones)
 */
const getAllUsers = (): User[] => {
  const registeredUsers = getRegisteredUsers();
  console.log('All users (combined):', [...initialMockUsers, ...registeredUsers]);
  return [...initialMockUsers, ...registeredUsers];
};

/**
 * Save registered users to localStorage
 */
const saveRegisteredUsers = (users: User[]): boolean => {
  if (!isLocalStorageAvailable()) {
    console.error('LocalStorage unavailable, could not save users');
    return false;
  }
  
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    console.log('Saved registered users:', users);
    return true;
  } catch (error) {
    console.error('Error saving registered users:', error);
    return false;
  }
};

/**
 * Register a new user
 */
export const registerUser = async (email: string, password: string): Promise<boolean> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allUsers = getAllUsers();
  
  // Check if email already exists
  if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    console.error('Registration failed: Email already exists:', email);
    throw new Error('EMAIL_ALREADY_EXISTS');
  }
  
  // Create new user object
  const newUser: User = {
    id: `user_${Math.random().toString(36).substring(2)}`,
    email,
    name: email.split('@')[0],
    role: 'user',
  };
  
  try {
    const registeredUsers = getRegisteredUsers();
    
    // Store user password (in a real app, this would be hashed)
    localStorage.setItem(`password_${newUser.id}`, password);
    
    // Add to registered users
    registeredUsers.push(newUser);
    
    // Debug: Log antes de salvar
    console.log('About to save registered users:', registeredUsers);
    
    // Save updated registered users list
    if (!saveRegisteredUsers(registeredUsers)) {
      throw new Error('Failed to save user');
    }
    
    // Debug: Log após salvar
    console.log('Successfully saved users, checking storage...');
    console.log('Current stored users:', getRegisteredUsers());
    
    // Auto login after registration
    const token = `token_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
    
    console.log('User registered and logged in:', newUser);
    
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('REGISTRATION_FAILED');
  }
};

/**
 * Verifies if the email exists in the system
 */
const checkEmailExists = (email: string): User | null => {
  const allUsers = getAllUsers();
  const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  return user || null;
}

/**
 * Verify password for a specific user
 */
const verifyPassword = (userId: string, password: string): boolean => {
  const storedPassword = localStorage.getItem(`password_${userId}`);
  return storedPassword === password;
}

/**
 * Attempts to log in a user with the provided credentials
 */
export const loginUser = async (email: string, password: string, rememberMe: boolean): Promise<{ success: boolean, message: string }> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    console.log('Login attempt with email:', email);
    
    // Check if email exists
    const user = checkEmailExists(email);
    
    // If email doesn't exist
    if (!user) {
      console.log('Email not found:', email);
      return { 
        success: false, 
        message: 'E-mail não encontrado. Verifique o e-mail digitado ou cadastre uma nova conta.' 
      };
    }
    
    // Verify password
    const isPasswordValid = verifyPassword(user.id, password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return { 
        success: false, 
        message: 'Senha incorreta. Por favor, tente novamente.' 
      };
    }
    
    // Login successful - create token and store user data
    const token = `token_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    
    console.log('User successfully logged in:', user);
    
    return { success: true, message: 'Login realizado com sucesso!' };
  } catch (error) {
    console.error('Error during login:', error);
    return { 
      success: false, 
      message: 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.' 
    };
  }
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
