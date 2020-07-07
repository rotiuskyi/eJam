import 'semantic-ui-css/semantic.min.css'
import './App.css'
import 'whatwg-fetch'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import Deployments from 'components/Deployments'

const App = () => {
  return (
    <Provider store={store}>
      <Deployments />
    </Provider>
  )
}

render(<App />, document.getElementById('app'))
