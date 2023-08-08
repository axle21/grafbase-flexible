import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-4">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-sm gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
