import './globals.css'
import { RecoilProvider } from './providers'
import AuthStatus from '@/components/AuthStatus'

export const metadata = {
  title: 'Twitter Clone',
  description: 'Twitter clone app using next js 13, Tailwind CSS and Firebase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <RecoilProvider>
          <AuthStatus>
            {children}
          </AuthStatus>
        </RecoilProvider>
      </body>
    </html>
  )
}
