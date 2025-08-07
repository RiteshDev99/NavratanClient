import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index.js";

function Footer() {
    const sections = [
        {
            title: "Company",
            links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
        },
        {
            title: "Support",
            links: ["Account", "Help", "Contact Us", "Customer Support"],
        },
    ];

    return (
        <footer className="bg-sky-50 border-t border-gray-300 shadow-sm w-full">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                    
                    <div className="flex flex-col items-start md:w-1/3">
                        <Logo width="100px" />
                        <p className="text-sm text-gray-600 mt-4">
                            &copy; {new Date().getFullYear()} All Rights Reserved by DevUI.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:w-2/3">
                        {sections.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <Link
                                                to="/"
                                                className="text-base text-gray-800 hover:text-[#eb7724] transition-colors"
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
