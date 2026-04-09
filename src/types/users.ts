import { Base, UUID } from "./common"

export type User = Base & {
    id: UUID
    paud_id?: string | null
    role_id?: string | null
    name: string
    email: string
    role: string
    role_name: string
    paud_name: string
}