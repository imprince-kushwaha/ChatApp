import React from 'react'
import { PiUserCircleLight } from "react-icons/pi";
import { useSelector } from 'react-redux';


const ProfileInfo = ({userId,name,imageUrl,width,height}) => {
    const onlineUser=useSelector(state=>state?.user?.onlineUser)


    let avatarName=""
    if(name){
        const splitName=name?.split(" ")
        if(splitName.length>1){
            avatarName=splitName[0][0]+splitName[1][0]
        }else{
            avatarName=splitName[0][0]

        }
    }
    const bgColorDp=[
        'bg-slate-200',
        'bg-red-200',
        'bg-teal-200',
        'bg-purple-200',
        'bg-green-200',
        'bg-sky-200',
        'bg-yellow-200',
        'bg-gray-200',
        'bg-blue-200',
        'bg-cyan-200',
    ]
    const randomnumber=Math.floor(Math.random()*10)
    // console.log(randomnumber)
    const isOnline=onlineUser.includes(userId) //if online then return true else false
  return (
    <div className='text-slate-700 rounded-full font-bold relative'>
      {
        imageUrl?(
            <img src={imageUrl} width={width} height={height} alt={name}/>
        ):name?(
            <div className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColorDp[randomnumber]}`} style={{width:width+"px", height:height+"px"}}>
                {avatarName}
            </div>
        ):(
            <PiUserCircleLight size={width} />
        )
      }
      {
        isOnline&&(
            <div className='bg-green-700 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>
        )
      }
    </div>
  )
}

export default ProfileInfo
