import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import PostList from './PostList';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

export default function Blog() {
	return (
		<>
			<Container maxWidth="lg">
				<Header title="Blog" />
				<main>
					<Grid container spacing={5} sx={{ mt: 3 }}>
						<PostList />
						<Sidebar />
					</Grid>
				</main>
			</Container>
			<Footer title="Footer" description="Something here to give the footer a purpose!" />
		</>
	);
}
