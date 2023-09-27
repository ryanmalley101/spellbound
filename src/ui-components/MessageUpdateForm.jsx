/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
    Badge,
    Button,
    Divider,
    Flex,
    Grid,
    Icon,
    ScrollView,
    Text,
    TextAreaField,
    TextField,
    useTheme,
} from "@aws-amplify/ui-react";
import {getOverrideProps} from "@aws-amplify/ui-react/internal";
import {fetchByPath, validateField} from "./utils";
import {API} from "aws-amplify";
import {getMessage} from "../graphql/queries";
import {updateMessage} from "../graphql/mutations";

function ArrayField({
                        items = [],
                        onChange,
                        label,
                        inputFieldRef,
                        children,
                        hasError,
                        setFieldValue,
                        currentFieldValue,
                        defaultFieldValue,
                        lengthLimit,
                        getBadgeText,
                        runValidationTasks,
                        errorMessage,
                    }) {
    const labelElement = <Text>{label}</Text>;
    const {
        tokens: {
            components: {
                fieldmessages: {error: errorStyles},
            },
        },
    } = useTheme();
    const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
    const [isEditing, setIsEditing] = React.useState();
    React.useEffect(() => {
        if (isEditing) {
            inputFieldRef?.current?.focus();
        }
    }, [isEditing]);
    const removeItem = async (removeIndex) => {
        const newItems = items.filter((value, index) => index !== removeIndex);
        await onChange(newItems);
        setSelectedBadgeIndex(undefined);
    };
    const addItem = async () => {
        const {hasError} = runValidationTasks();
        if (
            currentFieldValue !== undefined &&
            currentFieldValue !== null &&
            currentFieldValue !== "" &&
            !hasError
        ) {
            const newItems = [...items];
            if (selectedBadgeIndex !== undefined) {
                newItems[selectedBadgeIndex] = currentFieldValue;
                setSelectedBadgeIndex(undefined);
            } else {
                newItems.push(currentFieldValue);
            }
            await onChange(newItems);
            setIsEditing(false);
        }
    };
    const arraySection = (
        <React.Fragment>
            {!!items?.length && (
                <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
                    {items.map((value, index) => {
                        return (
                            <Badge
                                key={index}
                                style={{
                                    cursor: "pointer",
                                    alignItems: "center",
                                    marginRight: 3,
                                    marginTop: 3,
                                    backgroundColor:
                                        index === selectedBadgeIndex ? "#B8CEF9" : "",
                                }}
                                onClick={() => {
                                    setSelectedBadgeIndex(index);
                                    setFieldValue(items[index]);
                                    setIsEditing(true);
                                }}
                            >
                                {getBadgeText ? getBadgeText(value) : value.toString()}
                                <Icon
                                    style={{
                                        cursor: "pointer",
                                        paddingLeft: 3,
                                        width: 20,
                                        height: 20,
                                    }}
                                    viewBox={{width: 20, height: 20}}
                                    paths={[
                                        {
                                            d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                                            stroke: "black",
                                        },
                                    ]}
                                    ariaLabel="button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        removeItem(index);
                                    }}
                                />
                            </Badge>
                        );
                    })}
                </ScrollView>
            )}
            <Divider orientation="horizontal" marginTop={5}/>
        </React.Fragment>
    );
    if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
        return (
            <React.Fragment>
                {labelElement}
                {arraySection}
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            {labelElement}
            {isEditing && children}
            {!isEditing ? (
                <>
                    <Button
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    >
                        Add item
                    </Button>
                    {errorMessage && hasError && (
                        <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
                            {errorMessage}
                        </Text>
                    )}
                </>
            ) : (
                <Flex justifyContent="flex-end">
                    {(currentFieldValue || isEditing) && (
                        <Button
                            children="Cancel"
                            type="button"
                            size="small"
                            onClick={() => {
                                setFieldValue(defaultFieldValue);
                                setIsEditing(false);
                                setSelectedBadgeIndex(undefined);
                            }}
                        ></Button>
                    )}
                    <Button size="small" variation="link" onClick={addItem}>
                        {selectedBadgeIndex !== undefined ? "Save" : "Add"}
                    </Button>
                </Flex>
            )}
            {arraySection}
        </React.Fragment>
    );
}

