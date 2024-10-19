import {createAction, createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL, config } from "../../../utils/BaseUrl" 

const redirectRegister = createAction("redirect/register")
const redirectLogin = createAction("redirect/login")
const redirectLogout = createAction("redirect/logout")

export const registerUserAction = createAsyncThunk("register/user",async(user,{rejectWithValue, getState, dispatch})=>{
    try {
        const {data} =await axios.post(`${baseURL}/api/users/register`, user, config);

        localStorage.setItem ("userInfo",JSON.stringify(data.createdUser));
        localStorage.setItem("token",JSON.stringify(data.token));

        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }


});
// login user action
export const loginUserAction = createAsyncThunk("login/user",
async(user, {rejectWithValue, getState, dispatch})=>{
const userFromState =getState()?.user?.userAuth;
try {
    const {data} =await axios.post(`${baseURL}/api/users/login`, user, config);
    
    // store user to the browser memory
        localStorage.setItem ("userInfo",JSON.stringify(data.user));
        localStorage.setItem("token",JSON.stringify(data.token));

        // return the data to the frontend
return data;
} catch (error) {
    if(!error?.response){
        throw error;
    }
    return rejectWithValue(error?.response?.data);
}
}
);
// logout action
 
export const logoutAction = createAsyncThunk('logout/user',async(payload,{rejectWithValue, getState, dispatch})=>{
    try {
        localStorage.removeItem("userinfo");
        localStorage.removeItem("token");


        dispatch(redirectLogout());
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})


let userAuth;
const userInfoToStr =localStorage.getItem("UserInfo")
if(userInfoToStr && userInfoToStr !== "undefined"){
    try {
        userAuth =JSON.parse(userInfoToStr)
    } catch (error) {
        console.error("Failed to parese userifo from local store",error)
        userAuth =null
        
    }
} else{
    userAuth =null
}

const userSlice =createSlice({
    name: "users",
    initialState:{
        user: userAuth,
    },
    extraReducers: (builder)=>{
        // register a user
        builder.addCase(redirectRegister, (state,action)=>{
            state.redirectRegister =true;
        })
        builder.addCase(registerUserAction.pending, (state, action)=>{
            state.loading =true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action)=>{
            state.loading =false;
            state.redirectRegister =false;
            state.user = action?.payload?.createdUser;
            state.serverErr = undefined;
            state.apperr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action)=>{
            state.loading =false;
            state.serverErr = action?.payload?.message;
            state.appErr = action?.payload?.message;
        });

        // login a user
        builder.addCase(redirectLogin, (state, action)=>{
            state.redirectLogin =true;
        })
        builder.addCase(loginUserAction.pending, (state, action)=>{
            state.loading =true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.redirectLogin = false;
            state. loggedInUser = action?.payload?.user;
            state.user = action?.payload?.user;
            state.serverErr = undefined;
            state.appErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action)=>{
            state.loading =false;
            state.serverErr = action?.payload?.message;
            state.appErr = action?.payload?.message;
        });
        //logout action
        builder.addCase(redirectLogout, (state, action)=>{
            state.redirectLogout =true;
        })
        builder.addCase(logoutAction.pending, (state, action)=>{
            state.loading =true;
        });
        builder.addCase(logoutAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.redirectLogout = false;
            state.user = null;
            state.serverErr = undefined;
            state.appErr = undefined;
        });
        builder.addCase(logoutAction.rejected, (state, action)=>{
            state.loading =false;
            state.serverErr = action?.payload?.message;
            state.appErr = action?.payload?.message;
        });


    },
});

export default userSlice.reducer;