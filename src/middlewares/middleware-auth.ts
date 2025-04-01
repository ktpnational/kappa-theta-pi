"user server"

import { auth } from '@/auth';
import { headers } from 'next/headers';

export async function getSessionForMiddleware() {
  return await auth.api.getSession({
    headers: await headers()
  })
  
}
