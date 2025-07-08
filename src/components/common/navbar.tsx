import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/tanstack-react-start';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Skeleton } from '../ui/skeleton';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative">
      <div className="flex items-center justify-between py-4">
        <Link to="/">
          <h2 className="font-bold text-xl">Jarida</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              activeProps={{
                className: 'underline font-semibold',
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

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet onOpenChange={setIsMobileMenuOpen} open={isMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                aria-label="Toggle mobile menu"
                className="p-2"
                size="sm"
                variant="outline"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent
              className="flex w-[300px] flex-col sm:w-[400px]"
              side="right"
            >
              <div className="flex h-full flex-col">
                {/* Navigation Links */}
                <div className="mt-8 flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      activeProps={{
                        className:
                          'bg-accent text-accent-foreground font-semibold',
                      }}
                      className={cn(
                        buttonVariants({
                          variant: 'ghost',
                          size: 'sm',
                        }),
                        'h-auto justify-start px-4 py-3 text-left'
                      )}
                      key={link.to}
                      onClick={handleNavigation}
                      to={link.to}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                {/* Auth Section at Bottom */}
                <div className="mt-auto pt-6">
                  <div className="flex w-full flex-col space-y-2">
                    <ClerkLoading>
                      <Skeleton className="h-10 w-full rounded-md" />
                    </ClerkLoading>
                    <ClerkLoaded>
                      <SignedIn>
                        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                          <span className="font-medium text-sm">Account</span>
                          <UserButton />
                        </div>
                      </SignedIn>
                      <SignedOut>
                        <SignInButton>
                          <Button className="w-full" variant="outline">
                            Sign in
                          </Button>
                        </SignInButton>
                      </SignedOut>
                    </ClerkLoaded>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
