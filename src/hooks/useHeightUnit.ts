function useHeightUnit() {
	const setCustomPropery = () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	};

	setCustomPropery();
	window.addEventListener("resize", setCustomPropery);
	window.addEventListener("orientationchange", setCustomPropery);
}

export default useHeightUnit;
