'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';

const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 border border-b-primary/10 bg-secondary">
      <Container>
        <div className="flex justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Image src="/logo.svg" alt="logo" width="30" height="30" />
            <div className="font-bold text-xl">StayEli</div>
          </div>
          <SearchInput />
          <div className="flex gap-3 items-center">
            <div>theme</div>
            <UserButton afterSignOutUrl="/" />
            {!userId && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/sign-in')}
                >
                  Sign in
                </Button>
                <Button size="sm" onClick={() => router.push('/sign-up')}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
