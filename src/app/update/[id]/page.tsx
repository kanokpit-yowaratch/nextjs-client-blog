import { PostParams } from '@/types/common';
import React from 'react';

function page({ params }: PostParams) {
	return <div>Update post: {params.id}</div>;
}

export default page;
