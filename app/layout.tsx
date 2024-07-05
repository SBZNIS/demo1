import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html>
            <head>
                <title>Grade Fetcher</title>
            </head>
            <body>{children}</body>
        </html>
    );
}
