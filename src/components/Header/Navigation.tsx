'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu'
import { NavigationMenuTrigger } from '../ui/navigation-menu'
import NavigationItem from './NavigationItem'

export interface NavigationItemType {
  title: string
  navItems: {
    href: string
    label: string
  }[]
  key: string
}
interface Props {
  items: NavigationItemType[]
}

export default function Nagivation({ items }: Props) {
  return (
    <NavigationMenu orientation="horizontal">
      <NavigationMenuList className="flex">
        {items.map((item) => (
          <NavigationMenuItem key={item.key} className="hover:bg-white">
            <NavigationMenuTrigger className="text-xs tracking-[0.3rem] hover:bg-white">
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="absolute flex flex-col gap-4 border border-neutral-200 p-8 min-w-[300px] mt-2 z-[999] bg-white"
              inlist={false}
            >
              {item.navItems.map((i) => (
                <NavigationItem key={i.label} href={i.href} label={i.label} />
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}