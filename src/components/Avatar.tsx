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
	const nameSegments = name.split(" ");
	const initials =
		nameSegments.length > 1
			? `${nameSegments[0].charAt(0)}${nameSegments[1].charAt(0)}`
			: name.substring(0, 2);

	return <div className={styles.initials}>{initials}</div>;
}

type ImageProps = {
	name: string;
	onLoad: () => void;
	onError: () => void;
	imageSrc: string;
};

function Image({ imageSrc, name, onLoad, onError }: ImageProps) {
	const [error, setError] = createSignal(false);

	return (
		<Switch>
			<Match when={error()}>
				<Name name={name} />
			</Match>
			<Match when={!error()}>
				<img
					src={imageSrc}
					alt="user avatar image"
					onLoad={onLoad}
					onError={() => (setError(true), onError())}
					className={styles.image}
				/>
			</Match>
		</Switch>
	);
}

export function Avatar(props: AvatarProps) {
	const [isLoading, setIsLoading] = createSignal(props.imageSrc || false);

	props.size = props.size || "default";

	const initialClassNames = [styles.avatar];

	props.size === "small" && initialClassNames.push(styles.sizeSmall);
	props.size === "large" && initialClassNames.push(styles.sizeLarge);
	props.size === "default" && initialClassNames.push(styles.sizeDefault);

	(props.isPlug || isLoading()) && initialClassNames.push("plug");

	const [classNames, setClassNames] = createSignal(initialClassNames);

	const name = props.name || "";
	const imageSrc = props.imageSrc || "";

	const onImageLoaded = () => {
		setIsLoading(false);
		setClassNames(c => c.filter(c => c !== "plug"));
	};

	return (
		<div style={{ margin: props.margin }} className={classNames().join(" ")}>
			<Switch>
				<Match when={props.children}>{props.children}</Match>
				<Match when={props.imageSrc}>
					<Image onError={onImageLoaded} onLoad={onImageLoaded} name={name} imageSrc={imageSrc} />
				</Match>
				<Match when={!props.imageSrc}>
					<Name name={name} />
				</Match>
			</Switch>
		</div>
	);
}
