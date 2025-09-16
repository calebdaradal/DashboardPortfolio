import { LoginCredentials, AuthResponse, AuthUser } from '@/types/auth';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock API call for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate authentication
    if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
      const user: AuthUser = {
        id: '1',
        name: 'Admin User',
        email: credentials.email,
        role: 'admin',
        permissions: ['users:read', 'users:write', 'products:read', 'products:write', 'analytics:read']
      };
      
      return {
        user,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: 3600
      };
    }
    
    throw new Error('Invalid credentials');
  }

  async logout(): Promise<void> {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async refreshToken(): Promise<AuthResponse> {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('Not implemented');
  }

  async getCurrentUser(): Promise<AuthUser> {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('Not implemented');
  }
}

export const authService = new AuthService();
