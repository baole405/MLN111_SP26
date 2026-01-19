"use client"

import * as React from "react"
import {
    BookOpen,
    Brain,
    Code,
    Gamepad2,
    LayoutDashboard,
    MessageSquare,
    MousePointer2,
    Network,
    Terminal
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar"
import { ScoreDisplay } from "@/components/score-display"

// Menu items.
const items = [
    {
        title: "Tổng Quan",
        url: "#overview",
        icon: LayoutDashboard,
    },
    {
        title: "Ba Quy Luật",
        url: "#laws",
        icon: BookOpen,
    },
    {
        title: "Sáu Phạm Trù",
        url: "#categories",
        icon: Network,
    },
    {
        title: "Trải Nghiệm",
        url: "#interactive",
        icon: Gamepad2,
    },
    {
        title: "Kéo Thả",
        url: "#matcher",
        icon: MousePointer2,
    },
    {
        title: "Arena",
        url: "#arena",
        icon: Code,
    },
    {
        title: "Mind Map",
        url: "#mind-map",
        icon: Brain,
    },
    {
        title: "Đối Thoại Triết Học",
        url: "/chat",
        icon: MessageSquare,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setOpen, open } = useSidebar()

    return (
        <Sidebar
            collapsible="icon"
            className="border-r-0"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            {...props}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Terminal className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Mã Nguồn</span>
                                    <span className="">Của Thực Tại</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="group-data-[collapsible=icon]:hidden">
                    <ScoreDisplay />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
