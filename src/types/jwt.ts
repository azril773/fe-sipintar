import { UUID } from "./common"

export type AccessTokenClaim = {
    user_id: UUID
    paud_id: UUID
    role_id: UUID
    username: string
    paud_name: string
    role_name: string
    subdomain: string
    status: string
}