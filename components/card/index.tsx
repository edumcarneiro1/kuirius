import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import styles from './card.module.scss';
import classNames from 'classnames';


import { IRestaurantDish } from '../../types/types';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {  faLocationArrow, faThumbsUp, faThumbsDown, faShare, faEye} from '@fortawesome/free-solid-svg-icons'

import Button from '../button';

type Props = {
    position: number;
    dish: IRestaurantDish;
    setNotification: (params: any) => any;
};

enum INTERACTION {
    Like,
    Dislike
};

const faPropIcon = faLocationArrow as IconProp;
const faPropUpIcon = faThumbsUp as IconProp;
const faPropDownIcon = faThumbsDown as IconProp;
const faPropShareIcon = faShare as IconProp;
const faPropEye = faEye as IconProp;


const Card: FunctionComponent<Props> = ({position, dish, setNotification}) => {
    const [liked, setLiked ] = useState(false);
    const [disliked, setDisliked ] = useState(false);
    const [score, setScore] = useState(parseInt(dish.score));

    const likedClassname = liked ? styles.like : '';
    const disLikedClassname = disliked ? styles.dislike : '';

    const router = useRouter();

    const handleShare = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST}/${router.asPath}#${dish._id}`);
        setNotification('O link do restaurante foi copiado para o seu clipboard');
    } 

    const setInteraction = (e, interaction) => {
        e.preventDefault();

        let newLikeValue = liked;
        let newDislikeValue = disliked;
        let newScore = score;

        if (interaction === INTERACTION.Like) {
            if (liked) {
                //Descrease score -1 on DB
                newScore = score - 1;
                newLikeValue = false;
            } else {
                //Increase score +1 on DB
                newLikeValue = true;

                if (disliked) {
                    newDislikeValue = false;
                    newScore = score + 2;
                } else {
                    newScore = score + 1;
                }
            }
        } else {
            if (disliked) {
                //Increase score +1 on DB
                newScore = score + 1;
                newDislikeValue = false;

            } else {
                //Descrease score -1 on DB
                newDislikeValue = true;
                if (liked) {
                    newLikeValue = false;
                    newScore = score - 2;
                } else {
                    newScore = score - 1;
                }
            }   
        }
        const newDish = dish;
        
        newDish.score = newScore.toString();
    
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/restaurants?city=${router.query.city}&dish=${router.query.dish}`, {
            method: 'POST',
            body: JSON.stringify(newDish)
            }
        );
        
        setScore(newScore);
        setLiked(newLikeValue);
        setDisliked(newDislikeValue);

    };

    const formattedDate = dish.dateOfCreation !== '' ? new Date(parseInt(dish.dateOfCreation)) : new Date();

    const authorBlock = dish.author && dish.author !== '' ? 
            <p>{`${dish.author} - ${formattedDate.toLocaleDateString('en-GB')}`}</p> :  
            <p>{`Adicionado em ${formattedDate.toLocaleDateString('en-GB')}`}</p>;

    return  (
        <div id={dish._id} className={styles.container}>
            <div className={styles.details}>
                <div className={styles.left}>
                    <h2>{`${(position + 1).toString()}º ${dish.name}` }</h2>        
                </div>
                <div className={styles.right}>
                    {dish.link && 
                        <a href={dish.link} target="_blank" rel='noreferrer'>
                                <FontAwesomeIcon icon={faPropEye} className={styles.icon}/>
                                Visitar
                        </a>
                    }
                </div>
            </div>
            <h3>{`Pontuação: ${score}`}</h3>
            {authorBlock}
            <div className={ styles.actions }>
                <a href="#" className={likedClassname} onClick={(e) => setInteraction(e, INTERACTION.Like)}>
                    <FontAwesomeIcon icon={faPropUpIcon} className={styles.icon}/>
                    Gosto
                </a>
                <a href="#" className={disLikedClassname}  onClick={(e) => setInteraction(e, INTERACTION.Dislike)}>
                    <FontAwesomeIcon icon={faPropDownIcon} className={styles.icon}/>
                    Não Gosto
                </a>
                <a href="#" onClick={handleShare}>
                    <FontAwesomeIcon icon={faPropShareIcon} className={styles.icon}/>
                    Partilhar
                </a>
            </div>
        </div>
    )
};
export default Card;


