import React, { useState, useEffect } from "react";
import swal from 'sweetalert'
import "antd/dist/reset.css";
import { Form, Input } from "antd";
import Button from "components/Button";



const Cart = () => {


  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  
  async function order(event) {
    event.preventDefault();
    const params = {
      customerName: customerName,
      phone: phone,
      email: email,
      restaurantId: items[0].restaurantId,
      cartItems: items,
      
    };

  
  
    let response = await fetch("https://www.bit-by-bit.ru/api/student-projects/restaurants/order", {
      method: "POST",
      body: JSON.stringify(params),
    });
  
    try {
      let date = await response.json();
  
      if (date) {
        swal("Спасибо!", "Ваша заявка принята!", "success");
      }
    } catch (error) {
      swal("Произошла ошибка!", "Попробуйте снова", "error");
    }
  }
  
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: "Поле ${label} не заполнено!",
  };
  /* eslint-enable no-template-curly-in-string */
  
  const onFinish = (value) => {
    console.log(value);
  };

  useEffect(() => {
    const saveBasket = localStorage.getItem("cartItems");
    if (saveBasket) {
      setItems(JSON.parse(saveBasket));
    }
  }, []);

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.itemsId !== id));
    if (items) {
      const basketJson = JSON.stringify(items);
      localStorage.setItem("cartItems", basketJson);

    }
  };
// не сохраняются изменения в корзине
  const result = items.reduce(
    (prev, current) => prev + parseInt(current.quantity) * parseInt(current.price),
    0
  );
  
// сделать, чтобы после запятой было 2 знака. пока не понятно как

  return (
   
    <div className="max-w-screen-md mx-auto mb-10">
      <h1 className="text-5xl font-semibold py-10 text-center text-[#70BABB]">
        Корзина
      </h1>
      {items.length === 0 && (
        <div className="text-center text-xl mt-10 text-gray-700">
          Вы пока ничего не добавили в корзину
        </div>
      )}
      {items.map((item) => (
        
        <div
          key={item.itemsId}
          className="flex items-center px-6 py-4 gap-4"
        >
          <div className="flex justify-start items-center gap-8 w-3/5">
            <img
              className="w-1/6 rounded-5xl object-center object-cover"
              src={item.image}
              alt=""
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </div>
          <div className="flex justify-between items-center gap-8">
            <p className="text-lg">{item.price} ₽</p>
            <p>x</p>
            <input
              name="count"
              min="1"
              className="border border-solid text-center border-gray-700 rounded p-1 w-1/12"
              value={item.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                if (!isNaN(newQuantity) && newQuantity >= 1) {
                  setItems((prevItems) =>
                    prevItems.map((prevItem) =>
                      prevItem.itemsId === item.itemsId
                        ? { ...prevItem, quantity: newQuantity }
                        : prevItem
                    )
                  );
                }
              }}
            />
            <p className="text-xl font-bold text-gray-700">
              {(item.quantity * item.price).toFixed(2)} ₽
            </p>
            <button onClick={() => deleteItem(item.itemsId)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <>
       <div className="flex justify-end text-gray-700 gap-8 p-4 text-lg font-semibold">
  <p>Сумма заказа:</p>
  <p>{result} ₽</p>
  {/* flex items-center shadow-xl px-6 py-4 rounded-2xl gap-4 тень и закругление на блок заказа добавить */}
  </div>
  <div>

    <h2 className="text-center mt-10 mb-10">
      Введите ваши данные для оформления заказа:
    </h2>
 
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >

      <Form.Item
        name="customerName"
        onChange={(e) => setCustomerName(e.target.value)}
        value={customerName}
        placeholder="Напишите ваше ФИО" // placeholder почему-то не работает, разобраться
        label="ФИО"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        label="Номер телефона"
        rules={[
          { required: true, message: "Пожалуйста, введите ваш телефон!" },
        ]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        value={email}
        rules={[
          {
            type: "email",
            message: "Не верно заполнено поле E-mail!",
          },
          {
            required: true,
            message: "Пожалуйста, введите ваш E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="comment"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        label="Комментарий"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >

 <div className="flex">
      <Button htmlType="submit" type="submit" handleClick={order} title="Оформить заказ" />
    </div>
      
      </Form.Item>
    </Form>

    </div>

</>
      )}
   
   </div>
   
  );
};

export default Cart;
