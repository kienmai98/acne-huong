'use client'

import { docsConfig } from 'config/header'
import Navigation from './Navigation'
import TopBar from './TopBar'
import Logo from '../common/Logo'

export function Header() {
  return (
    <header className="">
      <TopBar />
      <div className="p-4 px-6 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <Logo />
          <span className="pt-2 text-2xl font-header text-active">
            Rela Spa
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Navigation items={docsConfig.mainNav} />
        </div>
      </div>
    </header>
  )
}
