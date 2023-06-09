
import { useParams } from "react-router-dom";
import { DotSpinner } from '@uiball/loaders'
import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { v4 as uuidv4 } from "uuid";

const Restaurant = () => {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [menu, setMenu] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
 
    fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
      .then((response) => response.json())
      .then((data) => 
      setMenu(data));
  }, [slug, setMenu]);

  useEffect(() => {
    fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
      .then((response) => response.json())
      .then((data) => 
      setRestaurant(data));
  }, [slug, setRestaurant]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (event, item) => {
    event.preventDefault();
    const order = {
      id: uuidv4(),
      image: item.image,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: 1,
      place: restaurant.name,
      restaurantId: item.restaurantId,
      itemsId: item.id
    };
  

    //не работает, непонятно что не так
    if (cartItems.length > 0 && cartItems[0].restaurantId !== order.restaurantId) {
      const clear = window.confirm(
        "Нужно освободить корзину для нового заказа. Хотите продолжить?"
      );
  
      if (clear) {
        setCartItems([order]);
      }
    } else {
      setCartItems(prevItems => [...prevItems, order]);
    }
  };


  const handleIncrementQuantity = (event, itemId) => {
    event.preventDefault();
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.itemsId === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const handleDecrementQuantity = (event, itemId) => {
    event.preventDefault();
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.itemsId === itemId) {
          const newQuantity = item.quantity - 1;
          if (newQuantity < 1) {
            return null;
          } else {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      }).filter(Boolean)
    );
  };


  return (
   
    
    
    <div>
      
     {/*  {restaurant.length === 0 && (
    <div className="flex text-center item-center bg-orange-950">
                    <DotSpinner size={80} speed={0.9} color="black" />
                    </div>
                )} */}

      <div className="bg-orange-950/50">
        <div className="max-w-5xl m-0 m-auto flex text-center">
          <div className="w-11/12 mt-10 mb-10 bg-slate-100/50 rounded-3xl pr-16 pl-16 pt-10 pb-10">
            <h1 className="font-semibold text-[#70babb] mt-5 mb-5 text-4xl">
              {restaurant.name}
            </h1>
            <p className="text-gray-900">{restaurant.description}</p>

            <div className="flex grid grid-cols-3 m-0 m-auto">
              <div className="flex m-0 m-auto mt-5 mb-1 text-gray-900 hover:text-orange-700 duration-100 cursor-pointer active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>{" "}
                {restaurant.address}
              </div>
              <div className="flex m-0 m-auto mt-5 mb-1 text-gray-900 hover:text-orange-700 duration-100 cursor-pointer active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>{" "}
                {restaurant.phone}
              </div>
              <div className="flex m-0 m-auto mt-5 mb-1 text-gray-900 hover:text-orange-700 duration-100 cursor-pointer active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>{" "}
                {restaurant.email}
              </div>
            </div>
          </div>
        </div>
      </div> 


      <div className="font-semibold text-[#70babb] mt-16 mb-16 text-4xl text-center">
        Блюда для Вас
      </div>

      <div className="m-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {menu.map(item => (
            <div
              key={item.id}
              className="flex flex-col bg-slate-100/50 text-center rounded-3xl shadow-sm hover:shadow"
            >
              <div className="relative w-full h-72">
                <img
                  src={item.image}
                  className="object-cover w-full h-full rounded-t-3xl"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between flex-grow p-6">
                <div className="grid auto-cols-auto flex-grow">
                  <div className="flex flex-col">
                    <div className="text-2xl font-semibold p-2">{item.name}</div>
                    <div className="text-sm text-gray-900 flex-grow">{item.description}</div>
                    <div className="mt-4 mb-4 text-md font-bold text-3xl">{item.price} ₽</div>
                  </div>
                </div>

                {cartItems.some(cartItem => cartItem.itemsId === item.id) ? (
                  <div className="flex flex-row items-center justify-center mt-8">
                    <button
                      onClick={event => handleDecrementQuantity(event, item.id)}
                      className="m-2 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <p className="font-semibold p-1 m-2 text-2xl">
                      {cartItems.find(cartItem => cartItem.itemsId === item.id).quantity}
                    </p>
                    <button
                      onClick={event => handleIncrementQuantity(event, item.id)}
                      className="m-2 p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Button title="В корзину" handleClick={event => handleAddToCart(event, item)} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>


  </div>
  );
};

export default Restaurant;
