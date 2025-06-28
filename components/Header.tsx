import Image from "next/image"
import Link from "next/link"
import { logo } from "@/utils/site.info"
import React from 'react'
import LogoutButton from "./LogoutButton"

const Header = () => {
    return (
        <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src={logo} alt="MockMate Logo" width={38} height={32} />
                <h2 className="text-primary-100">PrepWise</h2>
            </Link>
            <LogoutButton />
        </nav>
    )
}

export default Header