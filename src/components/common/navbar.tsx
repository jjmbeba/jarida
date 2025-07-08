import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/tanstack-react-start';
import { Link, linkOptions } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const Navbar = () => {
  const links = linkOptions([
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/protected',
      label: 'Protected',
    },
  ]);

  return (
    <div className="flex items-center justify-between p-4">
      <Link to="/">
        <h2>Jarida</h2>
      </Link>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <Link
            activeProps={{
              className: 'underline',
            }}
            className={cn(
              buttonVariants({
                variant: 'link',
                size: 'sm',
              })
            )}
            key={link.to}
            to={link.to}
          >
            {link.label}
          </Link>
        ))}
        <ClerkLoading>
          <Skeleton className="h-7 w-7 rounded-full" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button size={'sm'} variant="outline">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Navbar;
