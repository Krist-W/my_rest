import { useEffect, useState } from "react";
import Button from "components/Button";
import { useParams } from "react-router-dom";

const RestMenu = () => {
  const { slug } = useParams();
  const [menu, setMenu] = useState([]);
  
  const [count, setCount] = useState(1);

 
  useEffect(() => {
    fetch(
      `https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`
    )
      .then((response) => response.json())
      .then((date) => setMenu(date));
  }, [slug]);

  function plus(id) {
    setMenu(menu.filter((item) => item.id !== id));
    if (count < 50) {
      setCount(count + 1);
    } else {
      return;
    }
  }

  function minus(id) {
    setMenu(menu.filter((item) => item.id !== id));
    if (count > 0) {
      setCount(count - 1);
    } else {
      return;
    }
  }
  return (
    <>
      <div className="font-semibold text-[#70babb] mt-16 mb-16 text-4xl text-center">
        Блюда для Вас
      </div>

      <div className="m-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {menu.map((items) => (
            <div
              key={items.id}
              className="flex flex-col bg-slate-100/50 text-center rounded-3xl shadow-sm hover:shadow"
            >
              <div className="relative w-full h-72">
                <img
                  src={items.image}
                  className="object-cover w-full h-full rounded-t-3xl"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between flex-grow p-6">
                <div className="grid auto-cols-auto flex-grow">
                  <div className="flex flex-col">
                    <div className="text-2xl font-semibold p-2">
                      {items.name}
                    </div>
                    <div className="text-sm text-gray-900 flex-grow">
                      {items.description}
                    </div>
                    <div className="mt-4 mb-4 text-md font-bold text-3xl">
                      {items.price} ₽
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between mt-8">
                  <div className="flex flex-row">
                    <button onClick={minus} className="m-2 p-1 font-bold">
                      -
                    </button>
                    <p className="p-1 m-2">{count} шт.</p>
                    <button onClick={plus} className="m-2 p-2 font-bold">
                      +
                    </button>
                  </div>
                  <p className="p-5">Сумма {count * items.price} ₽</p>
                  <div>
                    <Button title="В корзину" />
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </>
  );
};

export default RestMenu;
