'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { tailwindConfig } from '@/utils/styles';
import { useWindowSize } from '@uidotdev/usehooks';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { NAVIGATION } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import starImage from '@/assets/icons/star.svg';

const { HOME } = ROUTES;

const lgBreakpoint = parseInt(tailwindConfig?.theme?.screens?.lg);

const Header: FC = () => {
  const segment = useSelectedLayoutSegment();
  const pathSegment = !segment ? '/' : `/${segment}/`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathSegment]);

  useEffect(() => {
    if (width && width > lgBreakpoint) setIsMenuOpen(false);
  }, [width]);

  return (
    <header className="border-b bg-popover">
      <div className="lg:container flex h-16 items-center justify-between px-4">
        <Link href={HOME} className="flex items-center gap-2 shrink-0">
          <Image src={starImage} alt="Star logo" className="h-16" />
          <Icons.levelUpGaming className="h-16" />
        </Link>

        {/* desktop menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAVIGATION.map((navItem) => {
            const { href, title } = navItem;

            return (
              <Link
                key={title}
                className={cn('text-lg text-muted-foreground', {
                  'font-medium text-tertiary-foreground':
                    pathSegment === navItem.href,
                })}
                href={href}
              >
                {title}
              </Link>
            );
          })}
        </nav>

        {/* desktop menu */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="outline" size="lg" className="px-8">
            View Cart
          </Button>
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* mobile menu */}
      <nav
        className={cn('flex lg:hidden flex-col items-start gap-4 p-4', {
          hidden: !isMenuOpen,
        })}
      >
        {NAVIGATION.map((navItem) => {
          const { href, title } = navItem;

          return (
            <Link
              key={title}
              className={cn(
                'text-lg text-muted-foreground hover:text-accent-foreground',
                {
                  'font-medium text-tertiary-foreground':
                    pathSegment === navItem.href,
                }
              )}
              href={href}
            >
              {title}
            </Link>
          );
        })}

        <Button variant="outline" size="sm" className="px-8">
          View Cart
        </Button>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
