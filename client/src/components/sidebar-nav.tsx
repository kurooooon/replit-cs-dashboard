import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Users, Search, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";

const sidebarItems = [
  {
    title: "User Search",
    icon: Search,
    href: "/",
  },
  {
    title: "User Management",
    icon: Users,
    href: "/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function SidebarNav() {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();

  return (
    <div className="flex h-screen border-r">
      <div className="flex flex-col w-64">
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-8">
            <Users className="h-6 w-6" />
            <span className="font-semibold">Support Dashboard</span>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "ghost"}
                    className={cn("w-full justify-start gap-2")}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="p-6 border-t">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">{user?.fullName}</span>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
