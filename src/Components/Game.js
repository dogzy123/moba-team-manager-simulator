import React, {useEffect, useState, Suspense} from "react";
import "react-circular-progressbar/dist/styles.css";
import styles from "../styles/MainGame.module.scss";
import SweetterImg from "../img/sweeterImg.jpg";
import classNames from "classnames";
import generatePlayers from '../logic/generatePlayers';
import {DAY_DURATION, POSITIONS} from "../logic/constants";
import {useDispatch, useSelector} from "react-redux";
import {addCost, initPlayers, incrementDays, setPause, addDayProgress, executeCosts} from "../actions/main";
import {CollapseIcon, ExpandIcon} from "./Icons";
import AnimatedBackground from "./AnimatedBackground";
import CreateProfile from "./CreateProfile";
import GameMenu from "./GameMenu";
import PlayerStats from "./PlayerStats";

const FindPlayerModal = React.lazy( () => {
  return import('./FindPlayerModal');
} );

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

  // Generate players
  useEffect( () => {
    dispatch( initPlayers(generatePlayers()) );
  }, [] );

  // Day progress
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

  // Weekly costs
  useEffect( () => {
    if (!paused && !(days % 7))
    {
      dispatch( addCost({amount: -200, description: "Weekly costs.", triggerDays: days + 1}) );
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
      <GameMenu />
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