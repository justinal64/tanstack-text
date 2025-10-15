// Types for Activity components
export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export interface DemoItem {
  id: number;
  name: string;
  desc: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export type ViewType = "list" | "grid" | "cards";
export type ActivityState = "none" | "loading" | "success" | "error";

// Simulate async data fetching
export const fetchUserData = async (userId: number): Promise<User> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const users: User[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      bio: "Software engineer with a passion for React and TypeScript. Loves building user-friendly applications.",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      bio: "Full-stack developer who enjoys working with modern web technologies and creating scalable solutions.",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      bio: "UX/UI designer turned developer. Focuses on creating beautiful and accessible user interfaces.",
    },
  ];

  const user = users[userId - 1];
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Demo items for ViewTransition demo
export const demoItems: DemoItem[] = [
  { id: 1, name: "React 19", desc: "Latest version with concurrent features" },
  { id: 2, name: "ViewTransition", desc: "Smooth animations between states" },
  { id: 3, name: "Activity Component", desc: "Declarative visibility control" },
  { id: 4, name: "useTransition", desc: "Non-blocking state updates" },
];

// Utility to trigger ViewTransition
export const triggerViewTransition = (callback: () => void) => {
  if ("startViewTransition" in document) {
    (document as any).startViewTransition(callback);
  } else {
    callback();
  }

  // This is an example when startViewTransition isn't used
  // callback();
};

// Check if ViewTransition API is available
export const isViewTransitionSupported = (): boolean => {
  return "startViewTransition" in document;
};
