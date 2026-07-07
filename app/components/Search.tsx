"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
    const [city, setCity] = useState<string>("");
    const router = useRouter();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!city.trim()) return;
        router.push(`/?city=${city.trim()}`);
    }

    return (
        <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search city... (e.g. London, Peshawar)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Search 🔍</button>
            </div>
        </form>
    );
}