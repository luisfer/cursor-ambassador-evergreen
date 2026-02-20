import React from 'react';

interface JsonLdProps {
	data: Record<string, unknown> | Record<string, unknown>[];
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
};

export default JsonLd;
