export default function FormTitle({ children, className = "" }) {
    return (
        <h1 className={`text-xl font-bold p-2 w-100 rounded-md bg-gradient-to-r from-slate-300 dark:from-slate-700 ${className}`}>{children}</h1>
    );
}
