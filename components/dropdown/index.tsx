import type { FunctionComponent } from 'react';
import styles from './dropdown.module.scss';
import Select from 'react-select';

type Props = {
    values: any;
    placeHolder: string;
    onChange: (params: any) => any;
};


const Dropdown: FunctionComponent<Props> = ({values, placeHolder, onChange}) => {
    
    const handleChange = (selectedOption) => {
        onChange(selectedOption.value);
    };

    return  (
        <div className={styles.dropdown}>
              <Select 
                options={values} 
                placeholder={placeHolder}
                onChange={handleChange}
                styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'grey' : 'transparent',
                      height: '60px',
                      boxShadow: '0px 0px 8px 5px rgba(125,109,97,0.22);',
                    })
                }}
                />
        </div>
    )
};

export default Dropdown;