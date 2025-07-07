import { SignIn } from '@clerk/tanstack-react-start';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.userId) {
      throw new Error('Not authenticated');
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      return (
        <div className="flex items-center justify-center p-12">
          <SignIn forceRedirectUrl={window.location.href} routing="hash" />
        </div>
      );
    }

    throw error;
  },
});

function RouteComponent() {
  return <Outlet />;
}
