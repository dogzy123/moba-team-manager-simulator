import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {executeCosts} from "../actions/main";
import styles from "../styles/MainGame.module.scss";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import classNames from "classnames";

function PlayerStats() {
    const dispatch = useDispatch();
    const {days, money, currency, costs, paused, dayProgress} = useSelector( state => ({
        days: state.days,
        money: state.profile.money,
        currency: state.currency,
        costs: state.costs,
        paused: state.paused,
        dayProgress: state.dayProgress,
    }) );

    const [triggerCosts, setTriggerCosts] = useState([]);

    useEffect( () => {
        if (!paused)
        {
            if (costs.length)
            {
                setTriggerCosts( [].concat(costs.filter( cost => cost.triggerDays === days )) );
            }
        }
    }, [days, paused]);

    useEffect( () => {
        if (triggerCosts.length)
        {
            dispatch( executeCosts(triggerCosts) );
        }
    }, [triggerCosts] );

    return (
        <div className={styles.playerStats}>
            <div className={styles.days}>
                <span className={styles.shadowText}>Day: {days}</span>
            </div>
            <div className={styles.dayProgress}>
                <CircularProgressbar
                    value={dayProgress}
                    strokeWidth={50}
                    styles={buildStyles({
                        counterClockwise: true,
                        strokeLinecap: "butt",
                        pathTransitionDuration: 0.01,
                        pathColor: 'rgb(130, 48, 48)'
                    })}/>
            </div>
            <div className={styles.money}>
                <span className={styles.shadowText}>Money: {money}{currency}</span>
            </div>
            <div className={styles.costs}>
                {
                    triggerCosts && triggerCosts.length
                        ? triggerCosts.map( (cost, i) => {
                            return (
                                <div key={i} className={styles.cost}>
                                    <div className={classNames(styles.costAmount, styles.shadowText)}>
                                        {cost.amount}{currency}
                                    </div>
                                    <div className={classNames(styles.costDescription, styles.shadowText)}>
                                        {cost.description}
                                    </div>
                                </div>
                            );
                        } )
                        : null
                }
            </div>
        </div>
    );
}

export default PlayerStats;