import { configureStore } from "@reduxjs/toolkit";

import registrationSlice from "@/store/reducers/registration";

export default configureStore({
  reducer: {
    registration: registrationSlice
  }
});