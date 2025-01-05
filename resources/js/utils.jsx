import TextInputGroup from "@/Components/form/TextInputGroup.jsx";

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

export const renderLabels = (labels, data) => labels.map((label) => (
    <div>
        {label.name}:{" "}
        <span className="text-indigo-400 font-bold">{label.value.split('.').reduce((obj, key) => obj && obj[key], data)}</span>
    </div>
))

export const handleSelectChange = (e, setData) => {
    setData(e.target.id.split('s')[0] + "_id", e.target.value)
}

export const extractFieldIds = (fields) => {
    return fields.reduce((acc, field) => {
        acc[field.id] = "";
        return acc;
    }, {});
}

export const extractFieldIdsWithValue = (fields, values) => {
    return fields.reduce((acc, field) => {
        acc[field.id] = values[field.id];
        return acc;
    }, {});
}
