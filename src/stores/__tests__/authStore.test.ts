import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useAuthStore } from '@/stores/authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useAuthStore());
    
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles successful login', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    await act(async () => {
      await result.current.login(mockCredentials);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.email).toBe('test@example.com');
    expect(result.current.token).toBeTruthy();
  });

  it('handles logout correctly', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    // First login
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    // Then logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('handles login failure with invalid credentials', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    const mockCredentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    };

    await act(async () => {
      try {
        await result.current.login(mockCredentials);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('updates loading state during async operations', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    let loginPromise: Promise<void>;

    act(() => {
      // Start the login operation synchronously
      loginPromise = result.current.login({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    // Check loading state is set to true after starting the operation
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await loginPromise;
    });

    // Check loading state is reset after operation
    expect(result.current.isLoading).toBe(false);
  });

  it('handles token refresh', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    // Set initial authenticated state
    act(() => {
      useAuthStore.setState({
        isAuthenticated: true,
        token: 'old-token',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
          permissions: ['users:read', 'users:write']
        }
      });
    });

    await act(async () => {
      await result.current.refreshToken();
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBeTruthy();
    expect(result.current.token).not.toBe('old-token');
  });
});
