import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'你一直是第一',description:'从 2025 年 11 月 13 日开始，写给唯一的第一名。'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
