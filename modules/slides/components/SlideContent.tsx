'use client';

import React from 'react';
import { Slide } from '@/modules/slides/types';

interface SlideContentProps {
	slide: Slide;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
	if (typeof slide.content === 'string') {
		return <div dangerouslySetInnerHTML={{ __html: slide.content }} />;
	}

	return <>{slide.content}</>;
};

export default SlideContent;
