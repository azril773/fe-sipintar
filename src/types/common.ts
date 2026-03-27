import React from "react"

export type Route = {
    href: string
    label: string
    icon: React.ReactNode
    childrens?: Route[]
}