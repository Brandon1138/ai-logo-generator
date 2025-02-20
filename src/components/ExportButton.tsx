// src/components/ExportButton.tsx
'use client';

import React from 'react';
import { saveAs } from 'file-saver';

// Define the props we expect
interface ExportButtonProps {
	// A callback that returns the final SVG (or any file content) as a string
	getSVGContent: () => string;
	// Optional: a file name to save as
	fileName?: string;
	// Optional: custom label for the button
	label?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
	getSVGContent,
	fileName = 'logo.svg',
	label = 'Download SVG',
}) => {
	const handleExport = () => {
		// 1) Get the SVG markup from parent via prop
		const svgString = getSVGContent();
		// 2) Convert it to a Blob for file-saver
		const blob = new Blob([svgString], { type: 'image/svg+xml' });
		// 3) Use file-saver to trigger the download
		saveAs(blob, fileName);
	};

	return (
		<button
			onClick={handleExport}
			className="mt-4 p-2 bg-blue-500 rounded-md hover:bg-blue-600"
		>
			{label}
		</button>
	);
};

export default ExportButton;
