const PdfIcon = () => {
	return (
		<div className="relative">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="41" viewBox="0 0 32 41" fill="none">
				<path
					d="M4 1.25H20C20.0911 1.25 20.1793 1.27728 20.2539 1.32715L20.3232 1.38379L31.1162 12.1768C31.2019 12.2625 31.25 12.3788 31.25 12.5V36.5C31.25 38.2949 29.7949 39.75 28 39.75H4C2.20507 39.75 0.75 38.2949 0.75 36.5V4.5C0.750001 2.70507 2.20508 1.25 4 1.25Z"
					stroke="#D0D5DD"
					strokeWidth="1.5"
				/>
				<path d="M20 1V8.5C20 10.7091 21.7909 12.5 24 12.5H31.5" stroke="#D0D5DD" strokeWidth="1.5" />
			</svg>

			<span className="text-[10px] font-bold text-white px-[3px] py-[2px] rounded-[2px] bg-red-600 absolute bottom-2 -left-2">
				PDF
			</span>
		</div>
	);
};

export default PdfIcon;
