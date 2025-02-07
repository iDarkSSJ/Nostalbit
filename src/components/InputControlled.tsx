import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNewRomStore } from "@/stores/newRomStore"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

type InputProps<FormValues extends FieldValues> = {
  name: Path<FormValues>
  form: UseFormReturn<FormValues>
  children?: React.ReactNode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "form">

export default function InputControlled<FormValues extends FieldValues>({
  name,
  form,
  children,
  ...props
}: InputProps<FormValues>) {
  const { setTitle, setCover } = useNewRomStore()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {children && <FormLabel>{children}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              value={props.type === "file" ? undefined : field.value || ""}
              {...props}
              onChange={(e) => {
                if (props.type === "file") {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  field.onChange(file)
                  if (name === "cover") setCover(file)
                } else {
                  field.onChange(e)
                  if (name === "title") setTitle(e.target.value)
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
