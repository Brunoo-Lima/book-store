'use client';

import LoginForm from '@/components/pages/login/login-form';
import RegisterForm from '@/components/pages/login/register-form';
import { useState } from 'react';

export default function Login() {
  const [steps, setSteps] = useState<'Login' | 'Register'>('Login');

  return (
    <section className="items-center justify-center bg-[#252525]">
      {steps === 'Login' && <LoginForm create={() => setSteps('Register')} />}
      {steps === 'Register' && <RegisterForm back={() => setSteps('Login')} />}
    </section>
  );
}
