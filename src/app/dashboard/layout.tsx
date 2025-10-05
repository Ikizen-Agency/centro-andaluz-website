
'use client';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Newspaper, Calendar, Clapperboard, LogOut, Loader } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import { useSupabase, useSupabaseUser } from "@/supabase/provider";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isUserLoading } = useSupabaseUser();
  const { client } = useSupabase();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await client.auth.signOut();
      toast({
        title: "Sesión Cerrada",
        description: "Has cerrado sesión con éxito."
      });
      // Redirect handled by the effect below
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cerrar la sesión."
      });
    }
  };

  const navLinks = [
    { href: "/dashboard", label: "Panel", icon: Home },
    { href: "/dashboard/events", label: "Eventos", icon: Calendar },
    { href: "/dashboard/penas", label: "Peñas", icon: Clapperboard },
    { href: "/dashboard/articles", label: "Artículos", icon: Newspaper },
  ];

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
            <div className="p-2 flex items-center justify-center">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Logo textVisible={false} className="h-8 w-8" />
                </Link>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                {navLinks.map((link) => (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton 
                            asChild
                            isActive={pathname === link.href} 
                            tooltip={link.label}
                        >
                          <Link href={link.href}>
                            <link.icon />
                            <span>{link.label}</span>
                          </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} tooltip="Cerrar Sesión">
                      <LogOut />
                      <span>Cerrar Sesión</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-2">
            <h1 className="flex-1 text-lg font-semibold md:text-2xl capitalize">
                {pathname.split('/').pop()?.replace('-', ' ') || 'Panel'}
            </h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
