import React from 'react'

const Agent = ({ userName, userId, type, questions }: AgentProps) => {
  return (
    <div>
        <p>{userName}</p>
        <p>{userId}</p>
        <p>{type}</p>
        <p>{questions}</p>
    </div>
  )
}

export default Agent