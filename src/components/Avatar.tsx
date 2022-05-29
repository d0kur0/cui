import { JSXElement, createSignal } from "solid-js";

import styles from "./Avatar.module.css";

type AvatarProps = {
	imageSrc?: string;
	name?: string;
	size?: "small" | "default" | "large";
	isPlug?: boolean;
	margin?: string;
	children?: JSXElement;
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
	imageSrc: string;
	name: string;
	onLoad: () => void;
	onError: () => void;
};

function Image({ imageSrc, name, onLoad, onError }: ImageProps) {
	const [error, setError] = createSignal(false);

	return error() ? (
		<Name name={name} />
	) : (
		<img
			src={imageSrc}
			alt="user avatar image"
			onLoad={onLoad}
			onError={() => (setError(true), onError())}
			className={styles.image}
		/>
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
			{props.children ? (
				props.children
			) : props.imageSrc ? (
				<Image onError={onImageLoaded} onLoad={onImageLoaded} name={name} imageSrc={imageSrc} />
			) : (
				<Name name={name} />
			)}
		</div>
	);
}
