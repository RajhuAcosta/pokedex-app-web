import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice = createSlice({
    name:"trainerName",
    initialState: localStorage.getItem("nameTrainer") ? localStorage.getItem("nameTrainer") : "",
    reducers: {
        setTrainerName: (state,action) => {
            const newTrainerName = action.payload;
            localStorage.setItem("nameTrainer",newTrainerName);
            return newTrainerName;
        }
    }
})

export const {setTrainerName} = trainerNameSlice.actions;

export default trainerNameSlice.reducer;