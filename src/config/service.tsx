import Image from 'next/image'
import { ServiceCardItem } from 'components/Dashboard/Services/ServiceCard'

export const ServiceConfig: ServiceCardItem[] = [
  {
    id: '1',
    title: 'Acne Treatment',
    description:
      'Eliminate bad conditions for the skin bad conditions for the skin',
    icon: (
      <Image
        width={72}
        height={72}
        alt="Hydro Therapy"
        src="/images/thermal_bath.png"
      />
    ),
    className: 'z-1 w-2/4',
    href: '/acne-treatment',
  },
  {
    id: '2',
    title: 'Face Massages',
    description: 'The treatment that helps you relax your face.',
    icon: (
      <Image
        width={72}
        height={72}
        alt="Hydro Therapy"
        src="/images/relax_massages.png"
      />
    ),
    className: 'scale-110 z-10 w-2/4',
    href: '/face-massages',
  },
  {
    id: '3',
    title: 'Skincare',
    description: 'The art of healing through the use of plant-extracts.',
    icon: (
      <Image
        width={72}
        height={72}
        alt="Hydro Therapy"
        src="/images/supreme_skincare.png"
      />
    ),
    className: 'z-1 w-2/4',
    href: '/skin-care',
  },
]
