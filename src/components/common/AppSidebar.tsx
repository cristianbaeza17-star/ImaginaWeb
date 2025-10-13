'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Sparkles,
  Shuffle,
  BrainCircuit,
  Lightbulb,
  Users,
} from 'lucide-react';
import { Logo } from './icons';

const links = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    label: 'Herramientas',
    isLabel: true,
  },
  {
    href: '/prompts',
    label: 'Generador de Prompts',
    icon: Sparkles,
  },
  {
    href: '/scenarios',
    label: 'Escenarios Aleatorios',
    icon: Shuffle,
  },
  {
    href: '/associate',
    label: 'Asociación de Ideas',
    icon: BrainCircuit,
  },
  {
    label: 'Recursos',
    isLabel: true,
  },
  {
    href: '/exercises',
    label: 'Ejercicios Creativos',
    icon: Lightbulb,
  },
  {
    href: '/gallery',
    label: 'Galería Comunitaria',
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tighter font-headline">
              ImaginaWeb
            </h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) =>
            link.isLabel ? (
              <SidebarGroup key={link.label}>
                <SidebarGroupLabel>{link.label}</SidebarGroupLabel>
              </SidebarGroup>
            ) : (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href!} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={link.label}
                  >
                    <a>
                      <link.icon />
                      <span>{link.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
