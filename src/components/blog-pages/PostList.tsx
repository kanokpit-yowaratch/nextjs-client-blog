'use client'
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Link from 'next/link';
import { Box, Button, Card } from '@mui/material';
import { useSearchParams } from 'next/navigation'

function PostList() {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1') || 1
  // const search = searchParams.get('keyword') || ''

  const [api, setApi] = useState(process.env.NEXT_PUBLIC_API)
  const [blogData, setBlogData] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalPage, setTotalPage] = useState(1)
  // const [keyword, setKeyword] = useState(search);

  const list = () => {
    const queryParams: any = {}
    if (currentPage > 1) {
      queryParams.params = {
        page: currentPage,
        rowsPerPage: rowsPerPage
      }
    }
    axios
      .get(`${api}/post`, queryParams)
      .then((response) => {
        const data = response.data;
        const posts: Post[] = response.data.data;
        const existData = posts.map((obj) => obj)
        setBlogData(existData);
        setTotalPage(data.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    list();
  }, []);

  useEffect(() => {
    onChangePage(currentPage);
  }, [currentPage]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    list();
  }

  return (
    <>
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
              backgroundColor: 'grey',
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
        {
          (totalPage < 1) ? (
            <p>No data available.</p>
          ) :
            (totalPage > 1) && Array.from(Array(totalPage), (e, i) => {
              const cPage = i + 1;
              const url = (cPage === 1) ? '/' : `/?page=${cPage}`;
              return <Button component={Link} href={url} key={"link-" + cPage} className='link-page-style' onClick={() => onChangePage(cPage)}>{cPage}</Button>
            })
        }
        {/* {(totalPage === 0) &&
          <p>No data available.</p>
        }
        {(totalPage > 1) && Array.from(Array(totalPage), (e, i) => {
          const cPage = i + 1;
          const url = (cPage === 1) ? '/' : `/?page=${cPage}`;
          return <Button component={Link} href={url} key={"link-" + cPage} className='link-page-style' onClick={() => onChangePage(cPage)}>{cPage}</Button>
        })} */}
      </Grid>
    </>
  );
}

export default PostList