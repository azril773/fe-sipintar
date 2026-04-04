import { Base, UUID } from "./common"

export type User = Base & {
    id: UUID
    role_id: string
    name: string
    email: string
    role: string
    role_name: string
    paud_name: string
}