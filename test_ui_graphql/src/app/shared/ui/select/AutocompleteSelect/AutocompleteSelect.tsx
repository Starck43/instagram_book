import {FormEvent, useState} from "react";
import {
    Autocomplete, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import {createFilterOptions} from '@mui/material/Autocomplete';


export interface SelectOption {
    id?: string
    name: string
    inputValue?: string
}

interface SelectProps {
    label?: string
    options: SelectOption[]
    value?: SelectOption
    multiple?: boolean
    onChange?: (value: SelectOption | string | null) => void
}

const filter = createFilterOptions<SelectOption>()

export const AutocompleteSelect = (props: SelectProps) => {

    const {label = "", options = [], value = null, onChange} = props
    const [selectedValue, setSelectedValue] = useState<SelectOption | null>(value);
    const [optionsList, setOptionsList] = useState<SelectOption[]>(options)
    const [formValue, setFormValue] = useState<SelectOption>({name: ""});
    const [openForm, toggleOpenForm] = useState(false);


    const formCloseHandler = () => {
        setFormValue({name: ""});
        toggleOpenForm(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formValue?.name) {
            setSelectedValue({name: formValue.name});
            setOptionsList([...optionsList, {name: formValue.name}])
            onChange?.(formValue)
        }
        formCloseHandler();
    };

    if (!optionsList.length) return null

    return (
        <>
            <Autocomplete
                disablePortal
                id="comboSelectId"
                options={optionsList}
                sx={{width: "100%"}}
                selectOnFocus
                blurOnSelect
                handleHomeEndKeys
                value={selectedValue}
                getOptionLabel={(option) => {
                    if (typeof option === "string") {
                        return option;
                    }
                    if (option?.inputValue) {
                        return option.inputValue;
                    }
                    return option?.name
                }}
                renderInput={(params) => <TextField {...params} label={label}/>}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        setTimeout(() => {
                            toggleOpenForm(true);
                            setFormValue({
                                name: newValue,
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpenForm(true);
                        setFormValue({
                            name: newValue.inputValue,
                        });
                    } else {
                        newValue && setSelectedValue(newValue);
                    }
                    newValue && onChange?.(newValue)
                }}
                filterOptions={(options: SelectOption[], params) => {
                    const filtered = filter(options, params);

                    const {inputValue} = params;

                    //const isFound = options.some(option => option.name.includes(inputValue));
                    if (inputValue !== "") {
                        filtered.push({
                            inputValue,
                            name: `Добавить "${inputValue}"`,
                        });

                    }
                    return filtered;
                }}
            />

            <Dialog open={openForm} onClose={toggleOpenForm}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{`Add a new ${label}`}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={formValue.name}
                            onChange={(event) =>
                                setFormValue({
                                    ...formValue,
                                    name: event.target.value,
                                })
                            }
                            label="title"
                            type="text"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={formCloseHandler}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}
