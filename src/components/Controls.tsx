// src/components/Controls.tsx
'use client';

import React from 'react';

// 1. Define an interface describing which props we expect:
interface ControlsProps {
	shape: 'circle' | 'rect' | 'polygon' | 'star';
	setShape: React.Dispatch<
		React.SetStateAction<'circle' | 'rect' | 'polygon' | 'star'>
	>;
	color: string;
	setColor: React.Dispatch<React.SetStateAction<string>>;
	strokeColor: string;
	setStrokeColor: React.Dispatch<React.SetStateAction<string>>;
	strokeWidth: number;
	setStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
	size: number;
	setSize: React.Dispatch<React.SetStateAction<number>>;
	rotation: number;
	setRotation: React.Dispatch<React.SetStateAction<number>>;
	sides: number;
	setSides: React.Dispatch<React.SetStateAction<number>>;
	neonGlow: boolean;
	setNeonGlow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.FC<ControlsProps> = ({
	shape,
	setShape,
	color,
	setColor,
	strokeColor,
	setStrokeColor,
	strokeWidth,
	setStrokeWidth,
	size,
	setSize,
	rotation,
	setRotation,
	sides,
	setSides,
	neonGlow,
	setNeonGlow,
}) => {
	return (
		<div className="flex flex-col gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-md w-full max-w-md">
			<h3 className="text-xl font-bold">Logo Controls</h3>

			{/* Shape Selection */}
			<div className="flex flex-col gap-1">
				<label htmlFor="shape-select">Shape</label>
				<select
					id="shape-select"
					value={shape}
					onChange={(e) => setShape(e.target.value as any)}
					className="p-2 bg-gray-700 border border-gray-600 rounded-md"
				>
					<option value="circle">Circle</option>
					<option value="rect">Rectangle</option>
					<option value="polygon">Polygon</option>
					<option value="star">Star</option>
				</select>
			</div>

			{/* Fill Color */}
			<div className="flex flex-col gap-1">
				<label htmlFor="fill-color">Fill Color</label>
				<input
					id="fill-color"
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
					className="w-10 h-10 border-none"
				/>
			</div>

			{/* Stroke Color */}
			<div className="flex flex-col gap-1">
				<label htmlFor="stroke-color">Stroke Color</label>
				<input
					id="stroke-color"
					type="color"
					value={strokeColor}
					onChange={(e) => setStrokeColor(e.target.value)}
					className="w-10 h-10 border-none"
				/>
			</div>

			{/* Stroke Width */}
			<div className="flex flex-col gap-1">
				<label htmlFor="stroke-width">Stroke Width: {strokeWidth}px</label>
				<input
					id="stroke-width"
					type="range"
					min={0}
					max={10}
					value={strokeWidth}
					onChange={(e) => setStrokeWidth(Number(e.target.value))}
				/>
			</div>

			{/* Size */}
			<div className="flex flex-col gap-1">
				<label htmlFor="size-range">Size (Radius/Half-Width): {size}px</label>
				<input
					id="size-range"
					type="range"
					min={10}
					max={90}
					value={size}
					onChange={(e) => setSize(Number(e.target.value))}
				/>
			</div>

			{/* Rotation */}
			<div className="flex flex-col gap-1">
				<label htmlFor="rotation-range">Rotation: {rotation}°</label>
				<input
					id="rotation-range"
					type="range"
					min={0}
					max={360}
					value={rotation}
					onChange={(e) => setRotation(Number(e.target.value))}
				/>
			</div>

			{/* Polygon Sides (only if polygon selected) */}
			{shape === 'polygon' && (
				<div className="flex flex-col gap-1">
					<label htmlFor="sides-range">Number of Sides: {sides}</label>
					<input
						id="sides-range"
						type="range"
						min={3}
						max={12}
						value={sides}
						onChange={(e) => setSides(Number(e.target.value))}
					/>
				</div>
			)}

			{/* Neon Glow Toggle */}
			<div className="flex items-center gap-2">
				<input
					id="neon-glow"
					type="checkbox"
					checked={neonGlow}
					onChange={(e) => setNeonGlow(e.target.checked)}
				/>
				<label htmlFor="neon-glow">Neon Glow</label>
			</div>
		</div>
	);
};

export default Controls;
