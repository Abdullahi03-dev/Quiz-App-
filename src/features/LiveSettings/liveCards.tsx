import FirstLiveCard from "../../components/LiveCards/FirstLiveCard"
import SecondLiveCard from "../../components/LiveCards/SecondLiveCard"
const liveCards = () => {
    
  return (

    <>
    <div className='flex flex-col items-center justify-center mt-[4rem] pb-7 md:mt-[7.5rem] md:flex-row md:gap-x-[6rem]'>
<FirstLiveCard/>
<SecondLiveCard/>
</div>
    </>
  )
}

export default liveCards