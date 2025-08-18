// import { useEffect, useState } from "react"
// import { db, collection, query, where} from "../../firebase/firebase";
// import { onSnapshot } from "firebase/firestore";
// import {  useNavigate } from "react-router-dom";
// import useUsername from "../../hooks/useUsername";
// const waitingroom = () => {
//   const {username}=useUsername()
//   const navigate=useNavigate()
//   const [roomCode,setRoomCode]=useState<string>('')
//   const [secondUser,setSecondUser]=useState<string>('')

//   useEffect(()=>{
//   const saved1=localStorage.getItem('Roomcode')
//   if(saved1){
//     setRoomCode(saved1)
//   }else{
//     navigate('/livesettings')
//   }
//   },[])
  


//   ///FIREBASE CHECKING IF USER TWO HAS JOINED
//   useEffect(()=>{
//     if(!roomCode)return ;
//     console.log(roomCode)
//     const usersRef = collection(db, "Rooms");
//     const q = query(usersRef, where("roomCode", "==",parseInt(roomCode) ));

//     const unsubscribe=onSnapshot(q,(querySnapshot)=>{
//       if(querySnapshot.empty){
//         console.log('not found')
//  }
//       querySnapshot.forEach((doc)=>{
//         const data=doc.data(); 
// console.log(doc)
//         if(data.userTwoOnline===true){
//           setSecondUser(data.userTwoName)
//           setTimeout(()=>{
//             navigate('/liveoquiz')
//           },1000)
//           // alert('success')
//         }else{
//           console.log(data)
//           console.log(secondUser)

//         }
//       })
//     })

//     return ()=>unsubscribe()
//   },[roomCode,navigate])



//   return (
//     <>
//     <section className="fixed inset-0 bg-[#121212] z-50 text-green-300">

//         <div className='absolute top-[45%] left-[50%] transform rounded-[7px] -translate-x-[50%] w-full'>
//     <h3 className="text-center pb-5 text-[18px] mr-4">Room Code: {roomCode}</h3>

//             <h3 className='text-white text-[16px] w-[100%] text-center pb-4'>Waiting For Opponent To Join....</h3>
//             <div className="flex justify-center items-center flex-col  py-2 md:flex-row">

//               <h3 className="text-xl md:mx-1.5">{ username}  </h3>
//               <h3 className="text-xl md:mx-1.5 pr-3">vs</h3>
//               {/* <h3 className="text-xl md:mx-1.5">Loading....{secondUser}</h3> */}
//               <div className="flex items-baseline  space-x-2 mb-3">
//         <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//         <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//         <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
//       </div>
//             </div>

// <div className="flex items-center justify-center pt-4">
//   <div className="w-9 h-9 border-4 border-[#00ff80c4] border-dashed border-t-transparent rounded-full animate-spin"></div>
// </div>
//         </div>

//     </section>
    
//     </>
//   )
// }

// export default waitingroom




import { useEffect, useState } from "react"
import { db, collection, query, where} from "../../firebase/firebase";
import { onSnapshot } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";
import useUsername from "../../hooks/useUsername";
const waitingroom = () => {
  const {username}=useUsername()
  const navigate=useNavigate()
  const [roomCode,setRoomCode]=useState<string>('')
  const [secondUser,setSecondUser]=useState<string>('')

  useEffect(()=>{
    const saved1=localStorage.getItem('Roomcode')
    if(saved1){
      setRoomCode(saved1)
    }else{
      navigate('/livesettings')
    }
    },[])


  ///FIREBASE CHECKING IF USER TWO HAS JOINED
  useEffect(()=>{
    if(!roomCode)  return ;
    console.log(roomCode)
    const usersRef = collection(db, "Rooms");
    const q = query(usersRef, where("roomCode", "==",parseInt(roomCode) ));

    const unsubscribe=onSnapshot(q,(querySnapshot)=>{
      if(querySnapshot.empty){
        console.log('not found')
 }
      querySnapshot.forEach((doc)=>{
        const data=doc.data(); 
        // if(data.userTwoName!==''){
          if(true){
          setSecondUser(data.userTwoName)
          setTimeout(()=>{
            navigate(`/pvp/${parseInt(roomCode)}`)
          },1000)
        }else{
          // console.log(data)
          // console.log(secondUser)

        }
      })
    })

    return ()=>unsubscribe()
  },[roomCode,navigate])



  return (
    <>
    <section className="fixed inset-0 bg-[#121212] z-50 text-green-300">

        <div className='absolute top-[45%] left-[50%] transform rounded-[7px] -translate-x-[50%] w-full'>
    <h3 className="text-center pb-5 text-[18px] mr-4">Room Code: {roomCode}</h3>

            <h3 className='text-white text-[16px] w-[100%] text-center pb-4'>Waiting For Opponent To Join....</h3>
            <div className="flex justify-center items-center flex-col  py-2 md:flex-row">

              <h3 className="text-xl md:mx-1.5">{ username}  </h3>
              <h3 className="text-xl md:mx-1.5 pr-3">vs</h3>
              <h3 className="text-xl md:mx-1.5">Loading....{secondUser}</h3>
              <div className="flex items-baseline  space-x-2 mb-3">
        <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
      </div>
            </div>

<div className="flex items-center justify-center pt-4">
  <div className="w-9 h-9 border-4 border-[#00ff80c4] border-dashed border-t-transparent rounded-full animate-spin"></div>
</div>
        </div>

    </section>
    
    </>
  )
}

export default waitingroom