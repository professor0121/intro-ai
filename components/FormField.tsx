import React from 'react'
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type: 'text' | 'email' | 'password' | 'file';
}

const FormField = <T extends FieldValues>({ control, name, placeholder, type = "text", label }: FormFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                    <Input className='input' placeholder={placeholder} {...field} type={type} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
)

export default FormField