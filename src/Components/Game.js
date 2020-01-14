import React, {useEffect, useState, Suspense} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "../styles/MainGame.module.scss";
import SweetterImg from "../img/sweeterImg.jpg";
import classNames from "classnames";
import generatePlayers from '../logic/generatePlayers';
import {DAY_DURATION, POSITIONS} from "../logic/constants";
import {useDispatch, useSelector} from "react-redux";
import {addCost, initPlayers, incrementDays, setPause, addDayProgress} from "../actions/main";
import {CollapseIcon, ExpandIcon} from "./Icons";
import AnimatedBackground from "./AnimatedBackground";
import CreateProfile from "./CreateProfile";

const FindPlayerModal = React.lazy( () => {
  return import('./FindPlayerModal');
} );

function PlayerStats() {
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
        setTriggerCosts([].concat(costs.filter( cost => cost.triggerDays === days )));
      }
    }
  }, [days, paused]);

  useEffect( () => {
    if (triggerCosts.length)
    {
        //REDUX THUNK
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
                      <div className={styles.costAmount}>{cost.amount}{currency}</div>
                      <div className={styles.costDescription}>{cost.description}</div>
                    </div>
                );
                } )
              : null
          }
        </div>
      </div>
  );
}

function Game () {
  const dispatch = useDispatch();
  const {players, days, paused, dayProgress, profile} = useSelector( state => ({
    players: state.players,
    days: state.days,
    paused: state.paused,
    dayProgress: state.dayProgress,
    profile: state.profile,
  }) );

  const [findPlayerModal, setFindPlayerModal] = useState(false);
  const [sweetterOpen, setSweetterOpen] = useState(true);

  const handleSweetterOpen = e => {
    setSweetterOpen( prevState => !prevState );
  };

  useEffect( () => {
    dispatch( initPlayers(generatePlayers()) );
  }, [] );

  useEffect( () => {
    let intervalId;

    if (!paused)
    {
      if (dayProgress === 100)
      {
        dispatch(incrementDays());
      }

      intervalId = window.accurateInterval( () => {
        dispatch( addDayProgress() );
      }, DAY_DURATION / 100 );
    }

    return () => {
      if (intervalId)
      {
        intervalId.cancel();
      }
    };
  }, [dayProgress, paused] );

  useEffect( () => {
    if (!paused)
    {
      // Weekly costs
      if (days % 7 === 0)
      {
        dispatch( addCost({amount: -200, description: "Weekly costs.", triggerDays: days + 1}) );
      }
    }
  }, [days]);

  useEffect( () => {
    if (findPlayerModal)
    {
      document.getElementById('dtms-root').classList.add(styles.modalOpen);
    }

    return () => {
      document.getElementById('dtms-root').classList.remove(styles.modalOpen);
    };
  }, [findPlayerModal] );

  const findPlayer = (position) => {
    setFindPlayerModal(true);
    dispatch(setPause(true));
  };

  return (
    <div className={styles.main}>
      <AnimatedBackground />
      {
        !profile.created
            ? <CreateProfile open={true} canClose={false}/>
            : null
      }
      <div className={styles.mainContainer}>
        <div className={styles.mainHeader}>
          <div className={styles.mainSectionContainer}>
            <div className={styles.headerCol}>
              <PlayerStats/>
            </div>
            <div className={styles.headerColPlayers}>
              <div className={styles.headerColLeftContainer}>
                {
                  POSITIONS.map( (position, i) => {
                    return (
                        <div key={i} className={classNames(styles.playerCard, styles.empty)}>
                          <div className={styles.playerInfo} onClick={() => findPlayer(position.id)}>

                          </div>
                          <div className={styles.playerPosition}>
                            <h3>{position.title}</h3>
                            <span className={styles.positionDescription}>
                              ({position.description})
                            </span>
                          </div>
                        </div>
                    );
                  } )
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainBody}>
          <div className={styles.mainSectionContainer}>
            <div className={styles.sweetterBlock + " " + (sweetterOpen ? '' : styles.collapsed)}>
              <div className={styles.sweetterHeader} onClick={handleSweetterOpen}>
                <div className={styles.sweetterHeaderContainer}>
                  <img alt="swetter" src={SweetterImg} className={styles.sweetterImg} />
                  <span className={styles.sweetterHeaderTitle}>Sweetter</span>
                  <div className={styles.sweetterHeaderCloseBlock}>
                    {
                      sweetterOpen
                        ? <CollapseIcon/>
                        : <ExpandIcon/>
                    }
                  </div>
                </div>
              </div>
              <div className={styles.sweetterBody}>
                <div className={styles.sweetterBodyContainer}>
                  <div className={styles.sweet}>
                    <div className={styles.sweetContainer}>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={""}>
        <FindPlayerModal
            open={findPlayerModal}
            setOpen={setFindPlayerModal}
            players={players}
        />
      </Suspense>
    </div>
  );
}

export { Game as default };