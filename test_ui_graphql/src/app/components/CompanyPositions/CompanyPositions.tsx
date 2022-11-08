import {AutocompleteSelect} from "app/shared/ui/select/AutocompleteSelect/AutocompleteSelect";
import {SelectOption} from "app/shared/ui/select/AutocompleteSelect/AutocompleteSelect";


const CompanyPositions = (props: { options: SelectOption[] }) => {

    const onChangeHandler = (val: SelectOption | string | null) => {
        console.log(val)
    }

    return (
        <AutocompleteSelect
            label="company positions"
            options={props.options}
            onChange={onChangeHandler}
        />
    )

};

export default CompanyPositions;
