import { FunctionComponent, useState } from 'react'
import styles from './input.module.scss'

type Props = {
    placeHolder?: string;
    onChange: (params: any) => any;
}

const Input: FunctionComponent<Props> = ({placeHolder, onChange}) => {
    return(
        <input placeholder={placeHolder} className={styles.input}  onChange={(e) => onChange(e.target.value)}/>
    );
};

export default Input;