import NavigationItem, { NavigationItemType } from './NavigationItem'

const NAVIGATIONS: { title: string; items: NavigationItemType[] }[] = [
  {
    items: [
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
    ],
    title: 'Massages',
  },
  {
    items: [
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
    ],
    title: 'Therapies',
  },
  {
    items: [
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
    ],
    title: 'Our Spa',
  },
  {
    items: [
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
      { href: '', label: 'Deep Tissue Massge' },
    ],
    title: 'Contact',
  },
]

export default function Navigation() {
  return (
    <div className="grid grid-cols-4 items-center justify-between gap-20 px-8">
      {NAVIGATIONS.map((i, index) => (
        <div className="col-span-1" key={index}>
          <NavigationItem title={i.title} items={i.items} />
        </div>
      ))}
    </div>
  )
}
