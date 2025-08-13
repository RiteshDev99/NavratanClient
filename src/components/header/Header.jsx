import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo } from "../index.js";
import { HiMenu, HiX } from "react-icons/hi";

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", slug: "/" },
        { name: "About", slug: "/" },

    ];

    return (
        <header className=" shadow-md py-3 px-2 bg-sky-50 w-full fixed ">
            <Container>
                <nav className="flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <Logo width={"70px"} />
                    </Link>

                    <button
                        className="md:hidden text-2xl p-2 rounded-lg hover:bg-gray-200"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>

                    <ul className="hidden md:flex items-center gap-4">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className="px-5 py-2 text-sm md:text-base duration-200 hover:bg-[#eb7724] hover:text-white rounded-full"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                {menuOpen && (
                    <ul className="flex flex-col mt-4 gap-2 md:hidden">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => {
                                        navigate(item.slug);
                                        setMenuOpen(false);
                                    }}
                                    className="w-full text-left px-5 py-3  rounded-lg hover:bg-[#eb7724] hover:text-white"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </Container>
        </header>
    );
}

export default Header;
