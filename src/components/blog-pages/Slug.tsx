import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Paper } from '@mui/material';
import { MainProps } from '@/types/common';

function Slug(props: MainProps) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [details, setDetails] = useState('');
	const [slugFeaturedPost, setSlugFeaturedPost] = useState({ image: '', imageText: '' });

	const { slug } = props;

	const postContent = () => {
		const api = process.env.NEXT_PUBLIC_API;
		axios
			.get(`${api}/post/${slug}`)
			.then((response) => {
				const data: Post = response.data;
				// console.log(data);
				setTitle(data.title);
				setDescription(data.description);
				setDetails(data.details);
				const slugHeader = {
					image: `${api}/medias/${data.cover_path}`,
					imageText: data.title,
				};
				setSlugFeaturedPost(slugHeader);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		postContent();
	}, []);

	return (
		<>
			<main>
				<Paper
					sx={{
						position: 'relative',
						py: 35,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundImage: `url(${slugFeaturedPost.image})`,
					}}>
					{<img style={{ display: 'none' }} src={slugFeaturedPost.image} alt={slugFeaturedPost.imageText} />}
				</Paper>
				<Grid container spacing={4}></Grid>
				<Grid container spacing={5} sx={{ mt: 3 }}>
					<Grid
						item
						xs={12}
						md={8}
						sx={{
							'& .markdown': {
								py: 0,
							},
						}}>
						<h1>{title}</h1>
						<h2>{description}</h2>
						<p>{details}</p>
					</Grid>
				</Grid>
			</main>
		</>
	);
}

export default Slug;
