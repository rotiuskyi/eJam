import 'semantic-ui-css/semantic.min.css'
import './App.css'
import 'whatwg-fetch'

import { render } from 'react-dom'
import Deployments from 'components/Deployments'

const App = () => {
  return <Deployments />
}

render(<App />, document.getElementById('app'))
