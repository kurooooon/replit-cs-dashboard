import { SidebarNav } from "@/components/sidebar-nav";
import { SearchForm } from "@/components/search-form";
import { UserTable } from "@/components/user-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/users/search", searchQuery],
    enabled: searchQuery.length > 0,
  });

  return (
    <div className="flex h-screen">
      <SidebarNav />
      <main className="flex-1 p-8 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SearchForm
              onSearch={setSearchQuery}
              isLoading={isLoading}
            />
            <UserTable users={users} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
