'use client';
import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  Box,
  Typography,
  ButtonGroup,
  Link,
  Paper, Table, TableBody,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Avatar from "@mui/material/Avatar";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  AccountBoxOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';

async function PostList() {
  const apiUser = process.env.NEXT_PUBLIC_API;

  async function list() {
    let data: Post[] = [];
    await axios
      .get(`${apiUser}/blogs`)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }

  const editBlog = React.useCallback(
    (id: GridRowId) => () => {
      window.location.href = `/blog/edit/${id}`;
    },
    [],
  );

  const userDelete = async (id: string | number) => {
    await axios
      .delete(`${apiUser}/users/delete/${id}`)
      .then(() => {
        // userList(limit, currentPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const data: Post[] = await list();

  let blogRows: readonly any[] = [];

  if (data && data.length) {
    blogRows = data.filter((obj) => {
      if (obj.id && obj.title) {
        const row = { id: obj.id, title: obj.title, category_id: obj.category_id, slug: obj.slug, description: obj.description };
        return row;
      }
    })
  }

  const blogColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'blog',
      headerName: 'Blog info',
      description: 'Title and Description',
      sortable: false,
      width: 250,
      renderCell: (params) => (
        <div>
          <Typography>{params.row.title}</Typography>
          <Typography color="textSecondary">{params.row.description}</Typography>
        </div>
      )
    },
    { field: 'category_id', headerName: 'Category', width: 100 },
    { field: 'slug', headerName: 'Slug', width: 100 },
    {
      field: 'actions',
      type: 'actions',
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit blog"
          onClick={editBlog(params.row.id)}
        // showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => userDelete(params.id)}
        />,
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
              Users total: {data.length}
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
          // checkboxSelection
          />
        </div>

        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 460 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {data.length ? (
              <TableBody>
                {data.map((row: Post) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        size="small"
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button>
                          <Link href={"/info/" + row.id}>
                            <InfoOutlined />
                          </Link>
                        </Button>
                        <Button>
                          <Link href={"/update/" + row.id}>
                            <EditOutlined />
                          </Link>
                        </Button>
                        <Button onClick={() => UserDelete(row.id)}>
                          <DeleteOutlined />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer> */}

      </Container>
    </React.Fragment>
  )
}

export default PostList;
