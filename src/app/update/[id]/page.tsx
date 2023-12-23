import React from 'react'
interface PostParams {
    params: {
        id: number
    }
}

function page({ params }: PostParams) {
  return (
    <div>Update post: {params.id}</div>
  )
}

export default page