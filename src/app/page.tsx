import React from "react";
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

import Avatar from "@mui/material/Avatar";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  AccountBoxOutlined,
  InfoOutlined,
} from "@mui/icons-material";
// import DataTable from "react-data-table-component";

interface Post {
  id: number,
  title: string,
  description: string
}

async function postList() {
  const apiUser = process.env.NEXT_PUBLIC_API;
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

// const UserDelete = (id) => {
//   axios
//     .delete(import.meta.env.VITE_API + "/users/delete/" + id)
//     .then(() => {
//       userList(limit, currentPage);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export default async function List() {
  const data: Post[] = await postList();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Box display="flex">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Users total: {data.length}
            </Typography>
          </Box>
          <Box>
            <Link href="/create">
              <Button variant="contained">Create</Button>
            </Link>
          </Box>
        </Box>

        <TableContainer component={Paper}>
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
                        {/* <Button onClick={() => UserDelete(row.id)}>
                        <DeleteOutlined />
                      </Button> */}
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
        </TableContainer>

      </Container>
    </React.Fragment>
  )
}
