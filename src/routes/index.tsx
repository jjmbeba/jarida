// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <div className="font-bold text-3xl text-blue-500 underline">Home page</div>;
}
