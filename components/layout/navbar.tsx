"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const links = [
    {
        href: "/users",
        label: "User Lists",
    },
    {
        href: "/about",
        label: "About",
    },
];


export default function Navbar() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                {links.map(({ href, label }) => (
                    <NavigationMenuItem key={href}>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={href}>{label}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}