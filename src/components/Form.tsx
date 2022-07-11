import { CgSpinner } from "solid-icons/cg";
import { JSXElement } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

import styles from "./Form.module.css";

type BaseInputProps = {
	name?: string;
	label?: string;
	value?: string;
	onInput?: (text: string) => void;
	required?: boolean;
	placeholder?: string;
};

type TextInputProps = BaseInputProps & {
	type?: "text" | "password" | "number" | "datetime-local";
};

export function TextInput(props: TextInputProps) {
	props.type || (props.type = "text");

	return (
		<label class={styles.textInputWrapper}>
			<span class={styles.textInputLabel}>{props.label}</span>
			<input
				name={props.name}
				required={props.required}
				placeholder={props.placeholder}
				value={props.value || ""}
				type={props.type}
				class={styles.textInput}
			/>
		</label>
	);
}

type FileInputProps = BaseInputProps & {
	accept?: string;
};

export function FileInput(props: FileInputProps) {
	return (
		<label class={styles.textInputWrapper}>
			<span class={styles.textInputLabel}>{props.label}</span>
			<input
				accept={props.accept}
				name={props.name}
				required={props.required}
				placeholder={props.placeholder}
				type="file"
				class={styles.textInput}
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
		<form onSubmit={event => (event.preventDefault(), props.onSubmit?.(event))} class={styles.form}>
			{props.children}
		</form>
	);
}

type ButtonProps = {
	type?: "danger" | "default";
	width?: string;
	margin?: string;
	onClick?: () => void;
	children: string | JSX.Element;
	fullWidth?: boolean;
	isLoading?: boolean;
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
			class={classes.join(" ")}>
			{props.isLoading ? <CgSpinner size={22} class="rotate" /> : props.children}
		</button>
	);
}

type ButtonGroupProps = {
	children: JSXElement;
};

export function ButtonGroup({ children }: ButtonGroupProps) {
	return <div class={styles.buttonGroup}>{children}</div>;
}
