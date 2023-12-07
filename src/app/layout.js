import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Draggable Image Gallery',
  description: 'Explore our dynamic image gallery featuring a seamless drag-and-drop functionality. Connect with us for top-notch web design and development solutions. Crafted with creativity by @imtiazpy.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
