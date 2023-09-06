'use client'

import { Heading } from 'components/Heading'
import { docsConfig } from 'config/header'
import Navigation from './Navigation'
import TopBar from './TopBar'

export function Header() {
  return (
    <header>
      <TopBar />
      <div className="p-4 px-6 flex justify-between items-center">
        <Heading as="h3" className="text-primary">
          Acnehuong
        </Heading>
        <div className="flex gap-2 items-center">
          <Navigation items={docsConfig.mainNav} />
        </div>
      </div>
    </header>
  )
}
