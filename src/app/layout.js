import './globals.css'

export const metadata = {
  title: 'Twitter Clone',
  description: 'Twitter clone app using next js 13, Tailwind CSS and Firebase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>{children}</body>
    </html>
  )
}
