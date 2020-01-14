import {
    ADD_COST,
    EXECUTE_COSTS,
    INIT_PLAYERS,
    INCREMENT_DAYS,
    SET_PAUSE,
    ADD_DAY_PROGRESS,
    CREATE_PROFILE
} from "../actions/main";

const initialState = {
    days: 1,
    dayProgress: 0,
    players: [],
    currency: '$',
    costs: [],
    paused: true,
    pauseDate: null,
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