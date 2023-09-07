import Link from 'next/link'

export type NavigationItemType = {
  label: string
  href: string
}

interface Props {
  title: string
  items: NavigationItemType[]
}

export default function NavigationItem({ items = [], title }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-light font-header text-white">
        {title}
      </span>
      <span className="flex flex-col gap-4 text-sm">
        {items.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="text-neutral-300 font-light hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </span>
    </div>
  )
}
