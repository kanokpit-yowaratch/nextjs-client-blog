import React from 'react'

function page({ params }: any) {
    return (
        <div>Post: {params.id}</div>
    )
}

export default page