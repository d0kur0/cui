import styles from "./Avatar.module.css";

type AvatarProps = {
	imageSrc?: string;
	name?: string;
	size?: "small" | "default" | "large";
	isPlug?: boolean;
};

export function Avatar(props: AvatarProps) {
	props.size = props.size || "default";

	let className = styles.avatar;

	props.size === "default" && (className += ` ${styles.sizeDefault}`);
	props.size === "small" && (className += ` ${styles.sizeSmall}`);
	props.size === "large" && (className += ` ${styles.sizeLarge}`);

	props.isPlug && (className += ` ${styles.plug} plug`);

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

		return <img className={styles.image} src={imageSrc} alt="user avatar" />;
	};

	return (
		<div className={className}>{props.isPlug || props.name ? <Name /> : <Image />}</div>
	);
}
