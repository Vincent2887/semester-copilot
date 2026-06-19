"use main";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  FileText, 
  Cpu, 
  Bookmark, 
  Briefcase, 
  Layers, 
  Moon, 
  Sun 
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
}

const navigationItems: SidebarItem[] = [
  {
    name: "Previous Papers",
    href: "/dashboard",
    icon: BookOpen,
  },
  {
    name: "Notes Workspace",
    href: "/dashboard/notes",
    icon: FileText,
  },
  {
    name: "AI Study Engine",
    href: "/dashboard/ai-engine",
    icon: Cpu,
  },
  {
    name: "Bookmarks",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
  },
  {
    name: "Placement Hub",
    href: "/placement", // Fixed path directly to root to resolve 404
    icon: Briefcase,
  },
  {
    name: "Lab Practicals",
    href: "/dashboard/labs",
    icon: Layers,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
      {/* Brand Logo Header */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Topperdeck
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Your AI Study Partner
        </p>
      </div>

      {/* Navigation Options List */}
      <nav className="flex-1 space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-stone-200 text-stone-950 dark:bg-stone-800 dark:text-stone-50"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800/50 dark:hover:text-stone-50"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Canvas Mode Layout Switcher */}
      <div className="border-t border-stone-200 pt-4 dark:border-stone-800">
        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800">
          <span className="flex items-center gap-3">
            <Sun className="h-4 w-4" />
            Theme Canvas
          </span>
        </button>
      </div>
    </aside>
  );
}