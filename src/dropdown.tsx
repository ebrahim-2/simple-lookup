import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

const options = [
    { key: 1, text: 'Email Lookup', value: 1 },
    { key: 2, text: 'Phone Number Lookup', value: 2 },
    { key: 3, text: 'IP Address Lookup', value: 3 },
]

const DropdownExampleSimple = (props: Props) => (
    <Menu >
        <Dropdown value={props.currentValue} options={props.options} selection onChange={(e, data) => {
            props.changeHandler(data.value)
        }
        } fluid />
    </Menu>
)

interface Props {
    currentValue: number;
    changeHandler: Function;
    options: { key: number; text: string; value: number; }[];
}
export default DropdownExampleSimple
