import { icons } from "lucide-react";

interface NavigationItem {
    icon: keyof typeof icons;
    title: string;
    href: string;
}

const NavigationData: NavigationItem[] = [
    {
        icon: "House",
        title: "Home",
        href: "/",
    },
    {
        icon: "Settings",
        title: "Settings",
        href: "/settings",
    },
    {
        icon: "Info",
        title: "About",
        href: "/about",
    },
];

export default function Navigation() {
    return (
        <div className="z-2 fixed bottom-0 flex h-20 w-full justify-between gap-8 bg-green-700">
            {NavigationData.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                    <a
                        key={index}
                        href={item.href}
                        className="flex h-full w-full flex-col items-center justify-center text-white"
                    >
                        <Icon size={24} />
                        <span className="text-xs">{item.title}</span>
                    </a>
                );
            })}
        </div>
    );
}
