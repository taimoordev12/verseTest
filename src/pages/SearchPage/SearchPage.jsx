import React,{useState,useEffect} from 'react'
import axios from 'axios';
import GifItem from '../../components/GifItem/GifItem';
import Loader from "react-loader-spinner";

 import {baseURL,apiKey} from '../../util/apiCalls';


export default function SearchPage(props) {
    const [gifsData, setGifsData] = useState([]);
    const [pagination, setPagination] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [showMoreToggle, setShowMoreToggle] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingMain, setLoadingMain] = useState(false);



     

    useEffect( () => {
        setLoadingMain(true);

        axios.get(baseURL+`/gifs/search?q=${props.match.params.searchText}&limit=25&api_key=`+apiKey)
        .then( response=> {
            console.log(response);
            setGifsData(response.data.data);
            setTotalCount(response.data.pagination.total_count);
            setLoadingMain(false);

            // if total count is equal to length of response array than dont show the show more button
 
            if(response.data.data.length ==response.data.pagination.total_count) {
                setShowMoreToggle(false);
            }
        })
        .catch(error=>{
          // handle error
          console.log(error);
        });
      

         
      },[props.match.params.searchText]);

 
       


      // acting as  componentDidUpdate for pagination
      useEffect( () => {
        if(pagination !==0) {
            setLoading(true);

     
  
        axios.get(baseURL+`/gifs/search?q=${props.match.params.searchText}&offset=${pagination}&limit=25&api_key=`+apiKey)
        .then( response=> {
          const paginatedData = [...gifsData,...response.data.data];
          setGifsData(paginatedData);
          setLoading(false);
  
        })
        .catch(error=>{
          // handle error
          console.log(error);
        });
        
    }
           
        },[pagination]);


        const   showMoreFunc=()=> {
         if(gifsData.length !=totalCount ) {
           console.log(gifsData.length);
            let pag=pagination+25;
       
           setPagination(pag);
        } else {

            setShowMoreToggle(false);
        }
           
      
    
          }



      console.log(showMoreToggle);
    return (
        <React.Fragment>
            {loadingMain ? <div className="text-center"> <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div>: <div className="container">
            <h4 className="text-white">search result : {props.match.params.searchText} </h4>
           <div className='row'>
              
            {  gifsData?.map((data,index)=> {

                return <GifItem key={index} Url={data.images.fixed_height.webp} Url_still={data.images.original_still.url}/>
            })}
          
        </div>
          <div className='text-center  mt-5'>
              {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />:          <button className='customBtn' onClick={()=>showMoreFunc()} style={{display:!showMoreToggle ?'none':''}}>show more</button>
}
          </div>
          </div>}
           
          </React.Fragment>
        
    )
}
