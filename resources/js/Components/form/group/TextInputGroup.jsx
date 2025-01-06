import InputLabel from "@/Components/form/InputLabel.jsx";
import TextInput from "@/Components/form/TextInput.jsx";
import InputError from "@/Components/form/InputError.jsx";

export default function TextInputGroup({label, error, setData, className = "w-full", ...props}) {
    return <div className={className}>
        {label && <InputLabel
            value={label}
            htmlFor={props.id}
        />}
        <TextInput
            {...props}
            className={`${label && "mt-1"} block w-full`}
            id={props.id}
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e) => {
                setData(e.target.id, e.target.value)
            }}
            type={props.type}
        />
        <InputError
            className="mt-2"
            message={error}
        />
    </div>
}
