import CheckBox from "../../../../components/shared/Checkbox/CheckBox-component";

// this component get variants and selected options and update selected options based on checked option
const OptionCheckboxes = ({
  variants,
  selectedOptions,
  setSelectedOptions,
  disable,
}) => {

  // change selected options with change checkbox for options type
  const onChnageCheckBox = (e) => {
    let newOptions = [];
    if (e.target.checked) {
      newOptions = selectedOptions.map((opt) => opt);
      newOptions.push({ variantName: e.target.value, variantID: e.target.id });
    } else {
      newOptions = selectedOptions.filter((opt) => opt.variantID != e.target.id);
    }
    setSelectedOptions(newOptions);
  };

  return (
    <div className="select-variant-wrap mt-4">
      <p>Choose options: </p>
      {variants.map((item) => {
        return (
          <CheckBox
            key={item._id}
            id={item._id}
            change={onChnageCheckBox}
            disabled={disable}
          >
            {item.name}
          </CheckBox>
        );
      })}
    </div>
  );
};

export default OptionCheckboxes;
