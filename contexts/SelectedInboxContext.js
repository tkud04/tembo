import React,{createContext} from 'react';
const SelectedInboxContext = createContext({});
export const SelectedInboxProvider = SelectedInboxContext.Provider;
export default SelectedInboxContext;