import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
import Tour from './Tour';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'


function App() {

  const [loading, setLoading]=useState(true);
  const [tours, setTours]=useState([]);

  const removeTour = (id)=>{
    const newTours=tours.filter((tour)=> tour.id!==id);
    setTours(newTours);
  }


  const fetchTours = async ()=>{     //----> Bu kısmı araştır tam olarak fetch nedir ve response.json
    setLoading(true)

    try {       //------> in case of any error in fetching
      const response = await fetch(url);
    const tours= await response.json();
    setLoading(false);
    setTours(tours)
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    
    
  }
      
  useEffect(()=>{   //-----> fetchTours ile ne yapıyor ? ve useEffect araştır
    fetchTours();
  },[]);

  if (loading) {
    return(<main> <Loading /></main>
     );
    
  }

  if(tours.length ==0){
    return <main>
      <div className='title'>
      <h2> No tours left</h2>
      <button className='btn' onClick={()=> fetchTours()}>refresh</button>
      </div>

    </main>
  }

  return (<main>
    <Tours  tours={tours} removeTour={removeTour}/>
  </main>)
}

export default App
