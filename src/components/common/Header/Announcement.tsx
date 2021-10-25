import React from 'react'

interface Props {
  message: string
}

function Announcement({ message }: Props) {
  return (
    <div className="p-3 uppercase text-xs text-center underline align-middle font-bold bg-green-50">
      {message}
    </div>
  )
}

export default Announcement
