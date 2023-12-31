
import search from "../../assets/icons/search.svg";
import Card from "../UI/Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";

import regions from "../db/regions";

const baseURL = "https://restcountries.com/v2";


const Main = () => {
    
 
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false)
    

    async function fetchCountries(){
        setLoading(true);
        try {
          const response = await axios.get(`${baseURL}/all`);
          setCountry(response.data);
          setLoading(false)
        } catch (err) {
          setErrorMsg(err.message);
          setLoading(false);
        } 
    };

    useEffect(() => {
        fetchCountries();
    }, [])

    async function searchCountry(text) {
        try {
          const response = await axios.get(`${baseURL}/name/${text}`);
          setCountry(response.data);
          if(!response.data.length){
            fetchCountries()
          }
        } catch (err) {
          setErrorMsg(err.message);
        }
    }

   
    
let searchTimeout;

function handleSearchKeyUp() {
    clearTimeout(searchTimeout); 
    searchTimeout = setTimeout(searchCountry, 300); 
}

    
    return (
        <section className="pt-[48px]">
            <div className="container mx-auto px-5">
                <div className="flex items-center justify-between mb-[48px]">
                    <form  autoComplete="off" className="w-[480px] bg-white py-[19px] px-9 rounded-md flex gap-x-6 shadow-md">
                        <img src={search} alt="search" />
                        <input  onChange={(e) => searchCountry(e.target.value)} onKeyUp={handleSearchKeyUp} className="outline-none w-full text-[14px] text-[#848484]" type="text" placeholder="Search for a country…" />
                    </form>

               
                   
                </div>

                <div className="grid grid-cols-4 gap-y-[67px]">
                   
                    {   country.length > 0 ?
                        country.map((item, index) => {
                        
                            return <Card key={index} state={item}/>
                        }) : null
                    }

                    {
                        errorMsg ? (
                            <div>
                                {/* <h3>{errorMsg}</h3> */}
                            </div>)
                        :null
                    }

                    
                </div>
            </div>
        </section>
    );
};

export default Main;