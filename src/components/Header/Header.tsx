'use client'

import { Heading } from 'components/Heading'
import { docsConfig } from 'config/header'
import Link from 'next/link'
import Navigation from './Navigation'
import TopBar from './TopBar'

export function Header() {
  return (
    <header>
      <TopBar />
      <div className="p-4 px-6 flex justify-between items-center">
        <Link href="/">
          <Heading as="h3" className="text-primary">
            Acnehuong
          </Heading>
        </Link>

        <div className="flex gap-2 items-center">
          <Navigation items={docsConfig.mainNav} />
        </div>
      </div>
    </header>
  )
}
