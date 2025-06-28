

import ImageComponent from './image'
import image1 from '../assets/images/5677990.png'
import image2 from '../assets/images/3407054.png'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const cardVariants={
    hidden:{opacity:0,y:50},
    visible:{opacity:1,y:0,transition:{
        delay:.2,
        duration:.9,ease:"easeInOut",
    }
    }
}
interface cardProps{
  heading:string;
  text:string;
  image:string;
  path:string;
}

const cardsObj:cardProps[]=[
  {
    heading:'SOLO MODE',
    text:'Participate in a variety of Javascript topics and compete against others in real-time and have some challenges at your own pace.',
    image:image1,
    path:'/settings'
  },
  {
    heading:'P V P',
    text:'Compete with other Javascript enthusiats in real-time! Our live quizzes will test yor skills and knowledge of javascript concepts,from basics to advanced topics.',
    image:image2,
    path:'/settings'
  },
  {
    heading:'LEADERBOARD',
    text:'Curious to see how you rank among other fellow developers of Javascript enthusiasts? Click to view the leaderboard and discover where you stand. You might be surprised at how close you are to the top spot!.',
    image:image1,
    path:'/leaderboard'
  }

]
// const cardVariantss={
//   animate:{
//     x:[0,-6,6,-6,6,0],
//     transition:{
//       delay:.2,
//       duration:1.5,
//       ease:"easeInOut",
//       repeat:Infinity,
//       repeatType:"loop",
//     }
//   }
// }

const cards = () => {
  const navigate =useNavigate()

  // const handlepath=():void=>{
  //   navigate('/settings')
  // }
  return (
    <>
    
    <div className='flex flex-col items-center justify-center md:grid md:grid-cols-2 md:w-[75%] md:place-items-center md:gap-y-1 md:min-h-screen md:overflow-y-auto md:relative md:left-[50%] md:transform md:translate-x-[-50%]'>
       {cardsObj.map((char,index)=>{
        const isLastItem=index===cardsObj.length-1
        const isSecondItem=index===cardsObj.length-2

return(
<motion.div onClick={()=>navigate(`${isSecondItem?'/livesettings':char.path}`)} initial='hidden'animate='visible' variants={cardVariants} key={index} className={`mb-6.5 py-7 w-[335px] flex flex-col items-start justify-center md:w-[450px] md:h-[240px] bg-gradient-to-br from-[#a1f2c] to-black/70 rounded-[6px] md:px-3.5 cursor-pointer ${isLastItem?"col-span-4" :""}`} >

<span className='mx-[13px] pt-[8px] bg-[#22c55e] w-[60px] rounded-[5px] py-[5px]'>
    <ImageComponent src={char.image} alt='heading' width='35px' height='25px'  className='block mx-auto'/>
</span>
<span className='px-[13px]'>
<h2 className='text-[22px] pb-1 text-white font-medium md:text-[24px] pt-3 font-dmsans'>{char.heading}</h2>
<p className='text-[#f5f5f5cb] text-[15px] font-light font-dmsans'>{char.text}</p>
</span>

        </motion.div>
)

          


        })}
        








        

        




    </div>
    </>
  )
}

export default cards