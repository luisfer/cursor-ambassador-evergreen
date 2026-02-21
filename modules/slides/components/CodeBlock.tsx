'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
	code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2_000);
		} catch (error) {
			console.error('Failed to copy code', error);
		}
	};

	return (
		<div className="relative group">
			<button
				onClick={handleCopy}
				className="absolute top-4 right-4 p-2 rounded bg-cursor-surface-raised hover:bg-cursor-surface text-cursor-text-muted hover:text-cursor-text transition-opacity opacity-0 group-hover:opacity-100"
				aria-label="Copy code"
			>
				{isCopied ? <Check className="w-5 h-5 text-cursor-accent-green" /> : <Copy className="w-5 h-5" />}
			</button>
			<pre className="bg-cursor-surface p-6 rounded-md border border-cursor-border overflow-x-auto">
				<code className="text-base md:text-lg font-mono text-cursor-text-secondary whitespace-pre-wrap">{code}</code>
			</pre>
		</div>
	);
};

export default CodeBlock;
