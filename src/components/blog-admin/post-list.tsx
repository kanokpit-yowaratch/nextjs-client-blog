'use client';
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
	Container,
	Box,
	Typography,
	Link,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Chip,
} from '@mui/material';

import axios from 'axios';
import {
	EditOutlined,
	DeleteOutlined,
	InfoOutlined,
	AddCircleOutlined,
	VisibilityOutlined,
} from '@mui/icons-material';
import NextImage from 'next/image';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';

function PostList() {
	const [blogData, setBlogData] = useState<Post[]>([]);
	const [blogRows, setBlogRows] = useState<any[]>([]);
	const [deleteId, setDeleteId] = useState<GridRowId>(0);
	const [openConfirm, setOpenConfirm] = useState(false);

	const list = () => {
		const apiUser = process.env.NEXT_PUBLIC_API;
		axios
			.get(`${apiUser}/blogs`)
			.then((response) => {
				const data: Post[] = response.data;
				console.log(data);
				setBlogData(data);
				if (data && data.length) {
					const blogRows = data.filter((obj) => {
						if (obj.id && obj.title) {
							return {
								id: obj.id,
								title: obj.title,
								slug: obj.slug,
								status: `hee-${obj.active_status}`,
								description: obj.description,
							};
						}
					});
					setBlogRows(blogRows);
				}
			})
			.catch((error) => {
				console.log(error);
				setBlogData([]);
				setBlogRows([]);
			});
	};

	useEffect(() => {
		list();
	}, []);

	const postDelete = (id: GridRowId) => {
		setOpenConfirm(true);
		setDeleteId(id);
	};

	const filterBy = (search: string) => {
		const blogRows = blogData.filter((obj) => {
			const foundTitle = obj.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
			const foundSlug = obj.slug.toLocaleLowerCase().includes(search.toLocaleLowerCase());
			const foundDescription = obj.description.toLocaleLowerCase().includes(search.toLocaleLowerCase());
			const foundDetails = obj.details.toLocaleLowerCase().includes(search.toLocaleLowerCase());
			if (foundTitle || foundSlug || foundDescription || foundDetails) {
				return {
					id: obj.id,
					title: obj.title,
					slug: obj.slug,
					status: obj.active_status + '-' + obj.slug,
					description: obj.description,
				};
			}
		});

		setBlogRows(blogRows);
	};

	const blogColumns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 50, type: 'number' },
		{
			field: 'cover',
			sortable: false,
			headerName: 'Photo',
			width: 70,
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
			),
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
			),
		},
		{ field: 'slug', headerName: 'Slug', width: 100, type: 'string' },
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			type: 'string',
			renderCell: (params) => (
				<Chip
					label={params.row.active_status === 1 ? 'active' : 'non-active'}
					color="primary"
					variant="outlined"
				/>
			),
		},
		{
			field: 'actions',
			type: 'actions',
			width: 200,
			getActions: (params) => [
				<React.Fragment key={`details-${params.id}`}>
					<GridActionsCellItem
						icon={<InfoOutlined />}
						label="Detail"
						onClick={() => (window.location.href = `/blog/${params.id}`)}
					/>
				</React.Fragment>,
				<React.Fragment key={`edit-${params.id}`}>
					<GridActionsCellItem
						icon={<EditOutlined />}
						label="Edit"
						onClick={() => (window.location.href = `/blog/edit/${params.id}`)}
					/>
				</React.Fragment>,
				<React.Fragment key={`delete-${params.id}`}>
					<GridActionsCellItem
						icon={<DeleteOutlined />}
						label="Delete"
						onClick={() => postDelete(params.id)}
					/>
				</React.Fragment>,
				<React.Fragment key={`status-${params.id}`}>
					<GridActionsCellItem
						icon={<VisibilityOutlined />}
						label="Set status"
						onClick={() => setStatus(params.id)}
					/>
				</React.Fragment>,
			],
		},
	];

	const handleOk = () => {
		const apiUser = process.env.NEXT_PUBLIC_API;
		axios
			.delete(`${apiUser}/blogs/${deleteId}`)
			.then(() => {
				list();
				setOpenConfirm(false);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setDeleteId(0);
			});
	};

	const setStatus = (id: GridRowId) => {
		const api = process.env.NEXT_PUBLIC_API;
		axios
			.get(`${api}/blogs/status/${id}`)
			.then(() => {
				list();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="lg" sx={{ p: 2 }}>
				<Box display="flex" sx={{ mb: 2 }}>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant="h6" gutterBottom component="h6" sx={{ mb: 0, mt: 0 }}>
							Users total: {blogRows.length}
						</Typography>
					</Box>
					<Box>
						<Link href="/blog/create">
							<Button variant="contained">
								Add new <AddCircleOutlined sx={{ ml: 1 }} />
							</Button>
						</Link>
					</Box>
				</Box>

				<div>
					<Box sx={{ mb: 1 }}>
						<TextField
							id="search-post"
							label="Search post:"
							variant="outlined"
							onChange={(e) => filterBy(e.target.value)}
						/>
					</Box>

					{blogRows.length > 0 ? (
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
					) : (
						<p>No data available.</p>
					)}
				</div>

				<Dialog
					sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
					maxWidth="xs"
					open={openConfirm}>
					<DialogTitle>Confirm delete</DialogTitle>
					<DialogContent dividers>Do you want to delete this post?</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={() => setOpenConfirm(false)}>
							Cancel
						</Button>
						<Button onClick={handleOk}>Ok</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</React.Fragment>
	);
}

export default PostList;
