import React,{useState,useEffect} from 'react'
import {baseURL,apiKey} from '../../util/apiCalls';
import axios from 'axios';
import '../Home/Home.style.css';
import GifItem from '../../components/GifItem/GifItem';
import Loader from "react-loader-spinner";



export default function Home() {
    const [gifsData, setGifsData] = useState([]);
    const [pagination, setPagination] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [loadingMain, setLoadingMain] = useState(false);
    const [showMoreToggle, setShowMoreToggle] = useState(true);


   

    useEffect( () => {
        setLoadingMain(true);
        axios.get(baseURL+'/gifs/trending?limit=25&api_key='+apiKey)
        .then( response=> {
            setGifsData(response.data.data);
            setTotalCount(response.data.pagination.total_count);
            // if total count is equal to length of response array than dont show the show more button

            if(response.data.data.length ==response.data.pagination.total_count) {
                setShowMoreToggle(false);
            }
            setLoadingMain(false);

        })
        .catch(error=>{
          // handle error
          console.log(error);
        });
      

         
      },[]);

// acting as  componentDidUpdate for pagination
      useEffect( () => {
      console.log(pagination);
      // preventing API call on first render
if(pagination !==0) {
    setLoading(true);
      axios.get(baseURL+`/gifs/trending?offset=${pagination}&limit=25&api_key=`+apiKey)
      .then( response=> {
        const paginatedData = [...gifsData,...response.data.data];
        setGifsData(paginatedData);
        setLoading(false);
        console.log();

      })
      .catch(error=>{
        // handle error
        console.log(error);
      });
    }
  


         
      },[pagination]);

      console.log(gifsData);

    const   showMoreFunc=()=> {
        if(gifsData.length !=totalCount ) {
            console.log(gifsData.length);
             let pag=pagination+25;
        
            setPagination(pag);
         } else {
 
             setShowMoreToggle(false);
         }
  

      }
    return (
        <React.Fragment>
            {loadingMain ? <div className="text-center"> <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div>: <div className="container">
            <h4 className="text-white">Trending gifs count : {totalCount} </h4>

            <div className='row'>
            {  gifsData?.map((data,index)=> {
                 
                return <GifItem key={index} Url={data.images.fixed_height.webp} Url_still={data.images.original_still.url}/>
            })}
          
        </div>
        <div className='text-center mt-5'>
            {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />:<button className='customBtn' onClick={()=>showMoreFunc()}>show more</button>}
        
        </div>
        </div>}
           
        
        
        </React.Fragment>
    )
}
