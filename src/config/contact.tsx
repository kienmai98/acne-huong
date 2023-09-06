import { MailIcon, PhoneIcon } from 'lucide-react'
import { ContactConfig } from 'types'

export const listContact: ContactConfig = {
  contacts: [
    {
      icon: <PhoneIcon size={16} />,
      label: '090.477.1370',
      href: 'tel:0904771370',
    },
    {
      icon: <MailIcon size={16} />,
      label: 'trungsymedia@gmail.com',
      href: 'mailto:trungsymedia@gmail.com',
    },
  ],
}
