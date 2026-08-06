'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Tweet, TweetSkeleton, type TwitterComponents } from 'react-tweet';
import 'react-tweet/theme.css';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { Button } from '@/components/ui';
import {
	COMMUNITY_TWEET_EMBEDS,
	COMMUNITY_TWEET_MOSAIC_MAX,
	COMMUNITY_TWEET_PAGE_SIZE,
	communityTweetsOnXHref,
	hasCommunityTweetContent,
} from '@/content/community-tweets';

function TweetFallbackLink({ url, note }: { url: string; note?: string }) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex min-h-[120px] flex-col justify-between gap-3 rounded-sm border border-cursor-border bg-cursor-surface p-4 text-sm text-cursor-text-secondary transition-colors hover:border-cursor-border-emphasis hover:text-cursor-text"
		>
			<span className="line-clamp-3">{note ?? 'Open this post on X'}</span>
			<span className="inline-flex items-center gap-1.5 text-xs text-cursor-text-muted">
				View on X
				<ExternalLink className="h-3 w-3 opacity-60" />
			</span>
		</a>
	);
}

function tweetComponents(url: string, note?: string): TwitterComponents {
	return {
		TweetNotFound: () => <TweetFallbackLink url={url} note={note} />,
	};
}

function TweetCard({ id, url, note, dark }: { id: string; url: string; note?: string; dark: boolean }) {
	return (
		<div
			className={`${dark ? 'dark ' : ''}rounded-sm border border-cursor-border bg-cursor-surface [&_.react-tweet-theme]:!my-0 [&_.react-tweet-theme]:!mx-0`}
		>
			<Tweet
				id={id}
				apiUrl={`/api/tweets/${id}`}
				components={tweetComponents(url, note)}
				fallback={<TweetSkeleton />}
			/>
		</div>
	);
}

export default function CommunityTweets() {
	const { t } = useI18n();
	const { resolved } = useTheme();
	const mosaicPool = COMMUNITY_TWEET_EMBEDS.slice(0, COMMUNITY_TWEET_MOSAIC_MAX);
	const [visibleCount, setVisibleCount] = useState(Math.min(COMMUNITY_TWEET_PAGE_SIZE, mosaicPool.length));
	const dark = resolved === 'dark';

	if (!hasCommunityTweetContent()) return null;

	const visibleEmbeds = mosaicPool.slice(0, visibleCount);
	const canLoadMore = visibleCount < mosaicPool.length;

	return (
		<section id="community-tweets" className="mb-12 md:mb-16">
			<p className="cursor-eyebrow mb-2">{t('home.communityTweets')}</p>
			<h2 className="cursor-section-title mb-8 text-cursor-text">{t('home.communityTweetsHeading')}</h2>

			{visibleEmbeds.length > 0 && (
				<div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
					{visibleEmbeds.map((entry) => (
						<div key={entry.id} className="mb-4 break-inside-avoid">
							<TweetCard id={entry.id} url={entry.url} note={entry.note} dark={dark} />
						</div>
					))}
				</div>
			)}

			<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
				{canLoadMore && (
					<Button
						type="button"
						variant="secondary"
						size="md"
						onClick={() => setVisibleCount((count) => Math.min(count + COMMUNITY_TWEET_PAGE_SIZE, mosaicPool.length))}
					>
						{t('home.communityTweetsLoadMore')}
					</Button>
				)}
				<Button href={communityTweetsOnXHref()} external variant="secondary" size="md">
					{t('home.communityTweetsBrowseX')}
					<ExternalLink className="w-3.5 h-3.5 opacity-60" />
				</Button>
			</div>
		</section>
	);
}
