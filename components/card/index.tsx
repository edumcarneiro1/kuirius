import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import styles from './card.module.scss';


import { IRestaurantDish } from '../../types/types';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {  faLocationArrow, faThumbsUp, faThumbsDown, faShare} from '@fortawesome/free-solid-svg-icons'

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


const Card: FunctionComponent<Props> = ({position, dish, setNotification}) => {
    const [liked, setLiked ] = useState(false);
    const [disliked, setDisliked ] = useState(false);
    const [score, setScore] = useState(parseInt(dish.score));

    const likedClassname = liked ? styles.clicked : '';
    const disLikedClassname = disliked ? styles.clicked : '';

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
                newScore = score + 1;
                if (disliked) newDislikeValue = false;
            }
        } else {
            if (disliked) {
                //Increase score +1 on DB
                newScore = score + 1;
                newDislikeValue = false;

            } else {
                //Descrease score -1 on DB
                newScore = score - 1;
                newDislikeValue = true;
                if (liked) newLikeValue = false;
            }   
        }
        const newDish = dish;
        
        newDish.score = newScore.toString();
    
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/restaurants?city=${router.query.city}&dish=${router.query.dish}`, {
            method: 'POST',
            body: JSON.stringify(newDish),
            headers: {'Content-Type' : 'application/json; charset=utf8'}
            }
        );
        
        setScore(newScore);
        setLiked(newLikeValue);
        setDisliked(newDislikeValue);

    };

    const formattedDate = dish.dateOfCreation !== '' ? new Date(parseInt(dish.dateOfCreation)) : null;


    const authorBlock = formattedDate ? <p>{`${dish.author} - ${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`}</p> :  <p>{`${dish.author}`}</p>;

    return  (
        <div id={dish._id} className={styles.container}>
            <div className={styles.details}>
                <div className={styles.left}>
                    <h5>{`${(position + 1).toString()}º ${dish.name}` }</h5>
                    <p>{`Pontuação: ${score}`}</p>
                </div>
                <div className={styles.right}>
                    {
                    dish.link !== '' && 
                    <a href={dish.link} target='_blank' role={'button'} rel="noreferrer">
                        <FontAwesomeIcon icon={faPropIcon} className={styles.icon}/>
                        Visitar
                    </a>
                    }     
                    <p className={styles.bold}>Criado por:</p>
                    {authorBlock}
                </div>
            </div>
            <div className={styles.actions}>
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