import './App.css';
import Home from './pages/Home/Home';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from './components/Header/Header';

import {
  Switch,
  Route,  } from "react-router-dom";
  import SearchPage from './pages/SearchPage/SearchPage';

function App() {

  return (
    <>
    <Header/>
    <Switch>
      
      <Route exact path="/" component={Home} />
         
      <Route exact path="/search/:searchText" component={SearchPage} />

   
  </Switch>
  </>

  );
}

export default App;
