import z from "zod"

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email().endsWith('@gmail.com'),
    password: z.string().min(6)
})

export const SignInSchema = z.object({
    email: z.string().email().endsWith('@gmail.com'),
    password: z.string().min(6)
})

export const CreateBlogSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const UpdateBlogSchema = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type SignUpType = z.infer<typeof SignUpSchema>
export type SignInType = z.infer<typeof SignInSchema>
export type CreateBlogType = z.infer<typeof CreateBlogSchema>
export type UpdateBlogType = z.infer<typeof UpdateBlogSchema>