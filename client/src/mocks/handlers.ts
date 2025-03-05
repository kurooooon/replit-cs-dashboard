import { http, HttpResponse } from 'msw';
import type { User } from '@shared/schema';

// デフォルトの管理者ユーザー
const adminUser: User = {
  id: 1,
  username: "admin",
  password: "admin123",
  isAdmin: true,
  email: "admin@example.com",
  fullName: "System Administrator",
  status: "active"
};

export const handlers = [
  // ログインAPI
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    if (body.username === 'admin' && body.password === 'admin123') {
      return HttpResponse.json(adminUser);
    }
    return new HttpResponse(null, { status: 401 });
  }),

  // ユーザー情報取得API
  http.get('/api/user', () => {
    return HttpResponse.json(adminUser);
  }),

  // ログアウトAPI
  http.post('/api/logout', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // ユーザー検索API
  http.get('/api/users/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    const mockUsers: User[] = [
      adminUser,
      {
        id: 2,
        username: "user1",
        password: "password",
        isAdmin: false,
        email: "user1@example.com",
        fullName: "Test User 1",
        status: "active"
      },
      {
        id: 3,
        username: "user2",
        password: "password",
        isAdmin: false,
        email: "user2@example.com",
        fullName: "Test User 2",
        status: "inactive"
      }
    ];

    const filteredUsers = mockUsers.filter(user => 
      user.username.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.fullName?.toLowerCase().includes(query) ||
      user.id.toString() === query
    );

    return HttpResponse.json(filteredUsers);
  }),

  // ユーザー登録API
  http.post('/api/register', async ({ request }) => {
    const body = await request.json();
    const newUser: User = {
      ...body,
      id: Math.floor(Math.random() * 1000) + 4,
      status: 'active'
    };
    return HttpResponse.json(newUser);
  }),
];