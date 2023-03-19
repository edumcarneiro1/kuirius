import type { FunctionComponent } from 'react';
import styles from './dropdown.module.scss';
import Select from 'react-select';

type Props = {
    values: any;
    placeHolder: string;
    style?: string;
    value?: string;
    onChange: (params: any) => any;
};


const Dropdown: FunctionComponent<Props> = ({values, placeHolder, onChange, style, value}) => {
    
    const handleChange = (selectedOption) => {
        onChange(selectedOption.value);
    };

    let boxShadow = '0px 0px 8px 5px rgba(125,109,97,0.22);';

    let borderRadius = '0';
    
    let color = '';

    let border = 'transparent';

    if (style === 'add') {
        boxShadow = '';
        borderRadius = '12px';
        color = '#000000';
        border = '#000000';
    }
    const select = value && value !== '' ? 
        <Select 
        options={values} 
        placeholder={placeHolder}
        onChange={handleChange}
        value={value && value !== '' && values.filter(option => option.value === value)}
        styles={{
            control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'grey' : border,
            height: '60px',
            boxShadow: boxShadow,
            color: color,
            borderRadius: borderRadius,
            fontSize: '14px'
            })
        }}
        /> : 
        <Select 
        options={values} 
        placeholder={placeHolder}
        onChange={handleChange}
        styles={{
            control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'grey' : border,
            height: '60px',
            boxShadow: boxShadow,
            color: color,
            borderRadius: borderRadius,
            fontSize: '14px'
            })
        }}
        />; 

    return  (
        <div className={styles.dropdown}>
             {select}
        </div>
    )
};

export default Dropdown;