import React from 'react'
import './App.css'
import { DataActionsContext } from './context'
import { ServicesItems } from './services'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  // Link
} from 'react-router-dom'

import Home from './pages/Home'
import QRgen from './pages/QRgenerator'
//import QRscan from './pages/QRscanner'
import { ThemeA, ThemeB, ThemeC } from './components/templates'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/qr-generator">
            <QRgen />
          </Route>
          <Route path="/:id" children={<Child />} />
          {/* <Route path="/qr_scanner">
                <QRscan/>
              </Route> */}
        </Switch>
      </Router>
    </div>
  )
}

function Child() {
  const services = new ServicesItems()
  const contextData = React.useContext(DataActionsContext)

  let { id } = useParams()

  React.useEffect(() => {
    //get items
    try {
      services
        .getItems()
        .then((res) => {
          contextData.setGetItems(res.data)
        })
        .catch((error) => {
          console.log('getItems', error)
        })
    } catch (error) {
      console.log('getItems', error)
    }
  }, [])

  return (
    <>
      {/* <p>ID: {id}</p> */}

      {contextData.getitems &&
        contextData.getitems.map((item, index) => (
          <>
            {id === item.name ? (
              <div className="content-title">
                {item.template === 'a' ? (
                  <ThemeA message={item.message} name={item.name} />
                ) : item.template === 'b' ? (
                  <ThemeB message={item.message} name={item.name} />
                ) : (
                  <ThemeC message={item.message} name={item.name} />
                )}
              </div>
            ) : null}
          </>
        ))}
    </>
  )
}

export default App
