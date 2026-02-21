import { exampleEventRecap } from '@/content/recaps/example-event';
import { RecapData } from '@/lib/types';

export const recapsBySlug: Record<string, RecapData> = {
	[exampleEventRecap.slug]: exampleEventRecap,
};
