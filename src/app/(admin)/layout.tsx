'use client'

import { useRequest, useIsomorphicLayoutEffect } from 'ahooks'
import { Spin } from 'antd'
import { CacheKey } from 'config/cache-key'
import { useAuth } from 'contexts/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'
import { getMeApi } from 'services/auth/auth'
import { twMerge } from 'tailwind-merge'
import webStorage from 'utils/webStorage'

const content = [
  { id: 0, name: 'Quản lí phim', url: '/videos-management' },
  { id: 1, name: 'Quản lí danh mục', url: 'categories-management' },
  { id: 2, name: 'Quản lí banner', url: 'banner-management' },
]

export default function AdminLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const { first, setFirst, isAuth, setIsAuth, setCurrentUser } = useAuth()
  const { run: getMe } = useRequest(getMeApi, {
    cacheKey: CacheKey.GET_ME,
    manual: true,
    onSuccess: (data) => {
      setCurrentUser(data.data?.data)
      setFirst(false)
      setIsAuth(true)
    },
  })

  useIsomorphicLayoutEffect(() => {
    // getToken from localStorage
    if (first) {
      const token = webStorage.getToken()
      if (token) {
        getMe()
      } else {
        setFirst(false)
      }
    }
  }, [first])

  useEffect(() => {
    // redirect to login page when user is not authenticated
    if (!isAuth && !first) {
      router.push('/auth')
    }
  }, [isAuth, first, router])

  if (first) {
    return <Spin />
  }

  return (
    <div className="w-full bg-slate-400 min-h-screen">
      <div className="w-full p-5 border-b flex items-center gap-4">
        {content.map((item: any) => (
          <Link
            key={item.id}
            className={twMerge(
              'w-max flex items-center justify-center text-base font-medium text-white uppercase cursor-pointer transition-all hover:text-primary',
              false && 'text-primary',
            )}
            href={item.url}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
