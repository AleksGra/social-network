import {SEND_MESSAGE} from "./actions";

const initialState = {
    dialogsData: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrew"},
        {id: 3, name: "Sergey"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Vova"},
    ],


    posts:[
        {id: 1, message: "hello"},
        {id: 2, message: "privet"},
        {id: 3, message: "diaruju"},
        {id: 4, message: "Hola"},
        {id: 5, message: "Salut"},
        {id: 6, message: "kak dela"},
    ],}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_MESSAGE:
        // let stateCopy={...state};
        // stateCopy.posts=[...state.posts]
        return {
          ...state,
          posts: [...state.posts, { id: 6, message: action.payload.text }],
        };

      //stateCopy.posts.push({id: 6, message: action.payload.text});
      // return stateCopy
      default:
        return state;
    }
}

export default dialogReducer