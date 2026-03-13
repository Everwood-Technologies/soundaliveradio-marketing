"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_NAME, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import logoImg from "@/app/assets/logo.png";

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center shrink-0 hover:opacity-90 transition-opacity"
          aria-label={SITE_NAME}
        >
          <Image
            src={logoImg}
            alt=""
            width={160}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === href
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="primary" className="hidden sm:inline-flex" asChild>
            <Link href="#listen">Listen Live</Link>
          </Button>
          <Button size="sm" variant="secondary" className="hidden sm:inline-flex" asChild>
            <Link href="/subscription#connect">Connect XRPL Wallet</Link>
          </Button>

          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:bg-white/5 rounded-lg"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 px-4 py-4">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-2 text-sm font-medium",
                  pathname === href ? "text-primary" : "text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="primary" size="md">
                <Link href="#listen" onClick={() => setMobileOpen(false)}>
                  Listen Live
                </Link>
              </Button>
              <Button asChild variant="secondary" size="md">
                <Link href="/subscription#connect" onClick={() => setMobileOpen(false)}>
                  Connect XRPL Wallet
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
