'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'

export async function authenticate(
  prevState: any,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return error.cause?.err?.message
    }
    throw error
  }
}
