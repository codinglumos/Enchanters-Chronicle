import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewUserForm.css"


export const SignBackground = () => {
const [zodiacSigns, setZodiacSigns] = useState([])
const [userInfo, setUserInfo] = useState([])
const [user, setUser] = useState([])
const {id} = useParams()

// const localEnchantedUser = localStorage.getItem("enchanted_user")
// const enchantedUserObject = JSON.parse(localEnchantedUser)

useEffect(
  () => {
    fetch(`http://localhost:8088/userInfos?userId=${id}`)
  .then(response => response.json())
  .then((data) =>{
        setUserInfo(data[0])
  })
  fetch(`http://localhost:8088/zodiacSigns?userId=${id}`)
  .then(response => response.json())
  .then((zodiacArray) =>{
        setZodiacSigns(zodiacArray)
  })    
  fetch(`http://localhost:8088/users/${id}`)
  .then(response => response.json())
  .then((userArray) =>{
        setUser(userArray)
   })},
  []
  )
 
// const filteredSign = zodiacSigns.length > 0 && zodiacSigns.filter(sign => sign.id === userInfo.signId)[0]
return (
     <img className="chronicle_image" src={user?.userInfo?.zodiacSign?.image}
      />
  );
  }