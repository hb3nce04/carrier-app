import InputLabel from "@/Components/form/InputLabel.jsx";
import InputError from "@/Components/form/InputError.jsx";
import SelectInput from "@/Components/form/SelectInput.jsx";

export default function TextInputGroup({label, error, className = "w-full", setData, children, ...props}) {
    return <div className={className}>
        {label && <InputLabel value={label} htmlFor={props.id}/>}
        <SelectInput
            {...props}
            id={props.id}
            value={props.value}
            className="mt-1 block w-full"
            onChange={props.onChange || ((e) => {
                setData(e.target.id, e.target.value)
            })}
        >
            {children}
        </SelectInput>
        <InputError
            message={error}
            className="mt-2"
        />
    </div>
}
