import BasicButton from "components/common/BasicButton/BasicButton";
import { FieldArray, Form, Formik, FormikProps, useField } from "formik";
import React, { useEffect, useRef, useState } from "react";

const propertyValues = {
    size: [
        { caption: "XS", value: "XS" },
        { caption: "S", value: "S" },
        { caption: "M", value: "M" },
        { caption: "L", value: "L" },
        { caption: "XL", value: "XL" },
        { caption: "2XL", value: "2XL" },
    ],
    color: [
        { caption: "Red", value: "#FF0000" },
        { caption: "Green", value: "#00FF00" },
        { caption: "Blue", value: "#0000FF" },
        { caption: "White", value: "#FFFFFF" },
        { caption: "Black", value: "#000000" },
    ],
};

const Properties = () => {
    const formikRef = useRef<FormikProps<any>>(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [combinations, setCombinations] = useState([]);
    const [skuDetails, setSkuDetails] = useState({});

    const DropdownField = ({ name }) => {
        const [field, , helpers] = useField(name);
        return (
            <select
                {...field}
                onChange={(e) => {
                    helpers.setValue(e.target.value);
                    if (!selectedTypes.includes(e.target.value)) {
                        setSelectedTypes([...selectedTypes, e.target.value]);
                    }
                }}
                defaultValue=""
            >
                <option value="" disabled>
                    Select Property
                </option>
                {["Color", "Size", "Custom Variant"].map((option) => (
                    //  disabled={selectedTypes.includes(option)}
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    };

    const renderVariantNameField = (type, handleChange, values, index) => {
        const isCustom = type === "Custom Variant";
        return (
            <input
                type="text"
                readOnly={!isCustom}
                value={values.properties[index].title || (isCustom ? "" : type)}
                onChange={(e) => handleChange(e)}
                name={`properties[${index}].title`}
                placeholder={isCustom ? "Enter title" : ""}
            />
        );
    };

    const renderValueOptions = (type, handleChange, values, index) => {
        if (type === "Custom Variant") {
            return (
                <>
                    <input
                        type="text"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleChange(e);
                                values.properties[index].selectedValues.push({ caption: e.currentTarget.value, value: e.currentTarget.value });
                                e.currentTarget.value = "";
                            }
                        }}
                        name={`properties[${index}].variantName`}
                        placeholder="Enter variant name"
                    />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {values.properties[index].selectedValues.map((item) => (
                            <div key={item.value} style={{ padding: "5px", border: "1px solid #ccc", cursor: "pointer" }}>
                                {item.caption}
                            </div>
                        ))}
                    </div>
                </>
            );
        } else {
            return (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {propertyValues[type.toLowerCase()].map((item) => (
                        <div
                            key={item?.value}
                            style={{ padding: "5px", border: "1px solid #ccc", cursor: "pointer" }}
                            onClick={() => {
                                values.properties[index].selectedValues.push({ caption: item.caption, value: item.value });
                                console.log(`Selected values for ${type}:`, values.properties[index].selectedValues);
                            }}
                        >
                            {item.caption}
                        </div>
                    ))}
                </div>
            );
        }
    };

    const renderPropertyForm = (index, remove, handleChange, values) => (
        <div key={index}>
            <DropdownField name={`properties[${index}].type`} />
            {values?.properties?.[index]?.type && (
                <div>
                    <div>
                        <label>Title:</label>
                        <span>{values?.properties?.[index]?.type}</span>
                    </div>
                    {renderVariantNameField(values.properties[index].type, handleChange, values, index)}
                    {(values.properties[index].selectedValues = values?.properties[index]?.selectedValues || [])}
                    {renderValueOptions(values?.properties[index]?.type, handleChange, values, index)}
                </div>
            )}
            <button
                type="button"
                onClick={() => {
                    remove(index);
                    setSelectedTypes(selectedTypes.filter((type) => type !== values.properties[index].type));
                }}
            >
                Remove
            </button>
        </div>
    );

    const generateCombinations = (variants) => {
        if (variants.length === 0) return [];
        const [firstVariant, ...rest] = variants;
        console.log(firstVariant)
        const restCombinations = generateCombinations(rest);
        return firstVariant.reduce((acc, item) => {
            if (restCombinations.length === 0) {
                acc.push([item]);
            } else {
                restCombinations.forEach(combination => {
                    acc.push([item, ...combination]);
                });
            }
            return acc;
        }, []);
    };


    useEffect(() => {
        const selectedVariants = formikRef?.current?.values?.properties?.map((property) => property?.selectedValues?.length && property?.selectedValues?.map((selectedValue) => selectedValue?.caption))?.filter(variant => variant?.length > 0);
        console.log(selectedVariants)
        const newCombinations = generateCombinations(selectedVariants);
        setCombinations(newCombinations);
        console.log(newCombinations)
        const newSkuDetails = {};
        newCombinations.forEach(comb => {
            const combKey = comb.join(' ');
            newSkuDetails[combKey] = skuDetails[combKey] || { price: '', externalId: '', quantity: '', packagingSize: '', weight: '', cover: '' };
        });
        setSkuDetails(newSkuDetails);
        console.log(newSkuDetails)
    }, [formikRef?.current?.values?.properties]); 

    return (
        <>
            <Formik
                innerRef={formikRef}
                initialValues={{ properties: [] }}
                onSubmit={async (values) => {
                    console.log(values);
                }}
            >
                {({ values, handleChange, setFieldValue }) => (
                    <Form>
                        <FieldArray name="properties">
                            {({ remove, push }) => (
                                <>
                                    <BasicButton onClick={() => push({ type: "", title: "", variantName: "", selectedValues: [] })} sizes="medium">
                                        Create Property
                                    </BasicButton>
                                    <div>{values?.properties?.map((property, index) => renderPropertyForm(index, remove, handleChange, values))}</div>
                                </>
                            )}
                        </FieldArray>
                        <FieldArray name="skus">
                            {({ remove, push }) => (
                                <div>
                                    <div></div>
                                </div>
                            )}
                        </FieldArray>
                        <button type="submit">submit</button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Properties;
