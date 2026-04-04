import React from "react"


export type UUID = string

export type Base = {
    created_at: string
    updated_at: string
}

export type Route = {
    href: string
    label: string
    icon: React.ReactNode
    childrens?: Route[]
}

