'use client';

import React, { useEffect, useState } from 'react';

interface DiagramSlideProps {
	src: string;
	alt: string;
	caption?: string;
}

const DiagramSlide: React.FC<DiagramSlideProps> = ({ src, alt, caption }) => {
	const [svgContent, setSvgContent] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsLoading(true);
		fetch(src)
			.then((res) => {
				if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
				return res.text();
			})
			.then((text) => {
				setSvgContent(text);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			});
	}, [src]);

	if (isLoading) {
		return <div className="animate-pulse text-cursor-text-muted py-12 text-center">Loading diagram...</div>;
	}

	if (error) {
		return (
			<div className="bg-cursor-accent-red-bg border border-cursor-border-emphasis rounded p-4 text-cursor-accent-red text-center">
				<p>Error loading diagram: {error}</p>
				<p className="text-sm mt-2">Path: {src}</p>
			</div>
		);
	}

	if (!svgContent) {
		return <div className="text-cursor-text-muted text-center py-12">{alt}</div>;
	}

	const modifiedSvg = svgContent.replace(
		/<svg([^>]*)>/,
		'<svg$1 width="100%" height="auto" style="max-width:100%;display:block;">',
	);

	return (
		<div className="flex flex-col items-center justify-center space-y-6">
			<div className="w-full max-w-4xl">
				<div
					className="w-full border border-cursor-border rounded-md overflow-hidden"
					style={{ minHeight: '300px' }}
					dangerouslySetInnerHTML={{ __html: modifiedSvg }}
				/>
			</div>
			{caption ? <p className="text-cursor-text-muted text-lg text-center max-w-3xl">{caption}</p> : null}
		</div>
	);
};

export default DiagramSlide;
