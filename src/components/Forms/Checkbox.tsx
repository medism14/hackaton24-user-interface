interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    id: string;
    marginTop?: string;
    marginBottom?: string;
}

export function Checkbox({
    checked,
    onChange,
    label,
    id,
    marginTop,
    marginBottom
}: CheckboxProps) {
    return (
        <div
            className="w-full flex items-center gap-2"
            style={{
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
            }}
        >
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className={`
          w-5 
          h-5
          border
          border-graydark 
          dark:border-form-strokedark
          text-primary
          bg-white
          dark:bg-form-input
          rounded
          transition-all
          duration-200
          hover:border-primary
          focus:border-primary
          focus:ring-2
          focus:ring-primary
          focus:ring-opacity-15
          dark:focus:ring-opacity-30
        `}
            />
            <label
                htmlFor={id}
                className="text-black dark:text-white cursor-pointer"
            >
                {label}
            </label>
        </div>
    );
}