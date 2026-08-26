import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'把偏爱落到行动里',description:'一封写给最特别的你的告白。不是空口的安抚，是坚定、明确的偏爱。'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
