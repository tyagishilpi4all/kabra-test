import { BrowserRouter as Router } from 'react-router-dom';
import RootRouting from "./Routing/RootRouting";
import { Provider } from 'react-redux';
import makeStore from "./Store/index.store";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const store = makeStore();

const App = () => {

  return (
    <Provider store={store}>
      <Router>
         <RootRouting />
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
