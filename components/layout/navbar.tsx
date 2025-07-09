"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
        label: "User List",
    },
];


export default function Navbar() {
    const pathname = usePathname()

    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                {links.map(({ href, label }) => {
                    const isActive = pathname === href

                    return (
                        <NavigationMenuItem key={href}>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle({
                                    className: isActive ? "ring-2 ring-purple-600 ring-offset-2 text-purple-600 hover:text-purple-600 hover:ring-1 hover:ring-purple-600 transition-all" : "hover:text-purple-600 hover:ring-1 hover:ring-purple-600 text-purple-600 transition-all"
                                })}
                            >
                                <Link href={href}>{label}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}