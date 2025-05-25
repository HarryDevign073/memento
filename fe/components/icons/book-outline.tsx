import { IconProps } from "./IconProps";

const BookOutline: React.FC<IconProps> = ({ className, size = 24 }) => {
	return (
		<svg
			width={size}
			height={(size * 20) / 21}
			viewBox="0 0 21 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<g id="book-outline">
				<path
					id="Vector"
					d="M10.5 5.83325V10.8333"
					stroke="currentColor"
					strokeWidth="1.66667"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					id="Vector_2"
					d="M3.8335 16.2501V3.75008C3.8335 3.19755 4.05299 2.66764 4.44369 2.27694C4.83439 1.88624 5.3643 1.66675 5.91683 1.66675H16.3335C16.5545 1.66675 16.7665 1.75455 16.9228 1.91083C17.079 2.06711 17.1668 2.27907 17.1668 2.50008V17.5001C17.1668 17.7211 17.079 17.9331 16.9228 18.0893C16.7665 18.2456 16.5545 18.3334 16.3335 18.3334H5.91683C5.3643 18.3334 4.83439 18.1139 4.44369 17.7232C4.05299 17.3325 3.8335 16.8026 3.8335 16.2501ZM3.8335 16.2501C3.8335 15.6975 4.05299 15.1676 4.44369 14.7769C4.83439 14.3862 5.3643 14.1667 5.91683 14.1667H17.1668"
					stroke="currentColor"
					strokeWidth="1.66667"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					id="Vector_3"
					d="M8 8.33325H13"
					stroke="currentColor"
					strokeWidth="1.66667"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	);
};

export default BookOutline;
