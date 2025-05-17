"use client";

interface Props {
	iconURL: string;
	title: string;
	value: number;
}

const MetricBox = ({ iconURL, title, value }: Props) => {
	return (
		<section className="section w-full flex gap-6">
			<div className="hidden h-12 w-12 md:flex items-center justify-center rounded-md border border-neutral-200">
				<img src={iconURL} alt="metric_Icon" />
			</div>
			<div className="flex flex-col items-start self-stretch">
				<div className="self-stretch text-neutral-600 text-sm font-medium leading-5">{title}</div>
				<div className="self-stretch text-neutral-900 text-2xl font-medium leading-8">{value}</div>
			</div>
		</section>
	);
};

export default MetricBox;
