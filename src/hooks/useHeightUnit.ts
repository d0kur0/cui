export function useHeightUnit() {
	const setCustomProperty = () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	};

	setCustomProperty();
	window.addEventListener("resize", setCustomProperty);
	window.addEventListener("orientationchange", setCustomProperty);
}
