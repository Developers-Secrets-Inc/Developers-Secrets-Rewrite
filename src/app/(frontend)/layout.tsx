import '@/styles/globals.css'

export const metadata = {
  description: 'The best way to learn software engineering.',
  title: 'Developers Secrets',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
