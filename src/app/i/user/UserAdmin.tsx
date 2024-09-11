'use client'

import React, { useState } from 'react'
import UserGrid from './UserGrid'
import UserModal from './UserModal'
import { useUserData } from '@/hook/userHook'
import { IUserResponse } from '@/interface/user'

export default function UserAdmin() {
  const {userData} = useUserData("0","10")
  const [userId, setUserId] = useState<number>()
  const [userType, setUserType] = useState<"Создать" | "Изменить">("Создать")

  return (
    <div>
      <UserModal userId={userId as number} type={userType} setUserId={setUserId}/>
      <UserGrid userData={userData as IUserResponse} setUserId={setUserId} setUserType={setUserType}/>
    </div>
  )
}
