import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchActorById = createAsyncThunk('fetchActorById', async (id) => {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits%2C%20images&language=en-US&api_key=8ef1c18c56bc6d0d2ff280c6fd0b854d`);
      return data;
    } catch (er) {
      console.log(er);
      throw er;
    }
});

const singleActorSlice = createSlice({
    name: "singleActor",
    initialState: {},
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchActorById.fulfilled, (state,action) => {
            return action.payload
        })
    }
})

export default singleActorSlice.reducer;