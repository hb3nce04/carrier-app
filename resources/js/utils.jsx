import TextInputGroup from "@/Components/form/group/TextInputGroup.jsx";

export const renderInputFields = (fields, data, errors, setData) =>
    fields.map((field) => (
        <TextInputGroup
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type || "text"}
            value={data[field.id]}
            error={errors[field.id]}
            setData={setData}
            disabled={field.disabled}
        />
    ));

export const renderLabels = (labels, data) => labels.map((label, id) => (
    <div key={id}>
        {label.name}:{" "}
        <span
            className="text-indigo-400 font-bold">{label.value.split('.').reduce((obj, key) => obj && obj[key], data)}</span>
    </div>
))

/**
 * for onChange props, automatically guesses the singular id and set the value for the element
 * @param e
 * @param setData
 */
export const handleSingleSelect = (e, setData) => {
    setData(e.target.id.split('s')[0] + "_id", e.target.value)
}

/**
 * for useForm hook, returns back with field list
 * @param fields
 * @param values
 */
export const extractFields = (fields, values) => {
    return fields.reduce((acc, field) => {
        acc[field.id] = values ? values[field.id] : "";
        return acc;
    }, {});
}
