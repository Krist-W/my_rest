import { useState} from "react";
import { Link } from "react-router-dom";

function Home() {

    const [ restaurant, setRestaurant ] = useState([])

        async function showRestaurant() {
                const responce = await fetch("https://www.bit-by-bit.ru/api/student-projects/restaurants")
                const restaurants = await responce.json() 
                setRestaurant(restaurants)
            }
        
    showRestaurant()

    return (
        <div className="max-w-screen-lg m-auto" >
           
            <h1 className="font-semibold text-center text-[#70BABB] mb-20 text-5xl">Рестораны</h1>

            <div className="grid px-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14" >
                {restaurant.length > 0 && restaurant.map((item) => {
                    return (
                        <Link to={`/restaurants/${item.slug}`} class="group relative block bg-white h-72 rounded-3xl">
                            <img
                                alt=""
                                src={item.image}
                                className="absolute rounded-3xl inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-20"
                            />

                            <div className="relative p-10">
                                <p className="text-xl font-bold text-gray-700 bg-slate-100/70 pl-2 pr-2 rounded-full w-full">{item.name}</p>
                        
                                <div className="mt-24 ml-5">
                                    <div className="flex flex-col bg-orange-100/50 rounded-full translate-y-6 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                    <p className="text-lg font-semibold text-center text-[#70BABB] pl-2 pr-2">Кухня: {item.cuisine}</p>
                                      
                                        </div>
                                    </div>
                                </div>
                          
                        </Link>
                    )
                })}
            </div> 
       </div>
    )
}

export default Home