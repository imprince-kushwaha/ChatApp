import React from 'react'
import { PiUserCircleLight } from "react-icons/pi";


const ProfileInfo = ({userId,name,imageUrl,width,height}) => {
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
  return (
    <div className='text-slate-700 overflow-hidden rounded-full font-bold '>
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
    </div>
  )
}

export default ProfileInfo
