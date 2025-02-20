// src/components/LogoCanvas.tsx
'use client';

import { useState } from 'react';
import Controls from './Controls';
import ExportButton from './ExportButton';

const LogoCanvas = () => {
	// -------------------------
	// 1) State Hooks
	// -------------------------
	const [shape, setShape] = useState<'circle' | 'rect' | 'polygon' | 'star'>(
		'circle'
	);
	const [color, setColor] = useState('#ff007f');
	const [strokeColor, setStrokeColor] = useState('#ffffff');
	const [strokeWidth, setStrokeWidth] = useState(2);
	const [size, setSize] = useState(50);
	const [rotation, setRotation] = useState(0);
	const [sides, setSides] = useState(5);
	const [neonGlow, setNeonGlow] = useState(false);

	// -------------------------
	// 2) Shape Generation Helpers
	// -------------------------
	// Generate points for a regular polygon of N sides.
	const generatePolygonPoints = (
		cx: number,
		cy: number,
		radius: number,
		numSides: number
	): string => {
		const points: string[] = [];
		for (let i = 0; i < numSides; i++) {
			// Start at top by offsetting angle by -90deg (Math.PI/2)
			const angle = (2 * Math.PI * i) / numSides - Math.PI / 2;
			const x = cx + radius * Math.cos(angle);
			const y = cy + radius * Math.sin(angle);
			points.push(`${x},${y}`);
		}
		return points.join(' ');
	};

	// Return the main shape element (circle, rect, polygon, star)
	const generateShapeElement = (): string => {
		const transform = `transform="rotate(${rotation}, 100, 100)"`;
		const stroke = `stroke="${strokeColor}" stroke-width="${strokeWidth}"`;
		const style = neonGlow
			? `style="filter: drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})"`
			: '';

		switch (shape) {
			case 'circle':
				return `<circle cx="100" cy="100" r="${size}" fill="${color}" ${stroke} ${transform} ${style} />`;

			case 'rect':
				// Center the rect at (100, 100)
				const half = size;
				return `<rect x="${100 - half}" y="${100 - half}"
                     width="${size * 2}" height="${size * 2}"
                     fill="${color}" ${stroke} ${transform} ${style} />`;

			case 'polygon':
				const polygonPoints = generatePolygonPoints(100, 100, size, sides);
				return `<polygon points="${polygonPoints}"
                        fill="${color}" ${stroke} ${transform} ${style} />`;

			case 'star':
				// Hard-coded 5-point star from earlier example
				return `<polygon points="100,10 40,198 190,78 10,78 160,198"
                        fill="${color}" ${stroke} ${transform} ${style} />`;

			default:
				return '';
		}
	};

	// Construct the full SVG markup string
	const generateSVG = (): string => {
		const shapeElement = generateShapeElement();
		return `
      <svg
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${shapeElement}
      </svg>
    `;
	};

	// -------------------------
	// 3) Render
	// -------------------------
	return (
		<div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-900 text-white rounded-lg shadow-md">
			{/* Left side: SVG Preview + Export Button */}
			<div className="flex flex-col items-center justify-center w-full md:w-1/2">
				<h2 className="text-lg font-bold mb-2">Logo Preview</h2>
				<div
					className="w-48 h-48 flex items-center justify-center"
					dangerouslySetInnerHTML={{ __html: generateSVG() }}
				/>

				{/* Use ExportButton to download the generated SVG */}
				<ExportButton
					getSVGContent={generateSVG}
					fileName="my-logo.svg"
					label="Download SVG"
				/>
			</div>

			{/* Right side: Controls */}
			<div className="w-full md:w-1/2">
				<Controls
					shape={shape}
					setShape={setShape}
					color={color}
					setColor={setColor}
					strokeColor={strokeColor}
					setStrokeColor={setStrokeColor}
					strokeWidth={strokeWidth}
					setStrokeWidth={setStrokeWidth}
					size={size}
					setSize={setSize}
					rotation={rotation}
					setRotation={setRotation}
					sides={sides}
					setSides={setSides}
					neonGlow={neonGlow}
					setNeonGlow={setNeonGlow}
				/>
			</div>
		</div>
	);
};

export default LogoCanvas;
