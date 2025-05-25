import { IconProps } from "./IconProps";

const HeartIcon: React.FC<IconProps & { isGray?: boolean }> = ({ size = 24, className, active, isGray }) => {
	if (!active) {
		return (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={className}
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
					stroke={isGray ? "#475467" : "white"}
					strokeWidth="2.00328"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.1547 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
				fill="url(#paint0_linear_2390_28148)"
				stroke="url(#paint1_linear_2390_28148)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_2390_28148"
					x1="22"
					y1="3"
					x2="4.28242"
					y2="22.8694"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FAD0C4" />
					<stop offset="1" stopColor="#FF9A9E" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_2390_28148"
					x1="22"
					y1="3"
					x2="4.28242"
					y2="22.8694"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FAD0C4" />
					<stop offset="1" stopColor="#FF9A9E" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default HeartIcon;
