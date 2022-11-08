import {useMemo} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';


export interface SelectOption {
    id: string
    name: string
}

interface SelectProps {
    label?: string
    options?: SelectOption[]
    value?: string
    onChange?: (value: string) => void
}

export const ItemsSelect = (props: SelectProps) => {
    const {label = "", options = [], value = "", onChange, ...other} = props

    const optionsList = useMemo(()=> options?.map(opt =>
        <MenuItem value={opt.name} key={opt.id}>
            {opt.name}
        </MenuItem>
    ),[options])

    const selectHandler = (e: SelectChangeEvent) => {
        onChange?.(e.target.value)
    }

    return (
        <FormControl fullWidth>
            {label && <InputLabel id="selectLabelId">{label}</InputLabel>}
            <Select
                labelId="selectLabelId"
                id="selectId"
                value={value}
                label={label}
                onChange={selectHandler}
                {...other}
            >
                {optionsList}
            </Select>
        </FormControl>
    )
}
