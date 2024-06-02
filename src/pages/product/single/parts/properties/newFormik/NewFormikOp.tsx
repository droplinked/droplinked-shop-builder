import React, { useEffect, useMemo, useRef } from "react";
import { FieldArray, Form, Formik, FormikProps, useFormikContext } from "formik";

let temp = [];

const defaultValues = {
    options: [
        {
            name: "",
            values: [{ value: "" }],
        },
    ],
    variants: [],
};

export const App = () => {
    const formikRef = useRef<FormikProps<any>>(null);
    const cartesianIdx2 = (a) => {
        if (!a || a.length === 0) return a;
        const a1 = a.splice(0, 1)[0];
        a = cartesianIdx2(a);
        const o = [];
        for (let i = 0, l = a1.length; i < l; i++) {
            if (a && a.length) {
                for (let j = 0, m = a.length; j < m; j++) {
                    o.push([i].concat(a[j]));
                }
            } else {
                o.push([i]);
            }
        }
        return o;
    };

    const variantsIdxs = useMemo(() => {
        const formattedOptions = formikRef?.current?.values?.options?.map((option) => option?.values?.filter((value) => !!value?.value).map((value) => value.value));
        return cartesianIdx2(formattedOptions?.filter((opt) => !!opt.length));
    }, [formikRef?.current]);

    const isArrayEquals = (arr1, arr2) => {
        return arr1.filter((i, n) => arr2[n] === i).length === arr1.length && arr2.filter((i, n) => arr1[n] === i).length === arr2.length;
    };

    const findExistingVariant = (variant, tempVariants) => {
        return tempVariants.find((v) => {
            if (v.key.length < variant.length) {
                return v.key.every((k, i) => {
                    const res = variant.includes(k);
                    const idx = variant.findIndex((v) => v === k);
                    if (res && idx === i) return true;
                    return false;
                });
            }
            if (v.key.length === variant.length) {
                return isArrayEquals(v.key, variant);
            }
        });
    };

    const getVariantsName = (variantIdxs) => {
        const nameArray = [];
        variantIdxs.forEach((variantIdx, idx) => {
            nameArray.push(formikRef?.current?.values?.options[idx].values[variantIdx].value);
        });
        return nameArray.join(" / ");
    };

    useEffect(() => {
        const variantsValue = [];
        temp = formikRef?.current?.values?.variants;
        if (variantsIdxs?.length <= formikRef?.current?.values?.variants.length) {
            variantsIdxs?.forEach((i, j) => {
                if (temp[j]) temp[j].key = i;
            });
        }

        variantsIdxs?.forEach((variantIdxs) => {
            if (!variantIdxs.length) return;
            const existingVariant = findExistingVariant(variantIdxs, temp);
            variantsValue?.push({
                key: variantIdxs,
                variant: getVariantsName(variantIdxs),
                price: existingVariant?.price || 0,
                compareAtPrice: existingVariant?.compareAtPrice || 0,
                quantity: existingVariant?.quantity || 0,
                image: existingVariant?.image || 0,
            });
        });

        formikRef?.current?.setFieldValue("variants", variantsValue);
    }, [variantsIdxs, formikRef?.current.values, formikRef?.current?.handleChange]);

    return (
        <Formik innerRef={formikRef} initialValues={defaultValues} onSubmit={(data) => console.log("data", data)}>
            {({ values, resetForm, setFieldValue }) => (
                <Form>
                    <h1>Array of Array Fields</h1>
                    <p>The following example demonstrates the ability of building nested array fields.</p>
                    <FieldArray
                        name="options"
                        render={(arrayHelpers) => (
                            <>
                                <ul>
                                    {values.options.map((item, index) => (
                                        <li key={index}>
                                            <label style={{color:"white"}}>
                                                Name
                                                <input
                                                    style={{color:"white"}}
                                                    name={`options[${index}].name`}
                                                    value={values.options[index].name}
                                                    onChange={(e) => setFieldValue(`options[${index}].name`, e.target.value)}
                                                />
                                            </label>
                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                                Delete option
                                            </button>
                                            <FieldArray
                                                name={`options`}
                                                render={(arrayHelpers) => (
                                                    <div style={{color:"white"}}>
                                                        <label style={{color:"white"}}>Values</label>
                                                        {values?.options?.[index]?.values?.map((item, k) => (
                                                            <div key={k} style={{ marginLeft: 20 }}>
                                                                <input
                                                                    style={{ marginRight: "25px", color:"white" }}
                                                                    name={`options[${index}].values[${k}].value`}
                                                                    value={values?.options[index].values[k].value}
                                                                    onChange={(e) => setFieldValue(`options[${index}].values[${k}].value`, e.target.value)}
                                                                />
                                                                <button type="button" onClick={() => arrayHelpers.remove(k)}>
                                                                    Delete value
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button style={{color:"white"}} type="button" onClick={() => arrayHelpers.push({ value: "" })}>
                                                            Add value
                                                        </button>
                                                        <hr />
                                                    </div>
                                                )}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <section>
                                    <button type="button" onClick={() => arrayHelpers.push({ name: "", values: [{ value: "" }] })}>
                                        Add another option
                                    </button>
                                </section>
                            </>
                        )}
                    />
                    );
                    <div>
                        <label style={{color:"white"}}>Product Variants</label>
                        <FieldArray
                            name="variants"
                            render={() => (
                                <div>
                                    {values?.variants?.map((field, index) => (
                                        <div key={index} className="flex space-x-4">
                                            <label style={{color:"white"}}>{field.variant}</label>
                                            <input
                                                style={{ marginRight: "25px", color:"white" }}
                                                name={`variants[${index}].price`}
                                                value={values.variants[index].price}
                                                onChange={(e) => setFieldValue(`variants[${index}].price`, e.target.value)}
                                            />
                                            <input
                                                style={{ marginRight: "25px", color:"white" }}
                                                name={`variants[${index}].quantity`}
                                                value={values.variants[index].quantity}
                                                onChange={(e) => setFieldValue(`variants[${index}].quantity`, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                    <button type="button" onClick={() => resetForm({ values: defaultValues })}>
                        Reset
                    </button>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};
