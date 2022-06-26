import { CgSpinner } from "solid-icons/cg";
import { JSXElement } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

import styles from "./Form.module.css";

type BaseInputProps = {
	onInput?: (text: string) => void;
	label?: string;
	placeholder?: string;
	value?: string;
	required?: boolean;
	name?: string;
};

type TextInputProps = BaseInputProps & {
	type?: "text" | "password" | "number" | "datetime-local";
};

export function TextInput(props: TextInputProps) {
	props.type || (props.type = "text");

	return (
		<label className={styles.textInputWrapper}>
			<span className={styles.textInputLabel}>{props.label}</span>
			<input
				name={props.name}
				required={props.required}
				placeholder={props.placeholder}
				value={props.value}
				type={props.type}
				className={styles.textInput}
			/>
		</label>
	);
}

type FileInputProps = BaseInputProps & {
	accept?: string;
};

export function FileInput(props: FileInputProps) {
	return (
		<label className={styles.textInputWrapper}>
			<span className={styles.textInputLabel}>{props.label}</span>
			<input
				accept={props.accept}
				name={props.name}
				required={props.required}
				placeholder={props.placeholder}
				value={props.value}
				type="file"
				className={styles.textInput}
			/>
		</label>
	);
}

type FormProps = {
	children: JSX.Element;
	onSubmit?: (
		event: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		}
	) => void;
};

export function Form(props: FormProps) {
	return (
		<form onSubmit={event => (event.preventDefault(), props.onSubmit?.(event))} className={styles.form}>
			{props.children}
		</form>
	);
}

type ButtonProps = {
	type?: "danger" | "default";
	children: string | JSX.Element;
	fullWidth?: boolean;
	margin?: string;
	isLoading?: boolean;
	width?: string;
	onClick?: () => void;
	nativeType?: "button" | "submit";
};

export function Button(props: ButtonProps) {
	const classes = [styles.button];

	props.type === "danger" && classes.push(styles.buttonDanger);
	props.fullWidth && classes.push(styles.buttonFullwidth);

	return (
		<button
			type={props.nativeType || "button"}
			onClick={() => props.onClick?.()}
			disabled={props.isLoading}
			style={{ margin: props.margin, width: props.width }}
			className={classes.join(" ")}>
			{props.isLoading ? <CgSpinner size={22} className="rotate" /> : props.children}
		</button>
	);
}

type ButtonGroupProps = {
	children: JSXElement;
};

export function ButtonGroup({ children }: ButtonGroupProps) {
	return <div className={styles.buttonGroup}>{children}</div>;
}
