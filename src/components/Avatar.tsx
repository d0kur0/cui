import { JSXElement, Match, Switch, createSignal } from "solid-js";

import styles from "./Avatar.module.css";

type AvatarProps = {
	name?: string;
	size?: "small" | "default" | "large";
	isPlug?: boolean;
	margin?: string;
	children?: JSXElement;
	imageSrc?: string;
};

type NameProps = { name: string };

function Name({ name }: NameProps) {
	const initials = name
		.split(" ")
		.slice(0, 2)
		.map(([symbol]) => symbol)
		.join("")
		.padEnd(2, name[1] || "");

	return <div class={styles.initials}>{initials}</div>;
}

type ImageProps = {
	src: string;
	name: string;
	onLoad: () => void;
	onError: () => void;
};

function Image({ src, name, onLoad, onError }: ImageProps) {
	const [error, setError] = createSignal(false);

	const handleError = () => {
		setError(true);
		onError();
	};

	return (
		<Switch>
			<Match when={error()}>
				<Name name={name} />
			</Match>
			<Match when={!error()}>
				<img
					src={src}
					alt="user avatar image"
					class={styles.avatarImage}
					onLoad={onLoad}
					onError={handleError}
				/>
			</Match>
		</Switch>
	);
}

export function Avatar({ size, name, imageSrc, margin, isPlug, children }: AvatarProps) {
	const [isLoading, setIsLoading] = createSignal(Boolean(imageSrc) || false);

	const onImageLoaded = () => {
		setIsLoading(false);
	};

	name = name || "";
	imageSrc = imageSrc || "";

	return (
		<div
			style={{ margin }}
			classList={{
				plug: Boolean(isPlug || isLoading()),
				[styles.small]: size === "small",
				[styles.large]: size === "large",
				[styles.avatar]: true,
			}}>
			<Switch>
				<Match when={children}>{children}</Match>
				<Match when={imageSrc}>
					<Image onError={onImageLoaded} onLoad={onImageLoaded} name={name} src={imageSrc} />
				</Match>
				<Match when={!imageSrc}>
					<Name name={name} />
				</Match>
			</Switch>
		</div>
	);
}
