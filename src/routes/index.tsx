// src/routes/index.tsx
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <div className="font-bold text-3xl text-blue-500 underline">
    <Button>
      Hello
    </Button>
  </div>;
}
