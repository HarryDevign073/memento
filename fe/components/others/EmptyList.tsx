interface EmptyListProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	actions?: React.ReactNode;
}

const EmptyList: React.FC<EmptyListProps> = ({ icon, title, description, actions }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			{icon}
			<div className="max-w-[300px] md:max-w-[460px] text-center">
				<h2 className="text-md font-semibold text-neutral-900">{title}</h2>
				<p className="text-sm font-normal text-neutral-600">{description}</p>
			</div>
			{actions && actions}
		</div>
	);
};

export default EmptyList;
