import { createSignal } from "solid-js";

import styles from "./Avatar.module.css";

type AvatarProps = {
	imageSrc?: string;
	name?: string;
	size?: "small" | "default" | "large";
	isPlug?: boolean;
	margin?: string;
};

export function Avatar(props: AvatarProps) {
	const [error, setError] = createSignal(false);

	props.size = props.size || "default";

	const classNames = [styles.avatar];

	props.size === "default" && classNames.push(styles.sizeDefault);
	props.size === "small" && classNames.push(styles.sizeSmall);
	props.size === "large" && classNames.push(styles.sizeLarge);

	props.isPlug && classNames.push("plug");

	const Name = () => {
		const { name } = props;
		if (!name) return;

		const nameSegments = name.split(" ");
		const initials =
			nameSegments.length > 1
				? `${nameSegments[0].charAt(0)}${nameSegments[1].charAt(0)}`
				: nameSegments[0].charAt(0);

		return <div className={styles.initials}>{initials}</div>;
	};

	const Image = () => {
		const { imageSrc } = props;
		if (!imageSrc) return;

		return error() ? (
			<Name />
		) : (
			<img
				onError={() => setError(true)}
				className={styles.image}
				src={imageSrc}
				alt="user avatar"
			/>
		);
	};

	return (
		<div style={{ margin: props.margin }} className={classNames.join(" ")}>
			{props.isPlug || (props.imageSrc && !error()) ? <Image /> : <Name />}
		</div>
	);
}
