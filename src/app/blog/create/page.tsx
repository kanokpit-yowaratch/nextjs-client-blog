'use client';
import { useState } from 'react';
import {
	Button,
	Box,
	Modal,
	Typography,
	Link,
	Grid,
	TextField,
	Container,
	DialogActions,
} from '@mui/material';
import Folder from '@mui/icons-material/Folder';
import NextImage from 'next/image';
import axios from 'axios';
import VisuallyHiddenInput from '@/app/styles/visuallyHiddenInput';
import Style from '@/app/styles/style';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import Textarea from '@mui/joy/Textarea';

function Create() {
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [details, setDetails] = useState('');
	const [file, setFile] = useState<File>();
	const [previewAvatar, setPreviewAvatar] = useState<Blob | MediaSource | null>();
	const [openSuccessModal, setOpenSuccessModal] = useState(false);
	const [active, setActive] = useState(true);

	const handleClose = () => {
		setOpenSuccessModal(false);
		window.location.href = `/blog`;
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const api = process.env.NEXT_PUBLIC_API;
		const formData = new FormData();
		if (file) {
			formData.set('file', file);
		}
		formData.set('title', title);
		formData.set('slug', slug);
		formData.set('description', description);
		formData.set('details', details);

		// manual, review later
		formData.set('category_id', '1');
		formData.set('count_view', '0');
		formData.set('related', '');
		formData.set('seo_title', '');
		formData.set('seo_keywords', '');
		formData.set('seo_description', '');
		formData.set('active_status', '1');
		formData.set('article_status', '1');

		try {
			await axios
				.post(`${api}/blogs`, formData)
				.then((response) => {
					// console.log(response.data);
					if (response.data.id) {
						setOpenSuccessModal(true);
						setActive(false);
					}
				})
				.catch((error) => {
					console.log('error: ', error);
				});
		} catch (e) {
			console.error(e);
		}
	};

	const onSelectFile = (event: any) => {
		const fileObject = event.target.files?.[0] || null;
		// console.log(fileObject);
		if (fileObject) {
			const imgName = fileObject.name;

			const reader = new FileReader();
			reader.readAsDataURL(fileObject);
			reader.onloadend = () => {
				const img: any = new Image();

				img.src = reader.result;
				// console.log(reader.result);

				img.onload = () => {
					const canvas = document.createElement('canvas');
					const maxSize = Math.max(img.width, img.height);
					canvas.width = maxSize;
					canvas.height = maxSize;
					const ctx = canvas.getContext('2d');
					ctx?.drawImage(img, (maxSize - img.width) / 2, (maxSize - img.height) / 2);
					canvas.toBlob(
						(blob: any) => {
							const file = new File([blob], imgName, {
								type: 'image/png',
								lastModified: Date.now(),
							});
							// console.log(file);
							setPreviewAvatar(file);
							setFile(fileObject);
						},
						'image/jpeg',
						0.8,
					);
				};
			};
		}
	};

	return (
		<Container maxWidth="lg" sx={{ p: 2 }}>
			<Box display="flex" sx={{ mb: 2 }}>
				<Box sx={{ flexGrow: 1 }}>
					<Typography variant="h6" gutterBottom component="h6" sx={{ mb: 0, mt: 0 }}>
						Create post
					</Typography>
				</Box>
				<Box>
					<Link href="/blog">
						<Button variant="contained">
							<ArrowBackIosNewOutlined sx={{ mr: 1 }} />
							Post list
						</Button>
					</Link>
				</Box>
			</Box>
			<Box>
				<form onSubmit={handleSubmit}>
					<Box display="flex" flexDirection="column" alignItems="center">
						<Box sx={{ mb: 1 }} display="flex" flexDirection="column" alignItems="center">
							<div className="preview-image">
								{previewAvatar ? (
									<NextImage
										src={URL.createObjectURL(previewAvatar)}
										fill
										style={{
											objectFit: 'cover',
										}}
										alt=""
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

							<Button
								sx={{ mt: 1 }}
								component="label"
								disabled={!active}
								variant="contained"
								startIcon={<Folder />}
								onChange={onSelectFile}>
								Browse file
								<VisuallyHiddenInput type="file" />
							</Button>
						</Box>

						<Grid container spacing={2} className="form-input">
							<Grid item xs={12}>
								<TextField
									id="title"
									label="Title"
									variant="outlined"
									disabled={!active}
									onChange={(e) => setTitle(e.target.value)}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="slug"
									label="Slug"
									variant="outlined"
									disabled={!active}
									onChange={(e) => setSlug(e.target.value)}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="description"
									label="Description"
									variant="outlined"
									disabled={!active}
									onChange={(e) => setDescription(e.target.value)}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<Textarea
									id="details"
									minRows={7}
									placeholder="Write a content…"
									variant="plain"
									disabled={!active}
									onChange={(e) => setDetails(e.target.value)}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<Button type="submit" variant="contained" disabled={!active} fullWidth>
									Create
								</Button>
							</Grid>
						</Grid>
					</Box>
				</form>
			</Box>

			<Modal
				open={openSuccessModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={Style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Create post successfully.
					</Typography>
					<DialogActions>
						<Button autoFocus onClick={handleClose}>
							Ok
						</Button>
					</DialogActions>
				</Box>
			</Modal>
		</Container>
	);
}

export default Create;
