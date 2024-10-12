import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface SidebarProps {
	archives: ReadonlyArray<{
		url: string;
		title: string;
	}>;
}

export default function Sidebar(props: SidebarProps) {
	const { archives } = props;

	return (
		<Grid item xs={12} md={4}>
			<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
				Archives
			</Typography>
			{archives.map((archive) => (
				<Link display="block" variant="body1" href={archive.url} key={archive.title}>
					{archive.title}
				</Link>
			))}
		</Grid>
	);
}
