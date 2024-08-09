"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers/index"

const Nav = () => {
    const {data: session} = useSession()
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        fetchProviders();
    }, []);
    return (
        <nav className="flex justify-between w-full mb-16 pt-3">
            <Link href="/" className="flex items-center">
                <div className="flex items-center ml-auto">
                    <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className="object-contain" />
                    <p className="logo_text ml-2">Promptopia Logo</p>
                </div>
            </Link>
            <div className="flex">
                {session?.user ? (
                    <div>
                        <div className="flex gap-3 md:gap-5">
                            <Link href="/create-prompt" className="black_btn">
                                Create post
                            </Link>
                            <button onClick={() => signOut()} className="outline_btn">
                                Sign out
                            </button>
                            <Link href="/profile">
                                <Image
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="profile"
                                ></Image>
                            </Link>
                        </div>
                    </div>
                ) : (<>
                    {providers && Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                            Sign in
                        </button>
                    ))}
                </>)}
            </div>
        </nav>
    )
}

export default Nav