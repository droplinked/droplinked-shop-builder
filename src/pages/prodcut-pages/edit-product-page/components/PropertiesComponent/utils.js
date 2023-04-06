export const getOptionsArrayAfterChangeVariant = (
  optionArray,
  optionIndex,
  optionId,
  optionName
) => {
  return optionArray.map((opt) => {
    const optionValues =
      opt.values.length == 0 ? [{ index: 1, value: "" }] : opt.values;

    if (opt.index != optionIndex) return { ...opt };
    else
      return {
        optionId: optionId,
        optionName: optionName,
        values: optionValues,
        index: opt.index,
      };
  });
};

export const checkExistVariant = (OptionList, variantId) => {
  let result = false;
  OptionList.forEach((option) => {
    if (option.optionId == variantId) result = true;
  });
  return result;
};

export const getOptionsArrayAfterChangeOptionValue = (
  OptionList,
  optionIndex,
  valueIndex,
  newValue
) => {
  let optionArray = Array.from(OptionList);
  let findOption = optionArray.find((option) => option.index == optionIndex);
  let optionValues = findOption.values.map((value) => {
    if (value.index == valueIndex) {
      return { index: value.index, value: newValue };
    } else {
      return { ...value };
    }
  });
  findOption = { ...findOption, values: optionValues };
  optionArray = optionArray.map((option) => {
    if (option.index == optionIndex) return { ...findOption };
    else return { ...option };
  });
  return optionArray;
};

export const getOptionsArrayAfterAddValueToOption = (
  OptionList,
  optionIndex
) => {
  let optionArray = Array.from(OptionList);

  optionArray = optionArray.map((opt) => {
    if (opt.index == optionIndex) {
      const optionValues = opt.values;
      optionValues.push({
        index: opt.values[opt.values.length - 1]?.index + 1,
        value: "",
      });
      return {
        optionId: opt.optionId,
        optionName: opt.optionName,
        values: optionValues,
        index: opt.index,
      };
    } else return { ...opt };
  });
  return optionArray;
};

export const getOptionsArrayAfterRemoveValueFromOption = (
  optionIndex,
  OptionList,
  optionValueIndex
) => {
  let optionArray = Array.from(OptionList);

  optionArray = optionArray.map((opt) => {
    if (opt.index === optionIndex) {
      const optionValues = opt.values;
      const filteredList = optionValues.filter(
        (optionValue) => optionValue.index !== optionValueIndex
      );
      return { ...opt, values: filteredList };
    } else return true;
  });
  return optionArray;
};
