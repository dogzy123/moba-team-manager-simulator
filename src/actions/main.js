export const INIT_PLAYERS = 'INIT PLAYERS';
export function initPlayers(players) {
    return {
        type: INIT_PLAYERS,
        payload: {
            players,
        }
    };
}

export const INCREMENT_DAYS = 'INCREMENT_DAYS';
export function incrementDays() {
    return {
        type: INCREMENT_DAYS,
    }
}

export const LOAD_SAVE = 'LOAD_SAVE';
export function loadSave (save) {
    return {
        type: LOAD_SAVE,
        payload: {
            ...save
        }
    };
}

export const SET_MONEY = 'SET_MONEY';
export function setMoney(amount) {
    return {
        type: SET_MONEY,
        payload: {
            amount,
        }
    }
}

export const  ADD_COST = 'ADD COST';
export function addCost({amount, description, triggerDays = false}) {
    return {
        type: ADD_COST,
        payload: {
            amount, description, triggerDays
        }
    };
}

export const EXECUTE_COSTS = 'EXECUTE COSTS';
export function executeCosts(costs) {
    return {
        type: EXECUTE_COSTS,
        payload: {
            costs,
        }
    }
}

export const SET_PAUSE = 'SET_PAUSE';
export function setPause(paused) {
    return {
        type: SET_PAUSE,
        payload: {
            paused,
        }
    }
}

export const SET_MODAL = 'SET_MODAL';
export function setModalOpen(bool) {
    return {
        type: SET_MODAL,
        payload: {
            open: bool,
        }
    };
}

export const ADD_DAY_PROGRESS = 'ADD DAY PROGRESS';
export function addDayProgress () {
    return {
        type: ADD_DAY_PROGRESS,
    }
}

export const CREATE_PROFILE = 'CREATE PROFILE';
export function createProfile({managerName, teamName, teamLogo}) {
    return {
        type: CREATE_PROFILE,
        payload: {
            managerName, teamName, teamLogo
        }
    }
}