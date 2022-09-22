import { useEffect, useState } from "react";
import "./NewUserForm.css"


export const SignBackground = () => {
const [zodiacSigns, setZodiacSigns] = useState([])
const [userInfo, setUserInfo] = useState([])

const localEnchantedUser = localStorage.getItem("enchanted_user")
const enchantedUserObject = JSON.parse(localEnchantedUser)

useEffect(
  () => {
    fetch(`http://localhost:8088/userInfos?userId=${enchantedUserObject.id}`)
  .then(response => response.json())
  .then((data) =>{
        setUserInfo(data[0])
  })
  fetch(`http://localhost:8088/zodiacSigns`)
  .then(response => response.json())
  .then((zodiacArray) =>{
        setZodiacSigns(zodiacArray)
      
   })},
  []
  )
 
const filteredSign = zodiacSigns.length > 0 && zodiacSigns.filter(sign => sign.id === userInfo.signId)[0]
return (
      <img className="chronicle_image" src={filteredSign.image}
      />
  );
  }