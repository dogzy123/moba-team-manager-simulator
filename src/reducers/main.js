import {ADD_COST, EXECUTE_COSTS, INIT_PLAYERS, INCREMENT_DAYS, SET_PAUSE, ADD_DAY_PROGRESS} from "../actions/main";

const initialState = {
    days: 1,
    dayProgress: 0,
    players: [],
    money: 2000,
    currency: '$',
    costs: [],
    paused: false,
    dayStarted: new Date(),
    pauseDate: null,
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

        case ADD_COST:
            return {
                ...state,
                costs: [].concat(state.costs, [{...action.payload}]),
            };


        case EXECUTE_COSTS:
            return  {
                ...state,
                costs: []
            };

        case SET_PAUSE:
            return {
                ...state,
                paused: action.payload.paused,
                pauseDate: action.payload.paused ? new Date() : state.pauseDate,
            };

        case ADD_DAY_PROGRESS:
            return {
                ...state,
                dayProgress: state.dayProgress + 1,
            };

        default:
            return state;
    }
}

export { reducer as default };