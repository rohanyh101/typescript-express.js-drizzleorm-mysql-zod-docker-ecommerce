import express from 'express'
import type { z } from 'zod'
import type { TypeNewUser } from '../../drizzle/schema'

// not using the defined type siince... it's not working
// export type User = z.infer<typeof signupSchema>

// not working currently..
declare module 'express' {
    export interface Requestt {
        user: TypeNewUser
    }
}