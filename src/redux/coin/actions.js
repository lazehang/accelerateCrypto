import axios from "axios";
import { Dispatch } from "react-redux";

export const ADD_COINS = 'ADD_COINS';
export const SOCKET_UPDATE_COINS = 'SOCKET_UPDATE_COINS';


// export const DELETE_TEAM = 'DELETE_TEAM';


// export const EDIT_TEAM = 'EDIT_TEAM';


export const CLEAR_COINS = 'CLEAR_COINS';


export function remoteFetchCoins() {
    return (dispatch) => {
        axios.get(process.env.REACT_APP_API_SERVER + 'coins').then((resp) => {
            dispatch(addCoins(resp.data))
        });
    };
}

// export function remoteAddTeam(name: string, color: string, players: IPlayer[]) {
//     return (dispatch: Dispatch) => {
//         axios.post(process.env.REACT_APP_API_URL + 'teams', { name, color, players }).then(resp => dispatch(addTeam(resp.data.id, name, color, players)));
//     }
// }

// export function remoteDeleteTeam(id: number) {
//     return (dispatch: Dispatch) => {
//         axios.delete(process.env.REACT_APP_API_URL + 'teams/' + id).then(resp => dispatch(deleteTeam(resp.data.id)));
//     }
// }


export function addCoins(coins) {
    return {
        coins,
        type: ADD_COINS
    }
}

// export function editTeam(id: number, name: string, color: string, players: IPlayer[]) {
//     return {
//         color,
//         id,
//         name,
//         players,
//         type: EDIT_TEAM
//     }
// }

// export function deleteTeam(id: number) {
//     return {
//         id,
//         type: DELETE_TEAM
//     }
// }

// export function updateCoins(coins) {
//     return {
//         coins,
//         type: SOCKET_UPDATE_COINS
//     }
// }

export function clearClear() {
    return {
        type: CLEAR_COINS,
    }
}