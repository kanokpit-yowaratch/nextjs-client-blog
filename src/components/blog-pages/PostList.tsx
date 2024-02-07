'use client'
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';
// import Markdown from './Markdown';
import axios from 'axios';
import Link from 'next/link';
import { Box, Card } from '@mui/material';

function PostList() {
  // const postList = [post1, post2, post3];
  // const [posts, setPosts] = useState(postList)
  const [api, setApi] = useState(process.env.NEXT_PUBLIC_API)
  const [blogData, setBlogData] = useState<Post[]>([])

  const list = () => {
    axios
      .get(`${api}/blogs`)
      .then((response) => {
        const data: Post[] = response.data;
        // console.log(data);
        const existData = data.filter((obj) => {
          if (obj.title.trim()) {
            return { id: obj.id, title: obj.title, category_id: obj.category_id, slug: obj.slug, description: obj.description };
          }
        })
        // console.log(existData);
        setBlogData(existData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    list();
  }, []);

  return (
    <Grid
      item
      xs={12}
      md={8}
    // sx={{
    //   '& .markdown': {
    //     py: 3,
    //   },
    // }}
    >
      {/* {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))} */}
      {blogData.map((post) => (
        <Card key={post.slug}
          sx={{
            position: 'relative',
            // color: '#fff',
            p: 3,
            mb: 2,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            // backgroundImage: `url(${api}/medias/${post.cover_path})`,
            backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.5), transparent), url(${api}/medias/${post.cover_path})`,
            boxShadow: 'none'
          }}>
          <Grid container>
            <Box sx={{ position: 'relative' }}>
              <h3 style={{ marginTop: 0, paddingTop: 0 }}>{post.title}</h3>
              <p>{post.description}</p>
              <Link href={`/${post.slug}`} target='_BLANK' style={{ fontSize: '14px', fontWeight: 500, color: 'purple', textDecoration: 'none' }}>Continue reading…</Link>
            </Box>
          </Grid>
        </Card >
      ))}
    </Grid>
  );
}

export default PostList