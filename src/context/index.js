import React from "react";

export const DataActionsContext = React.createContext();


const DataActionsContextTag = ({ children }) => {
  const [ getitems, setGetItems ] = React.useState([]);
  const [ items, setItems ] = React.useState(null);
  

  
  return (
    <DataActionsContext.Provider value={ { items, setItems, getitems, setGetItems }}>
      {children}
    </DataActionsContext.Provider>
  );
};

export default DataActionsContextTag;
