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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getMonsterStatblock } from "../graphql/queries";
import { updateMonsterStatblock } from "../graphql/mutations";
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
        fieldmessages: { error: errorStyles },
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
    const { hasError } = runValidationTasks();
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
                  viewBox={{ width: 20, height: 20 }}
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
      <Divider orientation="horizontal" marginTop={5} />
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
export default function MonsterStatblockUpdateForm(props) {
  const {
    id: idProp,
    monsterStatblock: monsterStatblockModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    ownerId: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    desc: "",
    size: "",
    type: "",
    subtype: "",
    group: "",
    alignment: "",
    armor_class: "",
    armor_desc: "",
    current_hit_points: "",
    hit_points: "",
    hit_dice_num: "",
    hit_dice: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    strength_save: "",
    dexterity_save: "",
    constitution_save: "",
    intelligence_save: "",
    wisdom_save: "",
    charisma_save: "",
    save_proficiencies: [],
    perception: "",
    damage_vulnerabilities: "",
    damage_vulnerability_list: [],
    damage_resistances: "",
    damage_resistance_list: [],
    damage_immunities: "",
    damage_immunity_list: [],
    condition_immunities: "",
    condition_immunity_list: [],
    blindsight: "",
    blindBeyond: false,
    darkvision: "",
    tremorsense: "",
    truesight: "",
    senses: "",
    languages: "",
    challenge_rating: "",
    cr: "",
    legendary_desc: "",
    mythic_desc: "",
  };
  const [ownerId, setOwnerId] = React.useState(initialValues.ownerId);
  const [name, setName] = React.useState(initialValues.name);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [desc, setDesc] = React.useState(initialValues.desc);
  const [size, setSize] = React.useState(initialValues.size);
  const [type, setType] = React.useState(initialValues.type);
  const [subtype, setSubtype] = React.useState(initialValues.subtype);
  const [group, setGroup] = React.useState(initialValues.group);
  const [alignment, setAlignment] = React.useState(initialValues.alignment);
  const [armor_class, setArmor_class] = React.useState(
    initialValues.armor_class
  );
  const [armor_desc, setArmor_desc] = React.useState(initialValues.armor_desc);
  const [current_hit_points, setCurrent_hit_points] = React.useState(
    initialValues.current_hit_points
  );
  const [hit_points, setHit_points] = React.useState(initialValues.hit_points);
  const [hit_dice_num, setHit_dice_num] = React.useState(
    initialValues.hit_dice_num
  );
  const [hit_dice, setHit_dice] = React.useState(initialValues.hit_dice);
  const [strength, setStrength] = React.useState(initialValues.strength);
  const [dexterity, setDexterity] = React.useState(initialValues.dexterity);
  const [constitution, setConstitution] = React.useState(
    initialValues.constitution
  );
  const [intelligence, setIntelligence] = React.useState(
    initialValues.intelligence
  );
  const [wisdom, setWisdom] = React.useState(initialValues.wisdom);
  const [charisma, setCharisma] = React.useState(initialValues.charisma);
  const [strength_save, setStrength_save] = React.useState(
    initialValues.strength_save
  );
  const [dexterity_save, setDexterity_save] = React.useState(
    initialValues.dexterity_save
  );
  const [constitution_save, setConstitution_save] = React.useState(
    initialValues.constitution_save
  );
  const [intelligence_save, setIntelligence_save] = React.useState(
    initialValues.intelligence_save
  );
  const [wisdom_save, setWisdom_save] = React.useState(
    initialValues.wisdom_save
  );
  const [charisma_save, setCharisma_save] = React.useState(
    initialValues.charisma_save
  );
  const [save_proficiencies, setSave_proficiencies] = React.useState(
    initialValues.save_proficiencies
  );
  const [perception, setPerception] = React.useState(initialValues.perception);
  const [damage_vulnerabilities, setDamage_vulnerabilities] = React.useState(
    initialValues.damage_vulnerabilities
  );
  const [damage_vulnerability_list, setDamage_vulnerability_list] =
    React.useState(initialValues.damage_vulnerability_list);
  const [damage_resistances, setDamage_resistances] = React.useState(
    initialValues.damage_resistances
  );
  const [damage_resistance_list, setDamage_resistance_list] = React.useState(
    initialValues.damage_resistance_list
  );
  const [damage_immunities, setDamage_immunities] = React.useState(
    initialValues.damage_immunities
  );
  const [damage_immunity_list, setDamage_immunity_list] = React.useState(
    initialValues.damage_immunity_list
  );
  const [condition_immunities, setCondition_immunities] = React.useState(
    initialValues.condition_immunities
  );
  const [condition_immunity_list, setCondition_immunity_list] = React.useState(
    initialValues.condition_immunity_list
  );
  const [blindsight, setBlindsight] = React.useState(initialValues.blindsight);
  const [blindBeyond, setBlindBeyond] = React.useState(
    initialValues.blindBeyond
  );
  const [darkvision, setDarkvision] = React.useState(initialValues.darkvision);
  const [tremorsense, setTremorsense] = React.useState(
    initialValues.tremorsense
  );
  const [truesight, setTruesight] = React.useState(initialValues.truesight);
  const [senses, setSenses] = React.useState(initialValues.senses);
  const [languages, setLanguages] = React.useState(initialValues.languages);
  const [challenge_rating, setChallenge_rating] = React.useState(
    initialValues.challenge_rating
  );
  const [cr, setCr] = React.useState(initialValues.cr);
  const [legendary_desc, setLegendary_desc] = React.useState(
    initialValues.legendary_desc
  );
  const [mythic_desc, setMythic_desc] = React.useState(
    initialValues.mythic_desc
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = monsterStatblockRecord
      ? { ...initialValues, ...monsterStatblockRecord }
      : initialValues;
    setOwnerId(cleanValues.ownerId);
    setName(cleanValues.name);
    setCreatedAt(cleanValues.createdAt);
    setUpdatedAt(cleanValues.updatedAt);
    setDesc(cleanValues.desc);
    setSize(cleanValues.size);
    setType(cleanValues.type);
    setSubtype(cleanValues.subtype);
    setGroup(cleanValues.group);
    setAlignment(cleanValues.alignment);
    setArmor_class(cleanValues.armor_class);
    setArmor_desc(cleanValues.armor_desc);
    setCurrent_hit_points(cleanValues.current_hit_points);
    setHit_points(cleanValues.hit_points);
    setHit_dice_num(cleanValues.hit_dice_num);
    setHit_dice(cleanValues.hit_dice);
    setStrength(cleanValues.strength);
    setDexterity(cleanValues.dexterity);
    setConstitution(cleanValues.constitution);
    setIntelligence(cleanValues.intelligence);
    setWisdom(cleanValues.wisdom);
    setCharisma(cleanValues.charisma);
    setStrength_save(cleanValues.strength_save);
    setDexterity_save(cleanValues.dexterity_save);
    setConstitution_save(cleanValues.constitution_save);
    setIntelligence_save(cleanValues.intelligence_save);
    setWisdom_save(cleanValues.wisdom_save);
    setCharisma_save(cleanValues.charisma_save);
    setSave_proficiencies(cleanValues.save_proficiencies ?? []);
    setCurrentSave_proficienciesValue("");
    setPerception(cleanValues.perception);
    setDamage_vulnerabilities(cleanValues.damage_vulnerabilities);
    setDamage_vulnerability_list(cleanValues.damage_vulnerability_list ?? []);
    setCurrentDamage_vulnerability_listValue("");
    setDamage_resistances(cleanValues.damage_resistances);
    setDamage_resistance_list(cleanValues.damage_resistance_list ?? []);
    setCurrentDamage_resistance_listValue("");
    setDamage_immunities(cleanValues.damage_immunities);
    setDamage_immunity_list(cleanValues.damage_immunity_list ?? []);
    setCurrentDamage_immunity_listValue("");
    setCondition_immunities(cleanValues.condition_immunities);
    setCondition_immunity_list(cleanValues.condition_immunity_list ?? []);
    setCurrentCondition_immunity_listValue("");
    setBlindsight(cleanValues.blindsight);
    setBlindBeyond(cleanValues.blindBeyond);
    setDarkvision(cleanValues.darkvision);
    setTremorsense(cleanValues.tremorsense);
    setTruesight(cleanValues.truesight);
    setSenses(cleanValues.senses);
    setLanguages(cleanValues.languages);
    setChallenge_rating(cleanValues.challenge_rating);
    setCr(cleanValues.cr);
    setLegendary_desc(cleanValues.legendary_desc);
    setMythic_desc(cleanValues.mythic_desc);
    setErrors({});
  };
  const [monsterStatblockRecord, setMonsterStatblockRecord] = React.useState(
    monsterStatblockModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMonsterStatblock,
              variables: { ...idProp },
            })
          )?.data?.getMonsterStatblock
        : monsterStatblockModelProp;
      setMonsterStatblockRecord(record);
    };
    queryData();
  }, [idProp, monsterStatblockModelProp]);
  React.useEffect(resetStateValues, [monsterStatblockRecord]);
  const [currentSave_proficienciesValue, setCurrentSave_proficienciesValue] =
    React.useState("");
  const save_proficienciesRef = React.createRef();
  const [
    currentDamage_vulnerability_listValue,
    setCurrentDamage_vulnerability_listValue,
  ] = React.useState("");
  const damage_vulnerability_listRef = React.createRef();
  const [
    currentDamage_resistance_listValue,
    setCurrentDamage_resistance_listValue,
  ] = React.useState("");
  const damage_resistance_listRef = React.createRef();
  const [
    currentDamage_immunity_listValue,
    setCurrentDamage_immunity_listValue,
  ] = React.useState("");
  const damage_immunity_listRef = React.createRef();
  const [
    currentCondition_immunity_listValue,
    setCurrentCondition_immunity_listValue,
  ] = React.useState("");
  const condition_immunity_listRef = React.createRef();
  const validations = {
    ownerId: [{ type: "Required" }],
    name: [{ type: "Required" }],
    createdAt: [],
    updatedAt: [],
    desc: [],
    size: [],
    type: [],
    subtype: [],
    group: [],
    alignment: [],
    armor_class: [],
    armor_desc: [],
    current_hit_points: [],
    hit_points: [],
    hit_dice_num: [],
    hit_dice: [],
    strength: [],
    dexterity: [],
    constitution: [],
    intelligence: [],
    wisdom: [],
    charisma: [],
    strength_save: [],
    dexterity_save: [],
    constitution_save: [],
    intelligence_save: [],
    wisdom_save: [],
    charisma_save: [],
    save_proficiencies: [],
    perception: [],
    damage_vulnerabilities: [],
    damage_vulnerability_list: [],
    damage_resistances: [],
    damage_resistance_list: [],
    damage_immunities: [],
    damage_immunity_list: [],
    condition_immunities: [],
    condition_immunity_list: [],
    blindsight: [],
    blindBeyond: [],
    darkvision: [],
    tremorsense: [],
    truesight: [],
    senses: [],
    languages: [],
    challenge_rating: [],
    cr: [],
    legendary_desc: [],
    mythic_desc: [],
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
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
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
          ownerId,
          name,
          createdAt: createdAt ?? null,
          updatedAt: updatedAt ?? null,
          desc: desc ?? null,
          size: size ?? null,
          type: type ?? null,
          subtype: subtype ?? null,
          group: group ?? null,
          alignment: alignment ?? null,
          armor_class: armor_class ?? null,
          armor_desc: armor_desc ?? null,
          current_hit_points: current_hit_points ?? null,
          hit_points: hit_points ?? null,
          hit_dice_num: hit_dice_num ?? null,
          hit_dice: hit_dice ?? null,
          strength: strength ?? null,
          dexterity: dexterity ?? null,
          constitution: constitution ?? null,
          intelligence: intelligence ?? null,
          wisdom: wisdom ?? null,
          charisma: charisma ?? null,
          strength_save: strength_save ?? null,
          dexterity_save: dexterity_save ?? null,
          constitution_save: constitution_save ?? null,
          intelligence_save: intelligence_save ?? null,
          wisdom_save: wisdom_save ?? null,
          charisma_save: charisma_save ?? null,
          save_proficiencies: save_proficiencies ?? null,
          perception: perception ?? null,
          damage_vulnerabilities: damage_vulnerabilities ?? null,
          damage_vulnerability_list: damage_vulnerability_list ?? null,
          damage_resistances: damage_resistances ?? null,
          damage_resistance_list: damage_resistance_list ?? null,
          damage_immunities: damage_immunities ?? null,
          damage_immunity_list: damage_immunity_list ?? null,
          condition_immunities: condition_immunities ?? null,
          condition_immunity_list: condition_immunity_list ?? null,
          blindsight: blindsight ?? null,
          blindBeyond: blindBeyond ?? null,
          darkvision: darkvision ?? null,
          tremorsense: tremorsense ?? null,
          truesight: truesight ?? null,
          senses: senses ?? null,
          languages: languages ?? null,
          challenge_rating: challenge_rating ?? null,
          cr: cr ?? null,
          legendary_desc: legendary_desc ?? null,
          mythic_desc: mythic_desc ?? null,
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
            query: updateMonsterStatblock,
            variables: {
              input: {
                id: monsterStatblockRecord.id,
                ownerId: monsterStatblockRecord.ownerId,
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
      {...getOverrideProps(overrides, "MonsterStatblockUpdateForm")}
      {...rest}
    >
      <TextField
        label="Owner id"
        isRequired={true}
        isReadOnly={true}
        value={ownerId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId: value,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.ownerId ?? value;
          }
          if (errors.ownerId?.hasError) {
            runValidationTasks("ownerId", value);
          }
          setOwnerId(value);
        }}
        onBlur={() => runValidationTasks("ownerId", ownerId)}
        errorMessage={errors.ownerId?.errorMessage}
        hasError={errors.ownerId?.hasError}
        {...getOverrideProps(overrides, "ownerId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name: value,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt: value,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
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
      <TextField
        label="Updated at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={updatedAt && convertToLocal(new Date(updatedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt: value,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <TextField
        label="Desc"
        isRequired={false}
        isReadOnly={false}
        value={desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc: value,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.desc ?? value;
          }
          if (errors.desc?.hasError) {
            runValidationTasks("desc", value);
          }
          setDesc(value);
        }}
        onBlur={() => runValidationTasks("desc", desc)}
        errorMessage={errors.desc?.errorMessage}
        hasError={errors.desc?.hasError}
        {...getOverrideProps(overrides, "desc")}
      ></TextField>
      <TextField
        label="Size"
        isRequired={false}
        isReadOnly={false}
        value={size}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size: value,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.size ?? value;
          }
          if (errors.size?.hasError) {
            runValidationTasks("size", value);
          }
          setSize(value);
        }}
        onBlur={() => runValidationTasks("size", size)}
        errorMessage={errors.size?.errorMessage}
        hasError={errors.size?.hasError}
        {...getOverrideProps(overrides, "size")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type: value,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Subtype"
        isRequired={false}
        isReadOnly={false}
        value={subtype}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype: value,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.subtype ?? value;
          }
          if (errors.subtype?.hasError) {
            runValidationTasks("subtype", value);
          }
          setSubtype(value);
        }}
        onBlur={() => runValidationTasks("subtype", subtype)}
        errorMessage={errors.subtype?.errorMessage}
        hasError={errors.subtype?.hasError}
        {...getOverrideProps(overrides, "subtype")}
      ></TextField>
      <TextField
        label="Group"
        isRequired={false}
        isReadOnly={false}
        value={group}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group: value,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.group ?? value;
          }
          if (errors.group?.hasError) {
            runValidationTasks("group", value);
          }
          setGroup(value);
        }}
        onBlur={() => runValidationTasks("group", group)}
        errorMessage={errors.group?.errorMessage}
        hasError={errors.group?.hasError}
        {...getOverrideProps(overrides, "group")}
      ></TextField>
      <TextField
        label="Alignment"
        isRequired={false}
        isReadOnly={false}
        value={alignment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment: value,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.alignment ?? value;
          }
          if (errors.alignment?.hasError) {
            runValidationTasks("alignment", value);
          }
          setAlignment(value);
        }}
        onBlur={() => runValidationTasks("alignment", alignment)}
        errorMessage={errors.alignment?.errorMessage}
        hasError={errors.alignment?.hasError}
        {...getOverrideProps(overrides, "alignment")}
      ></TextField>
      <TextField
        label="Armor class"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={armor_class}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class: value,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.armor_class ?? value;
          }
          if (errors.armor_class?.hasError) {
            runValidationTasks("armor_class", value);
          }
          setArmor_class(value);
        }}
        onBlur={() => runValidationTasks("armor_class", armor_class)}
        errorMessage={errors.armor_class?.errorMessage}
        hasError={errors.armor_class?.hasError}
        {...getOverrideProps(overrides, "armor_class")}
      ></TextField>
      <TextField
        label="Armor desc"
        isRequired={false}
        isReadOnly={false}
        value={armor_desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc: value,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.armor_desc ?? value;
          }
          if (errors.armor_desc?.hasError) {
            runValidationTasks("armor_desc", value);
          }
          setArmor_desc(value);
        }}
        onBlur={() => runValidationTasks("armor_desc", armor_desc)}
        errorMessage={errors.armor_desc?.errorMessage}
        hasError={errors.armor_desc?.hasError}
        {...getOverrideProps(overrides, "armor_desc")}
      ></TextField>
      <TextField
        label="Current hit points"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={current_hit_points}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points: value,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.current_hit_points ?? value;
          }
          if (errors.current_hit_points?.hasError) {
            runValidationTasks("current_hit_points", value);
          }
          setCurrent_hit_points(value);
        }}
        onBlur={() =>
          runValidationTasks("current_hit_points", current_hit_points)
        }
        errorMessage={errors.current_hit_points?.errorMessage}
        hasError={errors.current_hit_points?.hasError}
        {...getOverrideProps(overrides, "current_hit_points")}
      ></TextField>
      <TextField
        label="Hit points"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={hit_points}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points: value,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.hit_points ?? value;
          }
          if (errors.hit_points?.hasError) {
            runValidationTasks("hit_points", value);
          }
          setHit_points(value);
        }}
        onBlur={() => runValidationTasks("hit_points", hit_points)}
        errorMessage={errors.hit_points?.errorMessage}
        hasError={errors.hit_points?.hasError}
        {...getOverrideProps(overrides, "hit_points")}
      ></TextField>
      <TextField
        label="Hit dice num"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={hit_dice_num}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num: value,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.hit_dice_num ?? value;
          }
          if (errors.hit_dice_num?.hasError) {
            runValidationTasks("hit_dice_num", value);
          }
          setHit_dice_num(value);
        }}
        onBlur={() => runValidationTasks("hit_dice_num", hit_dice_num)}
        errorMessage={errors.hit_dice_num?.errorMessage}
        hasError={errors.hit_dice_num?.hasError}
        {...getOverrideProps(overrides, "hit_dice_num")}
      ></TextField>
      <TextField
        label="Hit dice"
        isRequired={false}
        isReadOnly={false}
        value={hit_dice}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice: value,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.hit_dice ?? value;
          }
          if (errors.hit_dice?.hasError) {
            runValidationTasks("hit_dice", value);
          }
          setHit_dice(value);
        }}
        onBlur={() => runValidationTasks("hit_dice", hit_dice)}
        errorMessage={errors.hit_dice?.errorMessage}
        hasError={errors.hit_dice?.hasError}
        {...getOverrideProps(overrides, "hit_dice")}
      ></TextField>
      <TextField
        label="Strength"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={strength}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength: value,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.strength ?? value;
          }
          if (errors.strength?.hasError) {
            runValidationTasks("strength", value);
          }
          setStrength(value);
        }}
        onBlur={() => runValidationTasks("strength", strength)}
        errorMessage={errors.strength?.errorMessage}
        hasError={errors.strength?.hasError}
        {...getOverrideProps(overrides, "strength")}
      ></TextField>
      <TextField
        label="Dexterity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={dexterity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity: value,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.dexterity ?? value;
          }
          if (errors.dexterity?.hasError) {
            runValidationTasks("dexterity", value);
          }
          setDexterity(value);
        }}
        onBlur={() => runValidationTasks("dexterity", dexterity)}
        errorMessage={errors.dexterity?.errorMessage}
        hasError={errors.dexterity?.hasError}
        {...getOverrideProps(overrides, "dexterity")}
      ></TextField>
      <TextField
        label="Constitution"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={constitution}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution: value,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.constitution ?? value;
          }
          if (errors.constitution?.hasError) {
            runValidationTasks("constitution", value);
          }
          setConstitution(value);
        }}
        onBlur={() => runValidationTasks("constitution", constitution)}
        errorMessage={errors.constitution?.errorMessage}
        hasError={errors.constitution?.hasError}
        {...getOverrideProps(overrides, "constitution")}
      ></TextField>
      <TextField
        label="Intelligence"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={intelligence}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence: value,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.intelligence ?? value;
          }
          if (errors.intelligence?.hasError) {
            runValidationTasks("intelligence", value);
          }
          setIntelligence(value);
        }}
        onBlur={() => runValidationTasks("intelligence", intelligence)}
        errorMessage={errors.intelligence?.errorMessage}
        hasError={errors.intelligence?.hasError}
        {...getOverrideProps(overrides, "intelligence")}
      ></TextField>
      <TextField
        label="Wisdom"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={wisdom}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom: value,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.wisdom ?? value;
          }
          if (errors.wisdom?.hasError) {
            runValidationTasks("wisdom", value);
          }
          setWisdom(value);
        }}
        onBlur={() => runValidationTasks("wisdom", wisdom)}
        errorMessage={errors.wisdom?.errorMessage}
        hasError={errors.wisdom?.hasError}
        {...getOverrideProps(overrides, "wisdom")}
      ></TextField>
      <TextField
        label="Charisma"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={charisma}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma: value,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.charisma ?? value;
          }
          if (errors.charisma?.hasError) {
            runValidationTasks("charisma", value);
          }
          setCharisma(value);
        }}
        onBlur={() => runValidationTasks("charisma", charisma)}
        errorMessage={errors.charisma?.errorMessage}
        hasError={errors.charisma?.hasError}
        {...getOverrideProps(overrides, "charisma")}
      ></TextField>
      <TextField
        label="Strength save"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={strength_save}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save: value,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.strength_save ?? value;
          }
          if (errors.strength_save?.hasError) {
            runValidationTasks("strength_save", value);
          }
          setStrength_save(value);
        }}
        onBlur={() => runValidationTasks("strength_save", strength_save)}
        errorMessage={errors.strength_save?.errorMessage}
        hasError={errors.strength_save?.hasError}
        {...getOverrideProps(overrides, "strength_save")}
      ></TextField>
      <TextField
        label="Dexterity save"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={dexterity_save}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save: value,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.dexterity_save ?? value;
          }
          if (errors.dexterity_save?.hasError) {
            runValidationTasks("dexterity_save", value);
          }
          setDexterity_save(value);
        }}
        onBlur={() => runValidationTasks("dexterity_save", dexterity_save)}
        errorMessage={errors.dexterity_save?.errorMessage}
        hasError={errors.dexterity_save?.hasError}
        {...getOverrideProps(overrides, "dexterity_save")}
      ></TextField>
      <TextField
        label="Constitution save"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={constitution_save}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save: value,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.constitution_save ?? value;
          }
          if (errors.constitution_save?.hasError) {
            runValidationTasks("constitution_save", value);
          }
          setConstitution_save(value);
        }}
        onBlur={() =>
          runValidationTasks("constitution_save", constitution_save)
        }
        errorMessage={errors.constitution_save?.errorMessage}
        hasError={errors.constitution_save?.hasError}
        {...getOverrideProps(overrides, "constitution_save")}
      ></TextField>
      <TextField
        label="Intelligence save"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={intelligence_save}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save: value,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.intelligence_save ?? value;
          }
          if (errors.intelligence_save?.hasError) {
            runValidationTasks("intelligence_save", value);
          }
          setIntelligence_save(value);
        }}
        onBlur={() =>
          runValidationTasks("intelligence_save", intelligence_save)
        }
        errorMessage={errors.intelligence_save?.errorMessage}
        hasError={errors.intelligence_save?.hasError}
        {...getOverrideProps(overrides, "intelligence_save")}
      ></TextField>
      <TextField
        label="Wisdom save"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={wisdom_save}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save: value,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.wisdom_save ?? value;
          }
          if (errors.wisdom_save?.hasError) {
            runValidationTasks("wisdom_save", value);
          }
          setWisdom_save(value);
        }}
        onBlur={() => runValidationTasks("wisdom_save", wisdom_save)}
        errorMessage={errors.wisdom_save?.errorMessage}
        hasError={errors.wisdom_save?.hasError}
        {...getOverrideProps(overrides, "wisdom_save")}
      ></TextField>
      <TextField
        label="Charisma save"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={charisma_save}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save: value,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.charisma_save ?? value;
          }
          if (errors.charisma_save?.hasError) {
            runValidationTasks("charisma_save", value);
          }
          setCharisma_save(value);
        }}
        onBlur={() => runValidationTasks("charisma_save", charisma_save)}
        errorMessage={errors.charisma_save?.errorMessage}
        hasError={errors.charisma_save?.hasError}
        {...getOverrideProps(overrides, "charisma_save")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies: values,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            values = result?.save_proficiencies ?? values;
          }
          setSave_proficiencies(values);
          setCurrentSave_proficienciesValue("");
        }}
        currentFieldValue={currentSave_proficienciesValue}
        label={"Save proficiencies"}
        items={save_proficiencies}
        hasError={errors?.save_proficiencies?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "save_proficiencies",
            currentSave_proficienciesValue
          )
        }
        errorMessage={errors?.save_proficiencies?.errorMessage}
        setFieldValue={setCurrentSave_proficienciesValue}
        inputFieldRef={save_proficienciesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Save proficiencies"
          isRequired={false}
          isReadOnly={false}
          value={currentSave_proficienciesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.save_proficiencies?.hasError) {
              runValidationTasks("save_proficiencies", value);
            }
            setCurrentSave_proficienciesValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "save_proficiencies",
              currentSave_proficienciesValue
            )
          }
          errorMessage={errors.save_proficiencies?.errorMessage}
          hasError={errors.save_proficiencies?.hasError}
          ref={save_proficienciesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "save_proficiencies")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Perception"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={perception}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception: value,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.perception ?? value;
          }
          if (errors.perception?.hasError) {
            runValidationTasks("perception", value);
          }
          setPerception(value);
        }}
        onBlur={() => runValidationTasks("perception", perception)}
        errorMessage={errors.perception?.errorMessage}
        hasError={errors.perception?.hasError}
        {...getOverrideProps(overrides, "perception")}
      ></TextField>
      <TextField
        label="Damage vulnerabilities"
        isRequired={false}
        isReadOnly={false}
        value={damage_vulnerabilities}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities: value,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.damage_vulnerabilities ?? value;
          }
          if (errors.damage_vulnerabilities?.hasError) {
            runValidationTasks("damage_vulnerabilities", value);
          }
          setDamage_vulnerabilities(value);
        }}
        onBlur={() =>
          runValidationTasks("damage_vulnerabilities", damage_vulnerabilities)
        }
        errorMessage={errors.damage_vulnerabilities?.errorMessage}
        hasError={errors.damage_vulnerabilities?.hasError}
        {...getOverrideProps(overrides, "damage_vulnerabilities")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list: values,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            values = result?.damage_vulnerability_list ?? values;
          }
          setDamage_vulnerability_list(values);
          setCurrentDamage_vulnerability_listValue("");
        }}
        currentFieldValue={currentDamage_vulnerability_listValue}
        label={"Damage vulnerability list"}
        items={damage_vulnerability_list}
        hasError={errors?.damage_vulnerability_list?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "damage_vulnerability_list",
            currentDamage_vulnerability_listValue
          )
        }
        errorMessage={errors?.damage_vulnerability_list?.errorMessage}
        setFieldValue={setCurrentDamage_vulnerability_listValue}
        inputFieldRef={damage_vulnerability_listRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Damage vulnerability list"
          isRequired={false}
          isReadOnly={false}
          value={currentDamage_vulnerability_listValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.damage_vulnerability_list?.hasError) {
              runValidationTasks("damage_vulnerability_list", value);
            }
            setCurrentDamage_vulnerability_listValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "damage_vulnerability_list",
              currentDamage_vulnerability_listValue
            )
          }
          errorMessage={errors.damage_vulnerability_list?.errorMessage}
          hasError={errors.damage_vulnerability_list?.hasError}
          ref={damage_vulnerability_listRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "damage_vulnerability_list")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Damage resistances"
        isRequired={false}
        isReadOnly={false}
        value={damage_resistances}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances: value,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.damage_resistances ?? value;
          }
          if (errors.damage_resistances?.hasError) {
            runValidationTasks("damage_resistances", value);
          }
          setDamage_resistances(value);
        }}
        onBlur={() =>
          runValidationTasks("damage_resistances", damage_resistances)
        }
        errorMessage={errors.damage_resistances?.errorMessage}
        hasError={errors.damage_resistances?.hasError}
        {...getOverrideProps(overrides, "damage_resistances")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list: values,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            values = result?.damage_resistance_list ?? values;
          }
          setDamage_resistance_list(values);
          setCurrentDamage_resistance_listValue("");
        }}
        currentFieldValue={currentDamage_resistance_listValue}
        label={"Damage resistance list"}
        items={damage_resistance_list}
        hasError={errors?.damage_resistance_list?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "damage_resistance_list",
            currentDamage_resistance_listValue
          )
        }
        errorMessage={errors?.damage_resistance_list?.errorMessage}
        setFieldValue={setCurrentDamage_resistance_listValue}
        inputFieldRef={damage_resistance_listRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Damage resistance list"
          isRequired={false}
          isReadOnly={false}
          value={currentDamage_resistance_listValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.damage_resistance_list?.hasError) {
              runValidationTasks("damage_resistance_list", value);
            }
            setCurrentDamage_resistance_listValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "damage_resistance_list",
              currentDamage_resistance_listValue
            )
          }
          errorMessage={errors.damage_resistance_list?.errorMessage}
          hasError={errors.damage_resistance_list?.hasError}
          ref={damage_resistance_listRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "damage_resistance_list")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Damage immunities"
        isRequired={false}
        isReadOnly={false}
        value={damage_immunities}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities: value,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.damage_immunities ?? value;
          }
          if (errors.damage_immunities?.hasError) {
            runValidationTasks("damage_immunities", value);
          }
          setDamage_immunities(value);
        }}
        onBlur={() =>
          runValidationTasks("damage_immunities", damage_immunities)
        }
        errorMessage={errors.damage_immunities?.errorMessage}
        hasError={errors.damage_immunities?.hasError}
        {...getOverrideProps(overrides, "damage_immunities")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list: values,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            values = result?.damage_immunity_list ?? values;
          }
          setDamage_immunity_list(values);
          setCurrentDamage_immunity_listValue("");
        }}
        currentFieldValue={currentDamage_immunity_listValue}
        label={"Damage immunity list"}
        items={damage_immunity_list}
        hasError={errors?.damage_immunity_list?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "damage_immunity_list",
            currentDamage_immunity_listValue
          )
        }
        errorMessage={errors?.damage_immunity_list?.errorMessage}
        setFieldValue={setCurrentDamage_immunity_listValue}
        inputFieldRef={damage_immunity_listRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Damage immunity list"
          isRequired={false}
          isReadOnly={false}
          value={currentDamage_immunity_listValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.damage_immunity_list?.hasError) {
              runValidationTasks("damage_immunity_list", value);
            }
            setCurrentDamage_immunity_listValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "damage_immunity_list",
              currentDamage_immunity_listValue
            )
          }
          errorMessage={errors.damage_immunity_list?.errorMessage}
          hasError={errors.damage_immunity_list?.hasError}
          ref={damage_immunity_listRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "damage_immunity_list")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Condition immunities"
        isRequired={false}
        isReadOnly={false}
        value={condition_immunities}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities: value,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.condition_immunities ?? value;
          }
          if (errors.condition_immunities?.hasError) {
            runValidationTasks("condition_immunities", value);
          }
          setCondition_immunities(value);
        }}
        onBlur={() =>
          runValidationTasks("condition_immunities", condition_immunities)
        }
        errorMessage={errors.condition_immunities?.errorMessage}
        hasError={errors.condition_immunities?.hasError}
        {...getOverrideProps(overrides, "condition_immunities")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list: values,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            values = result?.condition_immunity_list ?? values;
          }
          setCondition_immunity_list(values);
          setCurrentCondition_immunity_listValue("");
        }}
        currentFieldValue={currentCondition_immunity_listValue}
        label={"Condition immunity list"}
        items={condition_immunity_list}
        hasError={errors?.condition_immunity_list?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "condition_immunity_list",
            currentCondition_immunity_listValue
          )
        }
        errorMessage={errors?.condition_immunity_list?.errorMessage}
        setFieldValue={setCurrentCondition_immunity_listValue}
        inputFieldRef={condition_immunity_listRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Condition immunity list"
          isRequired={false}
          isReadOnly={false}
          value={currentCondition_immunity_listValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.condition_immunity_list?.hasError) {
              runValidationTasks("condition_immunity_list", value);
            }
            setCurrentCondition_immunity_listValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "condition_immunity_list",
              currentCondition_immunity_listValue
            )
          }
          errorMessage={errors.condition_immunity_list?.errorMessage}
          hasError={errors.condition_immunity_list?.hasError}
          ref={condition_immunity_listRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "condition_immunity_list")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Blindsight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={blindsight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight: value,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.blindsight ?? value;
          }
          if (errors.blindsight?.hasError) {
            runValidationTasks("blindsight", value);
          }
          setBlindsight(value);
        }}
        onBlur={() => runValidationTasks("blindsight", blindsight)}
        errorMessage={errors.blindsight?.errorMessage}
        hasError={errors.blindsight?.hasError}
        {...getOverrideProps(overrides, "blindsight")}
      ></TextField>
      <SwitchField
        label="Blind beyond"
        defaultChecked={false}
        isDisabled={false}
        isChecked={blindBeyond}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond: value,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.blindBeyond ?? value;
          }
          if (errors.blindBeyond?.hasError) {
            runValidationTasks("blindBeyond", value);
          }
          setBlindBeyond(value);
        }}
        onBlur={() => runValidationTasks("blindBeyond", blindBeyond)}
        errorMessage={errors.blindBeyond?.errorMessage}
        hasError={errors.blindBeyond?.hasError}
        {...getOverrideProps(overrides, "blindBeyond")}
      ></SwitchField>
      <TextField
        label="Darkvision"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={darkvision}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision: value,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.darkvision ?? value;
          }
          if (errors.darkvision?.hasError) {
            runValidationTasks("darkvision", value);
          }
          setDarkvision(value);
        }}
        onBlur={() => runValidationTasks("darkvision", darkvision)}
        errorMessage={errors.darkvision?.errorMessage}
        hasError={errors.darkvision?.hasError}
        {...getOverrideProps(overrides, "darkvision")}
      ></TextField>
      <TextField
        label="Tremorsense"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={tremorsense}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense: value,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.tremorsense ?? value;
          }
          if (errors.tremorsense?.hasError) {
            runValidationTasks("tremorsense", value);
          }
          setTremorsense(value);
        }}
        onBlur={() => runValidationTasks("tremorsense", tremorsense)}
        errorMessage={errors.tremorsense?.errorMessage}
        hasError={errors.tremorsense?.hasError}
        {...getOverrideProps(overrides, "tremorsense")}
      ></TextField>
      <TextField
        label="Truesight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={truesight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight: value,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.truesight ?? value;
          }
          if (errors.truesight?.hasError) {
            runValidationTasks("truesight", value);
          }
          setTruesight(value);
        }}
        onBlur={() => runValidationTasks("truesight", truesight)}
        errorMessage={errors.truesight?.errorMessage}
        hasError={errors.truesight?.hasError}
        {...getOverrideProps(overrides, "truesight")}
      ></TextField>
      <TextField
        label="Senses"
        isRequired={false}
        isReadOnly={false}
        value={senses}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses: value,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.senses ?? value;
          }
          if (errors.senses?.hasError) {
            runValidationTasks("senses", value);
          }
          setSenses(value);
        }}
        onBlur={() => runValidationTasks("senses", senses)}
        errorMessage={errors.senses?.errorMessage}
        hasError={errors.senses?.hasError}
        {...getOverrideProps(overrides, "senses")}
      ></TextField>
      <TextField
        label="Languages"
        isRequired={false}
        isReadOnly={false}
        value={languages}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages: value,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.languages ?? value;
          }
          if (errors.languages?.hasError) {
            runValidationTasks("languages", value);
          }
          setLanguages(value);
        }}
        onBlur={() => runValidationTasks("languages", languages)}
        errorMessage={errors.languages?.errorMessage}
        hasError={errors.languages?.hasError}
        {...getOverrideProps(overrides, "languages")}
      ></TextField>
      <TextField
        label="Challenge rating"
        isRequired={false}
        isReadOnly={false}
        value={challenge_rating}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating: value,
              cr,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.challenge_rating ?? value;
          }
          if (errors.challenge_rating?.hasError) {
            runValidationTasks("challenge_rating", value);
          }
          setChallenge_rating(value);
        }}
        onBlur={() => runValidationTasks("challenge_rating", challenge_rating)}
        errorMessage={errors.challenge_rating?.errorMessage}
        hasError={errors.challenge_rating?.hasError}
        {...getOverrideProps(overrides, "challenge_rating")}
      ></TextField>
      <TextField
        label="Cr"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={cr}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr: value,
              legendary_desc,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.cr ?? value;
          }
          if (errors.cr?.hasError) {
            runValidationTasks("cr", value);
          }
          setCr(value);
        }}
        onBlur={() => runValidationTasks("cr", cr)}
        errorMessage={errors.cr?.errorMessage}
        hasError={errors.cr?.hasError}
        {...getOverrideProps(overrides, "cr")}
      ></TextField>
      <TextField
        label="Legendary desc"
        isRequired={false}
        isReadOnly={false}
        value={legendary_desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc: value,
              mythic_desc,
            };
            const result = onChange(modelFields);
            value = result?.legendary_desc ?? value;
          }
          if (errors.legendary_desc?.hasError) {
            runValidationTasks("legendary_desc", value);
          }
          setLegendary_desc(value);
        }}
        onBlur={() => runValidationTasks("legendary_desc", legendary_desc)}
        errorMessage={errors.legendary_desc?.errorMessage}
        hasError={errors.legendary_desc?.hasError}
        {...getOverrideProps(overrides, "legendary_desc")}
      ></TextField>
      <TextField
        label="Mythic desc"
        isRequired={false}
        isReadOnly={false}
        value={mythic_desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerId,
              name,
              createdAt,
              updatedAt,
              desc,
              size,
              type,
              subtype,
              group,
              alignment,
              armor_class,
              armor_desc,
              current_hit_points,
              hit_points,
              hit_dice_num,
              hit_dice,
              strength,
              dexterity,
              constitution,
              intelligence,
              wisdom,
              charisma,
              strength_save,
              dexterity_save,
              constitution_save,
              intelligence_save,
              wisdom_save,
              charisma_save,
              save_proficiencies,
              perception,
              damage_vulnerabilities,
              damage_vulnerability_list,
              damage_resistances,
              damage_resistance_list,
              damage_immunities,
              damage_immunity_list,
              condition_immunities,
              condition_immunity_list,
              blindsight,
              blindBeyond,
              darkvision,
              tremorsense,
              truesight,
              senses,
              languages,
              challenge_rating,
              cr,
              legendary_desc,
              mythic_desc: value,
            };
            const result = onChange(modelFields);
            value = result?.mythic_desc ?? value;
          }
          if (errors.mythic_desc?.hasError) {
            runValidationTasks("mythic_desc", value);
          }
          setMythic_desc(value);
        }}
        onBlur={() => runValidationTasks("mythic_desc", mythic_desc)}
        errorMessage={errors.mythic_desc?.errorMessage}
        hasError={errors.mythic_desc?.hasError}
        {...getOverrideProps(overrides, "mythic_desc")}
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
          isDisabled={!(idProp || monsterStatblockModelProp)}
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
              !(idProp || monsterStatblockModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
