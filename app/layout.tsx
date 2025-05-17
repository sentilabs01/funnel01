import './globals.css';
import { ReactNode } from 'react';
import { Providers } from './providers';
import { metadata } from './metadata';

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
