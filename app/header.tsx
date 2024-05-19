"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropdown() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "CN"; // Default initials

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session?.user?.image ?? ""} alt="User Image" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          {session?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogInIcon className="mr-2" /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 container mx-auto">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Image
            src="/icon.jpeg"
            width="60"
            height="60"
            alt="the application icon of a magnifying glass"
            className="rounded-full"
          />
          CodePair Connect
        </Link>

        <div className="flex items-center gap-4">
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
