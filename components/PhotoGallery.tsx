'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryPhoto } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

interface PhotoGalleryProps {
	photos: GalleryPhoto[];
	embedded?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, embedded = false }) => {
	const { t } = useI18n();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);

	if (photos.length === 0) {
		return null;
	}

	const currentPhoto = photos[currentIndex];

	const content = (
		<>
			<div className="flex items-baseline justify-between gap-4 mb-6">
				<div>
					<h2
						className={embedded ? 'text-lg font-semibold text-cursor-text' : 'text-xl font-semibold text-cursor-text'}
					>
						{t('recap.galleryTitle')}
					</h2>
					<p className="text-cursor-text-muted text-sm mt-1">
						{t('recap.gallerySubtitle', { count: String(photos.length) })}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{photos.map((photo, index) => (
					<motion.button
						key={`${photo.src}-${index}`}
						type="button"
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.25) }}
						className="relative aspect-square overflow-hidden rounded-lg border border-cursor-border bg-cursor-bg-dark text-left"
						onClick={() => {
							setCurrentIndex(index);
							setIsFullscreen(true);
						}}
						aria-label={t('recap.openPhoto', { index: String(index + 1) })}
					>
						<Image
							src={photo.src}
							alt={photo.alt}
							fill
							className="object-cover hover:scale-105 transition-transform duration-300"
							sizes="(max-width: 768px) 50vw, 33vw"
						/>
					</motion.button>
				))}
			</div>

			<AnimatePresence>
				{isFullscreen ? (
					<div
						className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
						onClick={() => setIsFullscreen(false)}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.98 }}
							transition={{ duration: 0.2 }}
							className="relative max-w-6xl w-full max-h-[90vh]"
							onClick={(event) => event.stopPropagation()}
						>
							<button
								onClick={() => setIsFullscreen(false)}
								className="absolute top-4 right-4 z-10 bg-cursor-bg/80 border border-cursor-border rounded-lg p-2 text-cursor-text hover:bg-cursor-bg transition-colors"
								aria-label={t('recap.closeGallery')}
							>
								<X className="w-5 h-5" />
							</button>

							<div className="relative w-full h-[80vh] mb-4">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentIndex}
										initial={{ opacity: 0, x: 40 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -40 }}
										transition={{ duration: 0.2 }}
										className="relative w-full h-full"
									>
										<Image src={currentPhoto.src} alt={currentPhoto.alt} fill className="object-contain" sizes="90vw" />
									</motion.div>
								</AnimatePresence>
							</div>

							<div className="bg-cursor-bg border border-cursor-border rounded-lg p-4 text-center">
								<p className="text-cursor-text font-medium">
									{t('recap.photoLabel', { index: String(currentIndex + 1), total: String(photos.length) })}
								</p>
							</div>

							{photos.length > 1 ? (
								<>
									<button
										onClick={() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)}
										className="absolute left-4 top-1/2 -translate-y-1/2 bg-cursor-bg/80 border border-cursor-border rounded-lg p-2 text-cursor-text hover:bg-cursor-bg transition-colors"
										aria-label={t('recap.prevPhoto')}
									>
										<ChevronLeft className="w-6 h-6" />
									</button>
									<button
										onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
										className="absolute right-4 top-1/2 -translate-y-1/2 bg-cursor-bg/80 border border-cursor-border rounded-lg p-2 text-cursor-text hover:bg-cursor-bg transition-colors"
										aria-label={t('recap.nextPhoto')}
									>
										<ChevronRight className="w-6 h-6" />
									</button>
								</>
							) : null}
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>
		</>
	);

	if (embedded) {
		return <div className="border-t border-cursor-border mt-6 pt-6">{content}</div>;
	}

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1 }}
			className="bg-[#1B1913] border border-cursor-border rounded-lg p-8 mb-8"
		>
			{content}
		</motion.section>
	);
};

export default PhotoGallery;
