/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MessageUpdateFormInputValues = {
    gameId?: string;
    owner?: string;
    messageType?: string;
    advantage?: string;
    damageDice?: string[];
    damageDiceResults?: string[];
    rolls?: string[];
    abilityName?: string;
    saveAbility?: string;
    saveScore?: number;
    messageText?: string;
    diceString?: string;
    placeholder?: string;
    createdAt?: string;
};
export declare type MessageUpdateFormValidationValues = {
    gameId?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    messageType?: ValidationFunction<string>;
    advantage?: ValidationFunction<string>;
    damageDice?: ValidationFunction<string>;
    damageDiceResults?: ValidationFunction<string>;
    rolls?: ValidationFunction<string>;
    abilityName?: ValidationFunction<string>;
    saveAbility?: ValidationFunction<string>;
    saveScore?: ValidationFunction<number>;
    messageText?: ValidationFunction<string>;
    diceString?: ValidationFunction<string>;
    placeholder?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MessageUpdateFormOverridesProps = {
    MessageUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    gameId?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    messageType?: PrimitiveOverrideProps<TextFieldProps>;
    advantage?: PrimitiveOverrideProps<TextFieldProps>;
    damageDice?: PrimitiveOverrideProps<TextAreaFieldProps>;
    damageDiceResults?: PrimitiveOverrideProps<TextAreaFieldProps>;
    rolls?: PrimitiveOverrideProps<TextAreaFieldProps>;
    abilityName?: PrimitiveOverrideProps<TextFieldProps>;
    saveAbility?: PrimitiveOverrideProps<TextFieldProps>;
    saveScore?: PrimitiveOverrideProps<TextFieldProps>;
    messageText?: PrimitiveOverrideProps<TextFieldProps>;
    diceString?: PrimitiveOverrideProps<TextFieldProps>;
    placeholder?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MessageUpdateFormProps = React.PropsWithChildren<{
    overrides?: MessageUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        id: string;
        createdAt: string;
    };
    message?: any;
    onSubmit?: (fields: MessageUpdateFormInputValues) => MessageUpdateFormInputValues;
    onSuccess?: (fields: MessageUpdateFormInputValues) => void;
    onError?: (fields: MessageUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MessageUpdateFormInputValues) => MessageUpdateFormInputValues;
    onValidate?: MessageUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MessageUpdateForm(props: MessageUpdateFormProps): React.ReactElement;
