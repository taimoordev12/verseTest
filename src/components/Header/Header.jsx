import React,{useState} from 'react'
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { useHistory,Link } from "react-router-dom";
import '../Header/Header.style.css';



export default function Header() {
    const history = useHistory();

    const [searchText, setSearchText] = useState('');

    const  HandleChange = event => {

        const {value} = event.target;
        setSearchText(value);
        console.log(searchText);
    }

   const handleSubmit = async e => {
       
       
       history.push(`/search/${searchText}`);


      
     }



    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
   
        handleSubmit();
      }
    };

    

    return (
        <div className='container'>
            <div className="topnav">
  <Link to="/"><img style={{width:'220px'}} src="https://uc826642597e6c365aeb8fa4b97a.previews.dropboxusercontent.com/p/thumb/ABPY4lzF11MA6sWSepWGAkou-42Rgl867m_GqolM_rpuGo9mt1P2fiiHbvp300AUVsjvKo1JYCjCJV8Fhn4vjKQdQ9vd2vY__TKy51ydavJ3oIQhfMz8BXlMrRI_bdcvZZrhXV1nKy0xpZennN8KIYyPip-D6Et7yhnQhEWWzLULTr0vNG9hekEt3dWEQ4F1sslFYVT7qx7ZKg_Xt7UHy7VpOWStKz2tpWVeon5nhsgNazZAzsD4O_Cpsp7qx6dOZd0MiL7yiyujNkTbrbAcNhYBz5DBshvBo2UnuUK2NwJvIm69AkyX7PRqatM4JE_E5M3qSIGAYeQcy22Zhwf3cVmbj7LdFKd5aK9LvHMLhv7YKQ/p.png?fv_content=true&size_mode=5" alt="" /></Link>
   
  <div className="search-container">
 
      <input  name="searchText" type="text" onChange={HandleChange} value={searchText}  onKeyPress={handleKeypress} placeholder="Search.."  />
      <button   onClick={()=>handleSubmit()} ><i className="fa fa-search text-white" /></button>
    
  </div>
</div>

          
        </div>
    )
}
