'use client';

import { useState } from 'react';

import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi login - replace dengan actual authentication
    setTimeout(() => {
      console.log('Login attempt with:', { email, password });
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-secondary/20">
        {/* Header Icon */}
        <div className="bg-gradient-to-r from-primary to-blue-600 px-6 pt-8 pb-6 text-center rounded-t-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              📚
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">PAUD Admin</h1>
          <p className="text-blue-100 text-sm mt-2">Sistem Manajemen Pendidikan Anak Usia Dini</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@paud.gov.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-2 border-gray-200 text-foreground placeholder:text-gray-400 h-11 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-semibold text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-2 border-gray-200 text-foreground placeholder:text-gray-400 h-11 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg text-white font-semibold text-base transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Memproses...
                </span>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-muted-foreground text-center mb-3 font-medium">Demo Credentials</p>
            <div className="space-y-2 text-xs bg-secondary/10 p-3 rounded-lg border border-secondary/20">
              <p className="text-muted-foreground"><span className="font-semibold">Email:</span> admin@paud.gov.id</p>
              <p className="text-muted-foreground"><span className="font-semibold">Password:</span> password123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 rounded-b-lg border-t border-gray-200">
          <p className="text-xs text-center text-muted-foreground">
            © 2024 Sistem PAUD. Hak Cipta Dilindungi.
          </p>
        </div>
      </Card>
    </div>
  );
}
