import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { HeaderProps } from '@/types/common';

export default function Header(props: HeaderProps) {
	const { title } = props;

	return (
		<React.Fragment>
			<Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Typography component="h2" variant="h5" color="inherit" noWrap sx={{ flex: 1 }}>
					<Link href="/">{title}</Link>
				</Typography>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<Button variant="outlined" size="small">
					Sign up
				</Button>
			</Toolbar>
		</React.Fragment>
	);
}
