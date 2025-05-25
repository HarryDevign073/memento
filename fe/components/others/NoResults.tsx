interface NoResultsProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const NoResults: React.FC<NoResultsProps> = ({ icon, title, description }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			{icon}
			<h2 className="text-md font-semibold text-neutral-900">{title}</h2>
			<p className="text-sm font-normal text-neutral-600">{description}</p>
		</div>
	);
};

export default NoResults;
