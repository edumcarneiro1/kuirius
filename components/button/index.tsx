import type { FunctionComponent } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

type Props = {
    children: string;
    primary: boolean;
    onClick: (params: any) => any;
};


const Button: FunctionComponent<Props> = ({primary, children, onClick}) => {
    const buttonStyle = primary ? classNames(styles.button, styles.primary) : classNames(styles.button, styles.secondary);
    
    return  (
        <button 
            onClick={onClick} 
            className={buttonStyle}
        >
            {children}
        </button>
    )
};

export default Button;