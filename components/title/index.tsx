import type { FunctionComponent } from 'react';
import styles from './title.module.scss';
import classNames from 'classnames';

type Props = {
    children: string;
    style?: string;
}

const Title: FunctionComponent<Props> = ({children, style}) => {
    const titleStyle = style === 'white' ? classNames(styles.title, styles.white) : styles.title;
    return  <h3 className={titleStyle}>{children}</h3>
};

export default Title;