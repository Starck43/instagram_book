import {useMemo} from "react";
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';


export interface SelectOption {
    id: string
    name: string
}

interface SelectProps {
    label?: string
    options: SelectOption[]
    value?: string
    onChange?: (value: any) => void
}

export const MultipleSelect = (props: SelectProps) => {
    const {label = "", options = [], value = null, onChange} = props

    return (
        <Autocomplete
            multiple
            id="comboMultipleSelectId"
            options={options.map((option) => option.name)}
            renderInput={(params) => (
                <TextField {...params} label={label}/>
            )}
            onChange={(event, newValue)=>{onChange?.(newValue)}}
        />
    )
}
