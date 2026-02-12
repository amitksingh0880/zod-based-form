'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const sidebarItems = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/installation" },
        ]
    },
    {
        title: "Components",
        items: [
            { title: "Input", href: "/docs/components/input" },
            { title: "Select", href: "/docs/components/select" },
            { title: "Checkbox", href: "/docs/components/checkbox" },
            { title: "Switch", href: "/docs/components/switch" },
        ]
    },
    {
        title: "Advanced",
        items: [
            { title: "Conditional Logic", href: "/docs/advanced/conditional" },
            { title: "Validation", href: "/docs/advanced/validation" },
        ]
    }
];

export default function DocsSidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed top-20 left-0 bottom-0 w-64 border-r border-white/5 bg-black hidden md:block">
            <ScrollArea className="h-full py-8 px-6">
                <div className="space-y-8">
                    {sidebarItems.map((group, i) => (
                        <div key={i}>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 px-2">
                                {group.title}
                            </h4>
                            <div className="space-y-1">
                                {group.items.map((item, j) => (
                                    <Link
                                        key={j}
                                        href={item.href}
                                        className={cn(
                                            "block px-3 py-2 rounded-lg text-sm transition-all",
                                            pathname === item.href
                                                ? "bg-white/10 text-white font-medium shadow-sm"
                                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
