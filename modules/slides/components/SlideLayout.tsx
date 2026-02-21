'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideLayoutProps {
	currentSlide: number;
	totalSlides: number;
	children: React.ReactNode;
	storageKey?: string;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({
	currentSlide,
	totalSlides,
	children,
	storageKey = 'cursor-ambassador-current-slide',
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const [isNavigating, setIsNavigating] = useState(false);
	const basePath = pathname.replace(/\/\d+$/, '');

	const goToSlide = useCallback(
		(slideId: number) => {
			if (slideId < 1 || slideId > totalSlides) return;
			setIsNavigating(true);
			router.push(`${basePath}/${slideId}`);
		},
		[router, basePath, totalSlides],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (isNavigating) return;

			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					if (currentSlide > 1) goToSlide(currentSlide - 1);
					break;
				case 'ArrowRight':
					event.preventDefault();
					if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
					break;
				case 'Home':
					event.preventDefault();
					goToSlide(1);
					break;
				case 'End':
					event.preventDefault();
					goToSlide(totalSlides);
					break;
				default:
					break;
			}
		},
		[currentSlide, isNavigating, goToSlide, totalSlides],
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	useEffect(() => {
		setIsNavigating(false);
		localStorage.setItem(storageKey, String(currentSlide));
	}, [currentSlide, storageKey]);

	return (
		<div className="min-h-screen bg-cursor-bg text-cursor-text flex flex-col">
			<main className="flex-1 flex items-start justify-center p-6 md:p-10 pt-8 overflow-y-auto pb-32 md:pb-36">
				<div className="w-full max-w-6xl pb-16">{children}</div>
			</main>

			<div className="fixed bottom-0 left-0 right-0 p-4 bg-cursor-bg/90 backdrop-blur-sm border-t border-cursor-border">
				<div className="max-w-6xl mx-auto flex items-center justify-between">
					<button
						onClick={() => goToSlide(currentSlide - 1)}
						disabled={currentSlide === 1}
						className="flex items-center space-x-2 px-4 py-2 rounded-md bg-cursor-surface hover:bg-cursor-surface-raised disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						aria-label="Previous slide"
					>
						<ChevronLeft className="w-5 h-5" />
						<span className="hidden md:inline">Previous</span>
					</button>

					<div className="flex items-center space-x-2">
						{Array.from({ length: totalSlides }, (_, i) => i + 1).map((slideId) => (
							<button
								key={slideId}
								onClick={() => goToSlide(slideId)}
								className={`w-2 h-2 rounded-full transition-all ${
									slideId === currentSlide ? 'bg-cursor-text w-8' : 'bg-cursor-text-faint hover:bg-cursor-text-muted'
								}`}
								aria-label={`Go to slide ${slideId}`}
							/>
						))}
					</div>

					<div className="text-sm text-cursor-text-muted hidden md:block">
						{currentSlide} / {totalSlides}
					</div>

					<button
						onClick={() => goToSlide(currentSlide + 1)}
						disabled={currentSlide >= totalSlides}
						className="flex items-center space-x-2 px-4 py-2 rounded-md bg-cursor-surface hover:bg-cursor-surface-raised disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						aria-label="Next slide"
					>
						<span className="hidden md:inline">Next</span>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SlideLayout;
