import './globals.css'
import { NextAuthProvider } from './providers'

export const metadata = {
  title: 'Twitter Clone',
  description: 'Twitter clone app using next js 13, Tailwind CSS and Firebase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
