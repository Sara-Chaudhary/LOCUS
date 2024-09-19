import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    origin: null,
    destination:null,
    location:null,
}

export const navSlice = createSlice({
    name:'nav',
    initialState,
    reducers:{
        setOrigin : (state , action) =>{
            state.origin = action.payload;
        },
        setDestination:(state,action) =>{
            state.destination = action.payload;
        },
        setLocation:(state,action) =>{
            state.location = action.payload;
        },
    },
});

export const {setOrigin , setDestination , setLocation} = navSlice.actions ;

// Selectors
export const selectOrigin =(state) => state.nav.origin;
export const selectDestination =(state) => state.nav.destination;
export const selectLocation =(state)=>state.nav.location;

export default navSlice.reducer ;