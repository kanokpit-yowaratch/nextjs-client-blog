'use client';
import React, { useEffect, useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  Box,
  Typography,
  Link,
  Button
} from "@mui/material";

import axios from "axios";
import {
  EditOutlined,
  // DeleteOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import NextImage from 'next/image'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';


// TODO: Delete function
// async function userDelete(id: GridRowId) {
//   const apiUser = process.env.NEXT_PUBLIC_API;
//   await axios
//     .delete(`${apiUser}/users/delete/${id}`)
//     .then(() => {
//       // ...
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

function PostList() {
  const [blogData, setBlogData] = useState<Post[]>([]);
  const [blogRows, setBlogRows] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const apiUser = process.env.NEXT_PUBLIC_API;
      let data: Post[] = [];
      await axios
        .get(`${apiUser}/blogs`)
        .then((response) => {
          data = response.data;
          setBlogData(data);

          if (data && data.length) {
            const blogRows = data.filter((obj) => {
              if (obj.id && obj.title) {
                return { id: obj.id, title: obj.title, category_id: obj.category_id, slug: obj.slug, description: obj.description };
              }
            })
            setBlogRows(blogRows);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchData();
    return () => { };
  }, []);

  const blogColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, type: 'number' },
    {
      field: 'cover', sortable: false, headerName: 'Photo', width: 70,
      renderCell: (params) => (
        <div>
          {params.row.cover_path ? (
            <NextImage
              src={`${process.env.NEXT_PUBLIC_API}/medias/${params.row.cover_path}`}
              fill
              style={{
                objectFit: 'cover',
              }}
              alt={params.row.title}
            />
          ) : (
            <NextImage
              src="/upload-placeholder.jpg"
              fill
              style={{
                objectFit: 'cover',
              }}
              alt=""
            />
          )}
        </div>
      )
    },
    {
      field: 'blog',
      headerName: 'Blog info',
      description: 'Title and Description',
      sortable: false,
      width: 250,
      type: 'string',
      renderCell: (params) => (
        <div>
          <Typography>{params.row.title}</Typography>
          <Typography color="textSecondary">{params.row.description}</Typography>
        </div>
      )
    },
    { field: 'category_id', headerName: 'Category', width: 100, type: 'number' },
    { field: 'slug', headerName: 'Slug', width: 100, type: 'string' },
    {
      field: 'actions',
      type: 'actions',
      width: 200,
      getActions: (params) => [
        <React.Fragment key={params.id}>
          <GridActionsCellItem
            icon={<InfoOutlined />}
            label="Detail"
            onClick={() => window.location.href = `/blog/${params.id}`}
          />
        </React.Fragment>,
        <React.Fragment key={params.id}>
          <GridActionsCellItem
            icon={<EditOutlined />}
            label="Edit"
            onClick={() => window.location.href = `/blog/edit/${params.id}`}
          />
        </React.Fragment>
        // <GridActionsCellItem
        //   icon={<DeleteOutlined />}
        //   label="Delete"
        //   onClick={() => postDelete(params.id)}
        //   showInMenu
        // />
      ],
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Box display="flex" sx={{ mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom component="h6" sx={{ mb: 0, mt: 0 }}>
              Users total: {blogData.length}
            </Typography>
          </Box>
          <Box>
            <Link href="/blog/create">
              <Button variant="contained">Create</Button>
            </Link>
          </Box>
        </Box>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={blogRows}
            columns={blogColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>

      </Container>
    </React.Fragment>
  )
}

export default PostList;
