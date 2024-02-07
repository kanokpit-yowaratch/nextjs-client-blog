'use client'
import React, { useState } from 'react'
import { Container } from '@mui/material'
import Header from '@/components/blog-pages/Header'
import Footer from '@/components/blog-pages/Footer'
import Slug from '@/components/blog-pages/Slug'

function Page({ params }: { params: { slug: string[] } }) {
  const slugParam = decodeURI(params.slug.join('/'))
  const [slug, setSlug] = useState(slugParam)

  return (
    <>
      <Container maxWidth="lg">
        <Header title="Blog" />
        <Slug slug={slug} />
      </Container>
      <Footer
        title="Footer"
        description="Low Profile ... High Profit"
      />
    </>
  )
}

export default Page