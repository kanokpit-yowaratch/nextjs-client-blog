import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

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
	],
};

export default function Sidebar() {
	return (
		<Grid item xs={12} md={4}>
			<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
				Archives
			</Typography>
			{sidebar.archives.map((archive) => (
				<Link display="block" variant="body1" href={archive.url} key={archive.title}>
					{archive.title}
				</Link>
			))}
		</Grid>
	);
}
