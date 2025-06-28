import React from 'react'
import Image from 'next/image'

const Agent = ({ userName, userId, profileImage, type, questions }: AgentProps) => {
  return (
    <div>
        <p>{userName}</p>
        <p>{userId}</p>
        {/* <Image src={profileImage!} alt="profile" width={50} height={50} /> */}
        <p>{type}</p>
        <p>{questions}</p>
    </div>
  )
}

export default Agent