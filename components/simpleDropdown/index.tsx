import { FunctionComponent, useState } from 'react'
import styles from './simpleDropdown.module.scss'

type Props = {
    values: any[];
    defaultValue: string;
    onChange: (params: any) => any;
}

const SimpleDropdown: FunctionComponent<Props> = ({values,defaultValue, onChange}) => {
  
    const options = values.map((opt, index) => <option key={index} value={opt.value}>{opt.name}</option>)
    return  (
        <div className={styles.dropdownContainer}>
            <label>Ordenar por:</label>
            <select value={defaultValue} onChange={(e)=> onChange(e.target.value)}>
                {options}
            </select>
        </div>
    );
};

export default SimpleDropdown;