import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/tanstack-react-start';
import { Link, linkOptions } from '@tanstack/react-router';
import { Button } from '../ui/button';

const Navbar = () => {
  const links = linkOptions([
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/about',
      label: 'About',
    },
    {
      to: '/protected',
      label: 'Protected',
    },
  ]);

  return (
    <div className="flex items-center justify-between p-4">
      <h2>Jarida</h2>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
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
      </div>
    </div>
  );
};

export default Navbar;
