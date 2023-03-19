import type { FunctionComponent } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

type Props = {
    children: string;
    primary: boolean;
    disclaimer?: string;
    onClick: (params: any) => any;
};


const Button: FunctionComponent<Props> = ({primary,disclaimer, children, onClick}) => {
    const buttonStyle = primary ? classNames(styles.button, styles.primary) : classNames(styles.button, styles.secondary);
    
    return  (
        <button 
            onClick={onClick} 
            className={buttonStyle}
        >
            {disclaimer && <span className={styles.disclaimer}>{disclaimer}</span>}
            <span>{children}</span>
        </button>
    )
};

export default Button;