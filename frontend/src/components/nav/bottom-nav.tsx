"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, CheckCircle2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Exam", href: "/exam", icon: BookOpen },
  { name: "Scores", href: "/scores", icon: CheckCircle2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full border-t bg-background">
      <div className="flex justify-center gap-10 lg:justify-center lg:gap-10">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex flex-col items-center p-2 text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <LinkIcon className="h-6 w-6" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 