import LiveCards from "../features/LiveSettings/liveCards"
const liveSettingsComp = () => {
  return (
<>
<section className="bg-[#0f1218] md:h-[100vh]">
    <span className='flex justify-center pt-[4rem] md:pt-[6rem]'>
          <h1 className='inline-block text-center font-bold text-4xl text-[#00ff7f] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] pr-5 font-dmsans'>Explore</h1><h1 className='font-bold text-4xl text-white inline-block'>Live Quiz</h1>
    </span>
          <LiveCards/>
</section>
</>
    )
}

export default liveSettingsComp