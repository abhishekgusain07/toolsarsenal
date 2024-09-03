import * as React from "react";
import { IconButton } from "../IconButton";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { ResetIcon } from "../ResetIcon";


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  reset?: boolean,
  resetUpdate?: any;
  maxLength?: number;
  urlcheck?: any;
  settingsUi?: boolean;
  onReset?: any;
  showResetIcon?: boolean;
  onResetIconPressed?: any;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, description, resetUpdate, maxLength, reset, urlcheck,settingsUi, onReset, showResetIcon, onResetIconPressed, ...props}, ref) => {
    const id = React.useId();
    const [value, setValue] = React.useState(props.value as string);
    React.useEffect(() => {
      setValue(props.value as string);
    }, [props.value])
    return (
      <div className={`grid gap-2 mx-auto ${settingsUi ? 'w-[97%]' : 'w-full'}`}>
        <div className="flex w-full justify-between items-center">
          <>
            {label && <Label htmlFor={id}>{label}</Label>}
            {showResetIcon && <IconButton className="ml-auto size-4" onClick={
              onResetIconPressed
            }>
              <ResetIcon className="rotate-180" />
            </IconButton>
            }
          </>
        </div>
        <input
          id={id}
          type={type}
          maxLength={maxLength ? maxLength : 400}
          className={cn(
            "flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-[16px] sm:text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className
          )}
          onChange={(e) => {
            if(urlcheck) {
              urlcheck(e.target.value);
            }
            setValue(e.target.value);
          }}
          ref={ref}
          {...props}
        />
        {maxLength && value && value.length > 0 &&
          (
            <p className="ml-auto text-xs text-zinc-500">{value.length}/{maxLength}</p>
          )
        }
        {description && (
          <p className="ml-1 text-sm text-zinc-500">{description}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