export default function MessageUpdateForm(props) {
    const {
        id: idProp,
        message: messageModelProp,
        onSuccess,
        onError,
        onSubmit,
        onValidate,
        onChange,
        overrides,
        ...rest
    } = props;
    const initialValues = {
        gameId: "",
        owner: "",
        messageType: "",
        advantage: "",
        damageDice: [],
        damageDiceResults: [],
        rolls: [],
        abilityName: "",
        saveAbility: "",
        saveScore: "",
        messageText: "",
        diceString: "",
        placeholder: "",
        createdAt: "",
    };
    const [gameId, setGameId] = React.useState(initialValues.gameId);
    const [owner, setOwner] = React.useState(initialValues.owner);
    const [messageType, setMessageType] = React.useState(
        initialValues.messageType
    );
    const [advantage, setAdvantage] = React.useState(initialValues.advantage);
    const [damageDice, setDamageDice] = React.useState(initialValues.damageDice);
    const [damageDiceResults, setDamageDiceResults] = React.useState(
        initialValues.damageDiceResults
    );
    const [rolls, setRolls] = React.useState(initialValues.rolls);
    const [abilityName, setAbilityName] = React.useState(
        initialValues.abilityName
    );
    const [saveAbility, setSaveAbility] = React.useState(
        initialValues.saveAbility
    );
    const [saveScore, setSaveScore] = React.useState(initialValues.saveScore);
    const [messageText, setMessageText] = React.useState(
        initialValues.messageText
    );
    const [diceString, setDiceString] = React.useState(initialValues.diceString);
    const [placeholder, setPlaceholder] = React.useState(
        initialValues.placeholder
    );
    const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
    const [errors, setErrors] = React.useState({});
    const resetStateValues = () => {
        const cleanValues = messageRecord
            ? {...initialValues, ...messageRecord}
            : initialValues;
        setGameId(cleanValues.gameId);
        setOwner(cleanValues.owner);
        setMessageType(cleanValues.messageType);
        setAdvantage(cleanValues.advantage);
        setDamageDice(cleanValues.damageDice ?? []);
        setCurrentDamageDiceValue("");
        setDamageDiceResults(cleanValues.damageDiceResults ?? []);
        setCurrentDamageDiceResultsValue("");
        setRolls(cleanValues.rolls ?? []);
        setCurrentRollsValue("");
        setAbilityName(cleanValues.abilityName);
        setSaveAbility(cleanValues.saveAbility);
        setSaveScore(cleanValues.saveScore);
        setMessageText(cleanValues.messageText);
        setDiceString(cleanValues.diceString);
        setPlaceholder(cleanValues.placeholder);
        setCreatedAt(cleanValues.createdAt);
        setErrors({});
    };
    const [messageRecord, setMessageRecord] = React.useState(messageModelProp);
    React.useEffect(() => {
        const queryData = async () => {
            const record = idProp
                ? (
                    await API.graphql({
                        query: getMessage,
                        variables: {...idProp},
                    })
                )?.data?.getMessage
                : messageModelProp;
            setMessageRecord(record);
        };
        queryData();
    }, [idProp, messageModelProp]);
    React.useEffect(resetStateValues, [messageRecord]);
    const [currentDamageDiceValue, setCurrentDamageDiceValue] =
        React.useState("");
    const damageDiceRef = React.createRef();
    const [currentDamageDiceResultsValue, setCurrentDamageDiceResultsValue] =
        React.useState("");
    const damageDiceResultsRef = React.createRef();
    const [currentRollsValue, setCurrentRollsValue] = React.useState("");
    const rollsRef = React.createRef();
    const validations = {
        gameId: [{type: "Required"}],
        owner: [{type: "Required"}],
        messageType: [],
        advantage: [],
        damageDice: [{type: "JSON"}],
        damageDiceResults: [{type: "JSON"}],
        rolls: [{type: "JSON"}],
        abilityName: [],
        saveAbility: [],
        saveScore: [],
        messageText: [],
        diceString: [],
        placeholder: [],
        createdAt: [{type: "Required"}],
    };
    const runValidationTasks = async (
        fieldName,
        currentValue,
        getDisplayValue
    ) => {
        const value =
            currentValue && getDisplayValue
                ? getDisplayValue(currentValue)
                : currentValue;
        let validationResponse = validateField(value, validations[fieldName]);
        const customValidator = fetchByPath(onValidate, fieldName);
        if (customValidator) {
            validationResponse = await customValidator(value, validationResponse);
        }
        setErrors((errors) => ({...errors, [fieldName]: validationResponse}));
        return validationResponse;
    };
    const convertToLocal = (date) => {
        const df = new Intl.DateTimeFormat("default", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            calendar: "iso8601",
            numberingSystem: "latn",
            hourCycle: "h23",
        });
        const parts = df.formatToParts(date).reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});
        return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
    };
    return (
        <Grid
            as="form"
            rowGap="15px"
            columnGap="15px"
            padding="20px"
            onSubmit={async (event) => {
                event.preventDefault();
                let modelFields = {
                    gameId,
                    owner,
                    messageType: messageType ?? null,
                    advantage: advantage ?? null,
                    damageDice: damageDice ?? null,
                    damageDiceResults: damageDiceResults ?? null,
                    rolls: rolls ?? null,
                    abilityName: abilityName ?? null,
                    saveAbility: saveAbility ?? null,
                    saveScore: saveScore ?? null,
                    messageText: messageText ?? null,
                    diceString: diceString ?? null,
                    placeholder: placeholder ?? null,
                    createdAt,
                };
                const validationResponses = await Promise.all(
                    Object.keys(validations).reduce((promises, fieldName) => {
                        if (Array.isArray(modelFields[fieldName])) {
                            promises.push(
                                ...modelFields[fieldName].map((item) =>
                                    runValidationTasks(fieldName, item)
                                )
                            );
                            return promises;
                        }
                        promises.push(
                            runValidationTasks(fieldName, modelFields[fieldName])
                        );
                        return promises;
                    }, [])
                );
                if (validationResponses.some((r) => r.hasError)) {
                    return;
                }
                if (onSubmit) {
                    modelFields = onSubmit(modelFields);
                }
                try {
                    Object.entries(modelFields).forEach(([key, value]) => {
                        if (typeof value === "string" && value === "") {
                            modelFields[key] = null;
                        }
                    });
                    await API.graphql({
                        query: updateMessage,
                        variables: {
                            input: {
                                id: messageRecord.id,
                                createdAt: messageRecord.createdAt,
                                ...modelFields,
                            },
                        },
                    });
                    if (onSuccess) {
                        onSuccess(modelFields);
                    }
                } catch (err) {
                    if (onError) {
                        const messages = err.errors.map((e) => e.message).join("\n");
                        onError(modelFields, messages);
                    }
                }
            }}
            {...getOverrideProps(overrides, "MessageUpdateForm")}
            {...rest}
        >
            <TextField
                label="Game id"
                isRequired={true}
                isReadOnly={false}
                value={gameId}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId: value,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.gameId ?? value;
                    }
                    if (errors.gameId?.hasError) {
                        runValidationTasks("gameId", value);
                    }
                    setGameId(value);
                }}
                onBlur={() => runValidationTasks("gameId", gameId)}
                errorMessage={errors.gameId?.errorMessage}
                hasError={errors.gameId?.hasError}
                {...getOverrideProps(overrides, "gameId")}
            ></TextField>
            <TextField
                label="Owner"
                isRequired={true}
                isReadOnly={false}
                value={owner}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner: value,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.owner ?? value;
                    }
                    if (errors.owner?.hasError) {
                        runValidationTasks("owner", value);
                    }
                    setOwner(value);
                }}
                onBlur={() => runValidationTasks("owner", owner)}
                errorMessage={errors.owner?.errorMessage}
                hasError={errors.owner?.hasError}
                {...getOverrideProps(overrides, "owner")}
            ></TextField>
            <TextField
                label="Message type"
                isRequired={false}
                isReadOnly={false}
                value={messageType}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType: value,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.messageType ?? value;
                    }
                    if (errors.messageType?.hasError) {
                        runValidationTasks("messageType", value);
                    }
                    setMessageType(value);
                }}
                onBlur={() => runValidationTasks("messageType", messageType)}
                errorMessage={errors.messageType?.errorMessage}
                hasError={errors.messageType?.hasError}
                {...getOverrideProps(overrides, "messageType")}
            ></TextField>
            <TextField
                label="Advantage"
                isRequired={false}
                isReadOnly={false}
                value={advantage}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage: value,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.advantage ?? value;
                    }
                    if (errors.advantage?.hasError) {
                        runValidationTasks("advantage", value);
                    }
                    setAdvantage(value);
                }}
                onBlur={() => runValidationTasks("advantage", advantage)}
                errorMessage={errors.advantage?.errorMessage}
                hasError={errors.advantage?.hasError}
                {...getOverrideProps(overrides, "advantage")}
            ></TextField>
            <ArrayField
                onChange={async (items) => {
                    let values = items;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice: values,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        values = result?.damageDice ?? values;
                    }
                    setDamageDice(values);
                    setCurrentDamageDiceValue("");
                }}
                currentFieldValue={currentDamageDiceValue}
                label={"Damage dice"}
                items={damageDice}
                hasError={errors?.damageDice?.hasError}
                runValidationTasks={async () =>
                    await runValidationTasks("damageDice", currentDamageDiceValue)
                }
                errorMessage={errors?.damageDice?.errorMessage}
                setFieldValue={setCurrentDamageDiceValue}
                inputFieldRef={damageDiceRef}
                defaultFieldValue={""}
            >
                <TextAreaField
                    label="Damage dice"
                    isRequired={false}
                    isReadOnly={false}
                    value={currentDamageDiceValue}
                    onChange={(e) => {
                        let {value} = e.target;
                        if (errors.damageDice?.hasError) {
                            runValidationTasks("damageDice", value);
                        }
                        setCurrentDamageDiceValue(value);
                    }}
                    onBlur={() =>
                        runValidationTasks("damageDice", currentDamageDiceValue)
                    }
                    errorMessage={errors.damageDice?.errorMessage}
                    hasError={errors.damageDice?.hasError}
                    ref={damageDiceRef}
                    labelHidden={true}
                    {...getOverrideProps(overrides, "damageDice")}
                ></TextAreaField>
            </ArrayField>
            <ArrayField
                onChange={async (items) => {
                    let values = items;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults: values,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        values = result?.damageDiceResults ?? values;
                    }
                    setDamageDiceResults(values);
                    setCurrentDamageDiceResultsValue("");
                }}
                currentFieldValue={currentDamageDiceResultsValue}
                label={"Damage dice results"}
                items={damageDiceResults}
                hasError={errors?.damageDiceResults?.hasError}
                runValidationTasks={async () =>
                    await runValidationTasks(
                        "damageDiceResults",
                        currentDamageDiceResultsValue
                    )
                }
                errorMessage={errors?.damageDiceResults?.errorMessage}
                setFieldValue={setCurrentDamageDiceResultsValue}
                inputFieldRef={damageDiceResultsRef}
                defaultFieldValue={""}
            >
                <TextAreaField
                    label="Damage dice results"
                    isRequired={false}
                    isReadOnly={false}
                    value={currentDamageDiceResultsValue}
                    onChange={(e) => {
                        let {value} = e.target;
                        if (errors.damageDiceResults?.hasError) {
                            runValidationTasks("damageDiceResults", value);
                        }
                        setCurrentDamageDiceResultsValue(value);
                    }}
                    onBlur={() =>
                        runValidationTasks(
                            "damageDiceResults",
                            currentDamageDiceResultsValue
                        )
                    }
                    errorMessage={errors.damageDiceResults?.errorMessage}
                    hasError={errors.damageDiceResults?.hasError}
                    ref={damageDiceResultsRef}
                    labelHidden={true}
                    {...getOverrideProps(overrides, "damageDiceResults")}
                ></TextAreaField>
            </ArrayField>
            <ArrayField
                onChange={async (items) => {
                    let values = items;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls: values,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        values = result?.rolls ?? values;
                    }
                    setRolls(values);
                    setCurrentRollsValue("");
                }}
                currentFieldValue={currentRollsValue}
                label={"Rolls"}
                items={rolls}
                hasError={errors?.rolls?.hasError}
                runValidationTasks={async () =>
                    await runValidationTasks("rolls", currentRollsValue)
                }
                errorMessage={errors?.rolls?.errorMessage}
                setFieldValue={setCurrentRollsValue}
                inputFieldRef={rollsRef}
                defaultFieldValue={""}
            >
                <TextAreaField
                    label="Rolls"
                    isRequired={false}
                    isReadOnly={false}
                    value={currentRollsValue}
                    onChange={(e) => {
                        let {value} = e.target;
                        if (errors.rolls?.hasError) {
                            runValidationTasks("rolls", value);
                        }
                        setCurrentRollsValue(value);
                    }}
                    onBlur={() => runValidationTasks("rolls", currentRollsValue)}
                    errorMessage={errors.rolls?.errorMessage}
                    hasError={errors.rolls?.hasError}
                    ref={rollsRef}
                    labelHidden={true}
                    {...getOverrideProps(overrides, "rolls")}
                ></TextAreaField>
            </ArrayField>
            <TextField
                label="Ability name"
                isRequired={false}
                isReadOnly={false}
                value={abilityName}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName: value,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.abilityName ?? value;
                    }
                    if (errors.abilityName?.hasError) {
                        runValidationTasks("abilityName", value);
                    }
                    setAbilityName(value);
                }}
                onBlur={() => runValidationTasks("abilityName", abilityName)}
                errorMessage={errors.abilityName?.errorMessage}
                hasError={errors.abilityName?.hasError}
                {...getOverrideProps(overrides, "abilityName")}
            ></TextField>
            <TextField
                label="Save ability"
                isRequired={false}
                isReadOnly={false}
                value={saveAbility}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility: value,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.saveAbility ?? value;
                    }
                    if (errors.saveAbility?.hasError) {
                        runValidationTasks("saveAbility", value);
                    }
                    setSaveAbility(value);
                }}
                onBlur={() => runValidationTasks("saveAbility", saveAbility)}
                errorMessage={errors.saveAbility?.errorMessage}
                hasError={errors.saveAbility?.hasError}
                {...getOverrideProps(overrides, "saveAbility")}
            ></TextField>
            <TextField
                label="Save score"
                isRequired={false}
                isReadOnly={false}
                type="number"
                step="any"
                value={saveScore}
                onChange={(e) => {
                    let value = isNaN(parseInt(e.target.value))
                        ? e.target.value
                        : parseInt(e.target.value);
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore: value,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.saveScore ?? value;
                    }
                    if (errors.saveScore?.hasError) {
                        runValidationTasks("saveScore", value);
                    }
                    setSaveScore(value);
                }}
                onBlur={() => runValidationTasks("saveScore", saveScore)}
                errorMessage={errors.saveScore?.errorMessage}
                hasError={errors.saveScore?.hasError}
                {...getOverrideProps(overrides, "saveScore")}
            ></TextField>
            <TextField
                label="Message text"
                isRequired={false}
                isReadOnly={false}
                value={messageText}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText: value,
                            diceString,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.messageText ?? value;
                    }
                    if (errors.messageText?.hasError) {
                        runValidationTasks("messageText", value);
                    }
                    setMessageText(value);
                }}
                onBlur={() => runValidationTasks("messageText", messageText)}
                errorMessage={errors.messageText?.errorMessage}
                hasError={errors.messageText?.hasError}
                {...getOverrideProps(overrides, "messageText")}
            ></TextField>
            <TextField
                label="Dice string"
                isRequired={false}
                isReadOnly={false}
                value={diceString}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString: value,
                            placeholder,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.diceString ?? value;
                    }
                    if (errors.diceString?.hasError) {
                        runValidationTasks("diceString", value);
                    }
                    setDiceString(value);
                }}
                onBlur={() => runValidationTasks("diceString", diceString)}
                errorMessage={errors.diceString?.errorMessage}
                hasError={errors.diceString?.hasError}
                {...getOverrideProps(overrides, "diceString")}
            ></TextField>
            <TextField
                label="Placeholder"
                isRequired={false}
                isReadOnly={false}
                value={placeholder}
                onChange={(e) => {
                    let {value} = e.target;
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder: value,
                            createdAt,
                        };
                        const result = onChange(modelFields);
                        value = result?.placeholder ?? value;
                    }
                    if (errors.placeholder?.hasError) {
                        runValidationTasks("placeholder", value);
                    }
                    setPlaceholder(value);
                }}
                onBlur={() => runValidationTasks("placeholder", placeholder)}
                errorMessage={errors.placeholder?.errorMessage}
                hasError={errors.placeholder?.hasError}
                {...getOverrideProps(overrides, "placeholder")}
            ></TextField>
            <TextField
                label="Created at"
                isRequired={true}
                isReadOnly={true}
                type="datetime-local"
                value={createdAt && convertToLocal(new Date(createdAt))}
                onChange={(e) => {
                    let value =
                        e.target.value === "" ? "" : new Date(e.target.value).toISOString();
                    if (onChange) {
                        const modelFields = {
                            gameId,
                            owner,
                            messageType,
                            advantage,
                            damageDice,
                            damageDiceResults,
                            rolls,
                            abilityName,
                            saveAbility,
                            saveScore,
                            messageText,
                            diceString,
                            placeholder,
                            createdAt: value,
                        };
                        const result = onChange(modelFields);
                        value = result?.createdAt ?? value;
                    }
                    if (errors.createdAt?.hasError) {
                        runValidationTasks("createdAt", value);
                    }
                    setCreatedAt(value);
                }}
                onBlur={() => runValidationTasks("createdAt", createdAt)}
                errorMessage={errors.createdAt?.errorMessage}
                hasError={errors.createdAt?.hasError}
                {...getOverrideProps(overrides, "createdAt")}
            ></TextField>
            <Flex
                justifyContent="space-between"
                {...getOverrideProps(overrides, "CTAFlex")}
            >
                <Button
                    children="Reset"
                    type="reset"
                    onClick={(event) => {
                        event.preventDefault();
                        resetStateValues();
                    }}
                    isDisabled={!(idProp || messageModelProp)}
                    {...getOverrideProps(overrides, "ResetButton")}
                ></Button>
                <Flex
                    gap="15px"
                    {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
                >
                    <Button
                        children="Submit"
                        type="submit"
                        variation="primary"
                        isDisabled={
                            !(idProp || messageModelProp) ||
                            Object.values(errors).some((e) => e?.hasError)
                        }
                        {...getOverrideProps(overrides, "SubmitButton")}
                    ></Button>
                </Flex>
            </Flex>
        </Grid>
    );
}
