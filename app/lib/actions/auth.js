'use server';

import { cookies } from 'next/headers';

export async function setAuthCookie(token) {
  cookies().set({
    name: 'token',
    value: token,
    httpOnly:false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    sameSite: 'strict'
  });
}