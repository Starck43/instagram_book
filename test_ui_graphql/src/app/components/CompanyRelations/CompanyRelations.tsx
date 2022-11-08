import {SelectOption} from "app/shared/ui/select/AutocompleteSelect/AutocompleteSelect";
import {AutocompleteSelect} from "app/shared/ui/select/AutocompleteSelect/AutocompleteSelect";


const CompanyRelations = (props: { options: SelectOption[] }) => {

    const onChangeHandler = (val: SelectOption | string | null) => {
        console.log(val)
    }

    return (
        <AutocompleteSelect
            label="company relations"
            options={props.options}
            onChange={onChangeHandler}
        />
    )

};

export default CompanyRelations;
