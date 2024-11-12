'use client';
import { Button, Box, Typography, Link, Grid, Container } from '@mui/material';
import NextImage from 'next/image';
import { blogInfo } from '@/types/common';

async function page({ params }: any) {
	const id = params.id;
	const blog: Post = await blogInfo(id);

	return (
		<Container maxWidth="lg" sx={{ p: 2 }}>
			<Box dir="rtl">
				<Link href="/blog">
					<Button variant="contained">Post list</Button>
				</Link>
			</Box>
			<Box>
				<Typography variant="h6" gutterBottom component="div" align="center">
					Post detail
				</Typography>

				<Box display="flex" flexDirection="column" alignItems="center">
					<Box sx={{ mb: 1 }} display="flex" flexDirection="column" alignItems="center">
						<div className="preview-image">
							{blog.cover_path ? (
								<NextImage
									src={`${process.env.NEXT_PUBLIC_API}/medias/${blog.cover_path}`}
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
					</Box>

					<Box>
						<Box>Title: {blog.title}</Box>
						<Grid item xs={12}>
							Slug: {blog.slug}
						</Grid>
						<Grid item xs={12}>
							Description: {blog.description}
						</Grid>
						<Grid item xs={12}>
							Details: {blog.details}
						</Grid>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}

export default page;
