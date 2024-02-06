'use client'
import React, { useState } from 'react'
import { Container, Grid } from '@mui/material'
import Header from '@/components/blog-pages/Header'
import Footer from '@/components/blog-pages/Footer'
import Sidebar from '@/components/blog-pages/Sidebar'
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Slug from '@/components/blog-pages/Slug'
import SlugFeaturedPost from '@/components/blog-pages/SlugFeaturedPost'

const slugFeaturedPost = {
  // title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
};

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

function Page({ params }: { params: { slug: string[] } }) {
  const slugParam = decodeURI(params.slug.join('/'))
  const [slug, setSlug] = useState(slugParam)

  return (
    <>
      <Container maxWidth="lg">
        <Header title="Blog" />
        <main>
          <SlugFeaturedPost post={slugFeaturedPost} />
          <Grid container spacing={4}>
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Slug slug={slug} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  )
}

export default Page