import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PostList from './PostList';

const sidebar = {
	archives: [
		{ title: 'March 2020', url: '#' },
		{ title: 'February 2020', url: '#' },
		{ title: 'January 2020', url: '#' },
		{ title: 'November 1999', url: '#' },
		{ title: 'October 1999', url: '#' },
		{ title: 'September 1999', url: '#' },
		{ title: 'August 1999', url: '#' },
		{ title: 'July 1999', url: '#' },
		{ title: 'June 1999', url: '#' },
		{ title: 'May 1999', url: '#' },
		{ title: 'April 1999', url: '#' },
	]
};

export default function Blog() {
	return (
		<>
			<Container maxWidth="lg">
				<Header title="Blog" />
				<main>
					<Grid container spacing={5} sx={{ mt: 3 }}>
						<PostList />
						<Sidebar
							archives={sidebar.archives}
						/>
					</Grid>
				</main>
			</Container>
			<Footer
				title="Footer"
				description="Something here to give the footer a purpose!"
			/>
		</>
	);
}
