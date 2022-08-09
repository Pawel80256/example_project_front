import {combineReducers, configureStore} from '@reduxjs/toolkit';
import clientsReducer from "../features/clientsContent/ClientsSlice";
import projectsReducer from"../features/projectsContent/ProjectSlice"

export const store = configureStore({
  reducer: combineReducers({
        clients: clientsReducer,
        projects: projectsReducer
      })
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
