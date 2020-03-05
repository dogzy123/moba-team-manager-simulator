import {
    ADD_COST,
    EXECUTE_COSTS,
    INIT_PLAYERS,
    INCREMENT_DAYS,
    SET_PAUSE,
    ADD_DAY_PROGRESS,
    CREATE_PROFILE, SET_MODAL, LOAD_SAVE, SET_MONEY
} from "../actions/main";

let costId = 0;

const filterCosts = (origin, filterArr, days) => {
    let filtered = [].concat( origin );

    for (let i = 0; i < filterArr.length; i++)
    {
        filtered = filtered.filter( el => el.id !== filterArr[i].id );
    }

    filterArr.filter( el => days > el.triggerDays + 1 );

    return filtered;
};

const initialState = {
    days: 1,
    dayProgress: 0,
    players: [],
    currency: '$',
    costs: [],
    paused: true,
    pauseDate: null,
    modalOpen: false,
    profile: {
        managerName: '',
        teamName: '',
        money: 2000,
        teamLogo: null,
        created: false,
    }
};

function reducer( state = initialState, action) {
    switch (action.type) {
        case INIT_PLAYERS:
            return {
                ...state,
                players: [].concat( action.payload.players ),
            };

        case INCREMENT_DAYS:
            return {
                ...state,
                days: state.days + 1,
                dayProgress: 0,
            };

        case LOAD_SAVE:
            return {
                ...state,
                ...action.payload,
            };

        case SET_MONEY:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    money: action.payload.amount,
                }
            };

        case ADD_COST:
            costId++;
            return {
                ...state,
                costs: [].concat(state.costs, [{...action.payload, id: 'DTMS_COST_ID_' + costId}]),
            };

        case EXECUTE_COSTS:
            return  {
                ...state,
                costs: [].concat(state.costs, action.payload.costs),//[].concat( filterCosts(state.costs, action.payload.costs, state.days) ),
                profile: {
                    ...state.profile,
                    money: state.profile.money + action.payload.costs.reduce( (acc, curr) => acc + curr.amount, 0),
                }
            };

        case SET_PAUSE:
            return {
                ...state,
                paused: action.payload.paused,
                pauseDate: action.payload.paused ? new Date() : state.pauseDate,
            };

        case SET_MODAL:
            return {
                ...state,
                modalOpen: action.payload.open,
            };

        case ADD_DAY_PROGRESS:
            return {
                ...state,
                dayProgress: state.dayProgress + 1,
            };

        case CREATE_PROFILE:
            return {
                ...state,
                paused: false,
                profile: {
                    ...state.profile,
                    ...action.payload,
                    created: true,
                }
            };

        default:
            return state;
    }
}

export { reducer as default };