import { cn } from '@/lib/utils';
import Link from 'next/link';

import { AiOutlinePython } from 'react-icons/ai';
import { RiJavascriptLine } from "react-icons/ri";
import { TbBrandTypescript } from 'react-icons/tb';

const navItems = [
  { icon: <AiOutlinePython className="w-5 h-5" />, label: 'Python', path: 'python' },
  { icon: <RiJavascriptLine className="w-5 h-5" />, label: 'JavaScript', path: 'javascript' },
  { icon: <TbBrandTypescript className="w-5 h-5" />, label: 'TypeScript', path: 'typescript' },
]

export function PlaygroundSidebar({ language }: { language: string }) {
  const isActive = (path: string) => language === path

  return (
    <div className="hidden md:flex w-12 h-full text-sidebar-foreground border-r border-sidebar-border flex-col items-center py-2 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={`/playground/${item.path}`}
          className={cn(
            'p-2 rounded-md transition-colors',
            'hover:bg-primary/20 hover:text-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
            isActive(item.path) && 'bg-primary/20 text-primary font-medium',
          )}
          title={item.label}
        >
          {item.icon}
          <span className="sr-only">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
