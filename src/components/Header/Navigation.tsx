import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { type MainNavItem } from 'types'
import { NavigationMenuTrigger } from '../ui/navigation-menu'
import NavigationItem from './NavigationItem'

interface NavigationProps {
  items: MainNavItem[]
}

export default function Navigation({ items }: NavigationProps) {
  return (
    <NavigationMenu orientation="horizontal">
      <NavigationMenuList className="flex">
        {items.map((item) => (
          <NavigationMenuItem
            key={item.href}
            className="hover:bg-primary hover:text-white"
          >
            <NavigationMenuTrigger className="text-xs tracking-[0.3rem] transition-colors duration-300 hover:bg-primary hover:text-white">
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuTrigger>

            {Number(item.navItems?.length) > 0 && (
              <NavigationMenuContent
                className="absolute flex flex-col gap-4 border border-neutral-200 p-8 min-w-[300px] mt-2 z-[999] bg-light"
                inlist={false}
              >
                {item.navItems?.map((e) => (
                  <NavigationItem key={e.href} href={e.href} label={e.title} />
                ))}
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
