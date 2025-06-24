import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/overview",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Manager",
    url: "/admin/managers",
    icon: "user",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Contenus",
    url: "/admin/content",
    icon: "blog",
    isActive: true,
    items: [
      {
        title: "Blogs",
        url: "/admin/content/posts",
        icon: "blog",
      },
      {
        title: "Forums",
        url: "/admin/content/forums",
        icon: "blog",
      },
      {
        title: "Activities",
        url: "/admin/content/activities",
        icon: "blog",
      },
    ],
  },
  // {
  //   title: "Forums",
  //   url: "/admin/forums",
  //   icon: "forum",
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: "Activités",
  //   url: "/admin/activities", // Placeholder as there is no direct link for the parent
  //   icon: "media",
  //   items: [],
  // },
  {
    title: "Utilisateur",
    url: "/admin/users", // Placeholder as there is no direct link for the parent
    icon: "user",
    items: [],
  },
  // {
  //   title: 'Kanban',
  //   url: '/admin/kanban',
  //   icon: 'kanban',
  //   isActive: false,
  //   items: [] // No child items
  // }
];
