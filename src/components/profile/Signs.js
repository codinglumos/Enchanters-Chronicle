import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewUserForm.css"


export const SignBackground = () => {
const [zodiacSigns, setZodiacSigns] = useState([])
const [userInfo, setUserInfo] = useState([])
const [userImage, setUserImage] = useState([])
//const {id} = useParams()

const localEnchantedUser = localStorage.getItem("enchanted_user")
const enchantedUserObject = JSON.parse(localEnchantedUser)

useEffect(
  () => {
    fetch(`http://localhost:8088/userInfos?userId=${enchantedUserObject.id}`)
  .then(response => response.json())
  .then((data) =>{
        setUserInfo(data[0])
fetch(`http://localhost:8088/zodiacSigns?userId=${enchantedUserObject.id}`)
.then(response => response.json())
.then((zodiacArray) =>{
      setZodiacSigns(zodiacArray)
      const filteredSign = zodiacArray.length > 0 && zodiacArray.filter(sign => sign.id === data[0].signId)[0]
      //console.log(filteredSign, zodiacArray)

      setUserImage(filteredSign.image)
  })
  
  })    
},
  []
  )
 

//console.log(filteredSign)
return (
     <img className="chronicle_image" src={userImage}
      />
  );
  }