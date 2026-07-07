import "./globals.css";

export const metadata = {
    title: "Weather Finder",
    description: "Search weather for any city",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <span>⛅ Weather<span className="accent">Finder</span></span>
                </nav>
                {children}
                <footer>
                    <p>Developed by <span>Muhammad Waleed</span></p>
                </footer>
            </body>
        </html>
    );
}