import { CgSpinner } from "solid-icons/cg";
import { JSXElement, Match, Switch } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

import styles from "./modules/Form.module.css";

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

export function TextInput({ label, type, name, value, required, placeholder }: TextInputProps) {
	type = type || "text";

	return (
		<label class={styles.textInputWrapper}>
			<span class={styles.textInputLabel}>{label}</span>
			<input
				type={type}
				name={name}
				value={value || ""}
				class={styles.textInput}
				required={required}
				placeholder={placeholder}
			/>
		</label>
	);
}

type FileInputProps = BaseInputProps & {
	accept?: string;
};

export function FileInput({ label, accept, name, required, placeholder }: FileInputProps) {
	return (
		<label class={styles.textInputWrapper}>
			<span class={styles.textInputLabel}>{label}</span>
			<input
				type="file"
				name={name}
				class={styles.textInput}
				accept={accept}
				required={required}
				placeholder={placeholder}
			/>
		</label>
	);
}

type submitEvent = Event & { submitter: HTMLElement } & {
	currentTarget: HTMLFormElement;
	target: Element;
};

type FormProps = {
	children: JSX.Element;
	onSubmit?: (event: submitEvent) => void;
};

export function Form({ onSubmit, children }: FormProps) {
	const handleSubmit = (event: submitEvent) => {
		event.preventDefault();
		onSubmit?.(event);
	};

	return (
		<form onSubmit={handleSubmit} class={styles.form}>
			{children}
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

export function Button({
	type,
	width,
	margin,
	onClick,
	children,
	fullWidth,
	isLoading,
	nativeType,
}: ButtonProps) {
	return (
		<button
			type={nativeType || "button"}
			onClick={() => onClick?.()}
			disabled={isLoading}
			style={{ margin, width }}
			classList={{
				[styles.button]: true,
				[styles.buttonDanger]: type === "danger",
				[styles.buttonFullWidth]: fullWidth,
			}}>
			<Switch>
				<Match when={!isLoading}>{children}</Match>
				<Match when={isLoading}>
					<CgSpinner size={22} class="rotate" />
				</Match>
			</Switch>
		</button>
	);
}

type ButtonGroupProps = {
	children: JSXElement;
};

export function ButtonGroup({ children }: ButtonGroupProps) {
	return <div class={styles.buttonGroup}>{children}</div>;
}
