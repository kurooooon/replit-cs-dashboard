import { SidebarNav } from "@/components/sidebar-nav";
import { SearchForm } from "@/components/search-form";
import { UserTable } from "@/components/user-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { useState, useCallback } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/users/search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
    enabled: searchQuery.length > 0,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav />
      <main className="flex-1 p-8 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>ユーザー検索</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SearchForm
              onSearch={handleSearch}
              isLoading={isLoading}
            />
            <UserTable users={users} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}