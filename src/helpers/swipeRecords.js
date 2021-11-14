export function swipeRecords(root) {
	const maxDiff = 100;
	const minDiff = 30;

	let startPosition = 0;
	let diff = 0;

	root.addEventListener("touchmove", event => {
		diff = startPosition - event.changedTouches[0].pageX;
		if (Math.abs(diff) < minDiff) return;

		root.style.right = `${
			diff > maxDiff
				? maxDiff
				: diff < Math.abs(maxDiff) * -1
				? Math.abs(maxDiff) * -1
				: diff
		}px`;
	});

	root.addEventListener("touchstart", event => {
		startPosition = event.changedTouches[0].pageX;
	});

	root.addEventListener("touchend", () => {
		startPosition = 0;
		root.style.right = "0px";

		if (Math.abs(diff) >= maxDiff) {
			const direction = diff > 0 ? "swipeRight" : "swipeLeft";
			root.dispatchEvent(new CustomEvent(direction));

			root.addEventListener("animationend", () =>
				root.classList.remove("fadeInRightAnimation", "fadeInLeftAnimation")
			);

			direction === "swipeRight" && root.classList.add("fadeInRightAnimation");
			direction === "swipeLeft" && root.classList.add("fadeInLeftAnimation");
		}
	});
}
