import json
import requests
params={
    "delivery_price":168,
    "amount":1,#это количество товара
    "shipping_method":11,#это метод доставки,который ты получаешь после отправки запроса на метод /proxy/getDeliveryMethods",сразу со входом пользователя на страницу
    "courierOrPvz":"Pvz",
    "country":"RU",
    "name":"Сергей",
    "surname":"Козлов",
    "otchestvo":"Андреевич",
    "email":"sergey070509242@gmail.com",
    "phone":"89671590833",
    "pvzID":104762,#это пвз айди,которое теперь возвращается из метода по поиску ближайших пвз
    "city":"Москва",
    "street":"тверская",
    "house":17,
    "kladr_id":"7700000000000",
    "apartments":12
}
URL="http://127.0.0.1:5000/proxy/addPackage/"+stringify(params)
URL=URL
request=requests.post(URL)
print(request.text)
# request=json.loads(request.text)
# print(request)