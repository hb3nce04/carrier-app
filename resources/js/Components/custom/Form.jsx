import SecondaryLink from "@/Components/form/button/SecondaryLink.jsx";
import PrimaryButton from "@/Components/form/button/PrimaryButton.jsx";

export default function Form ({children, onSubmit, className, backLink, submitText}) {
    return (
        <form onSubmit={onSubmit} className="mt-5">
            <div className={className}>
                {children}
            </div>
            <div className="mt-6 flex gap-2 justify-end">
                <SecondaryLink href={route(backLink)}>Vissza</SecondaryLink>
                <PrimaryButton>{submitText}</PrimaryButton>
            </div>
        </form>
    )
}
