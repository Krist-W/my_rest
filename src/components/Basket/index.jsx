import { useState, useEffect } from "react";
import Button from "components/Button";

const Basket = () => {
  const [items, setItems] = useState([]);
  // const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    const saveBasket = localStorage.getItem("items");
    if (saveBasket) {
      setItems(JSON.parse(saveBasket));
    }
  }, []);

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (items) {
      const basketJson = JSON.stringify(items);
      localStorage.setItem("items", basketJson);
    }
  };

  const result = items.reduce(
    (prev, current) => prev + parseInt(current.value) * parseInt(current.price),
    0
  );
  const totalResult = items.reduce(
    (prev, current) => prev + parseInt(current.price),
    0
  );

  return (
    <div className="max-w-screen-md mx-auto mb-10">
      <h1 className="text-5xl font-semibold py-10 text-center text-[#70BABB]">
        Корзина
      </h1>
      <p className="text-3xl font-semibold text-gray-700">
        Ваш заказ из ресторана: {items.place}
      </p>
      {items.length === 0 && (
        <div className="text-center text-xl mt-10 text-gray-700">
          Вы пока ничего не добавили в корзину
        </div>
      )}
      {items.map((order) => (
        <div
          key={order.id}
          className="flex items-center shadow-xl px-6 py-4 rounded-2xl gap-4 "
        >
          <div className="flex justify-start items-center gap-8 w-3/5">
            <img
              className="w-1/6  rounded-5xl object-center object-cover"
              src={order.image}
              alt=""
            ></img>
            <h3 className="text-lg font-semibold">{order.name}</h3>
          </div>
          <div className="flex justify-between items-center gap-8 ">
            <p className="text-lg">{order.price} ₽</p>
            <p>x</p>
            <input
              name="count"
              min="1"
              className="border border-solid text-center border-gray-700 rounded p-1 w-1/12"
            ></input>
            {/* <p>=</p> */}
            <p className="text-xl font-bold text-gray-700"> {result} ₽ </p>
            <button title onClick={() => deleteItem(order.id)}>
              Удалить из корзины
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end shadow-md text-gray-700 rounded-5xl gap-8 p-4 text-lg font-semibold">
        <p>Сумма заказа:</p>
        {/* <p>{items.length} позиций</p> */}
        <p>{totalResult} ₽</p>
      </div>
      {/* <Link to={`/форма заказа`} className=""> */}
      <div className="mt-10 m-0 m-auto">
        <Button title="Оформить заказ" />
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Basket;
