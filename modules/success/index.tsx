import { FunctionComponent } from 'react';
import classNames from 'classnames';

import styles from './success.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {  faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
    success: boolean;
    message: string;
};

const faSuccessPropIcon = faCheckCircle as IconProp;

const faErrorPropIcon = faExclamationCircle as IconProp;

const Success: FunctionComponent<Props> = ({success, message}) => {

    const icon = success ? 
            {name: faSuccessPropIcon, class: classNames(styles.icon, styles.successIcon)} : 
            {name: faErrorPropIcon, class: classNames(styles.icon, styles.error)};
    return (
      <div className={styles.success}>
        <FontAwesomeIcon icon={icon.name} className={icon.class}/>
        <p>{message}</p>
      </div>
       
    );
};

export default Success;