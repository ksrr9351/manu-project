// lib/auth/client.ts
import type { SignUpParams, SignInWithPasswordParams } from '@/types/user';
import type { User } from '@/types/user';

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const data = await response.json();
        return { error: data.error || 'Something went wrong' };
      }

      return {};
    } catch (error) {
      return { error: 'Something went wrong' };
    }
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string; userId?: string }> {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const data = await response.json();
        return { error: data.error || 'Something went wrong' };
      }

      // If login is successful, return user ID and store it in sessionStorage
      const data = await response.json();
      if (data.userId) {
        sessionStorage.setItem('auth-session', data.userId);
        return { userId: data.userId };
      }

      return {};
    } catch (error) {
      return { error: 'Something went wrong' };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const token = sessionStorage.getItem('auth-session');
      
      if (!token) {
        return { data: null };
      }

      // Mock user data retrieval; replace this with your actual logic
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      
      return { data: user };
    } catch (error) {
      return { error: 'Something went wrong' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    try {
      sessionStorage.removeItem('auth-session');
      sessionStorage.removeItem('user'); // Optionally clear user data if stored
      return {};
    } catch (error) {
      return { error: 'Something went wrong' };
    }
  }
}

export const authClient = new AuthClient();
