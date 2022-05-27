export const transitionOnEnter =
	(duration: number = 500) =>
	(el: Element, done: () => void | undefined) => {
		const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration });
		animation.finished.then(done);
	};

export const transitionOnExit =
	(duration: number = 500) =>
	(el: Element, done: () => void | undefined) => {
		const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration });
		a.finished.then(done);
	};
