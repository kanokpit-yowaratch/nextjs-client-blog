import React from 'react'

function page({ params }: any) {
    return (
        <div>Edit post: {params.id}</div>
    )
}

export default page