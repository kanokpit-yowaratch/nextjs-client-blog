'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import Blog from '@/components/blog-pages/Blog'

function Page({ params }: { params: { slug: string[] } }) {
  const slugParam = decodeURI(params.slug.join('/'))
  const [slug, setSlug] = useState(slugParam)

  // useEffect

  return (
    <>
    <Box>Slug {slug}</Box>
      <Blog />
    </>
  )
}

export default Page