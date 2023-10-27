import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.trainerName.value!=="") {
      dispatch(setTrainerName(event.target.trainerName.value));
      navigate("/pokedex");
    }
  }
  return (
    <main className="h-screen grid grid-rows-[1fr_auto]">
      <section className="grid place-content-center text-center">
        <div className="w-full items-center pb-2">
          <img className="w-[80vw] max-w-[550px] mx-auto" src="/logo_pokedex.png" alt="logo pokedex" />
        </div>
        <h3 className="text-red-600 font-bold font-[Inter] text-xl xxs:text-2xl xsm:text-3xl sm:text-4xl sm:pb-1">¡Hi Trainer!</h3>
        <p className="text-black/80 font-[Inter] xxxs:text-sm xxs:text-base xsm:text-lg sm:text-xl sm:pb-1 font-medium">To start give me your name</p>
        <form onSubmit={handleSubmit} className="pt-2 xxxs:text-sm xxs:text-base xsm:text-lg sm:text-xl sm:pb-1">
            <input placeholder="Your name..." className="px-2 h-full w-[65%] outline-none" style={{boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.15)"}} name="trainerName" type="text"/>
            <button className="bg-[#D93F3F] text-white px-4 py-2 sm:px-6">Start!</button>
        </form>

      </section>
      <footer className="bg-yellow-500 h-28">
        <div className="bg-red-600 border-b-[12px] border-black h-16"></div>
        <div className="bg-white h-12">
          <div className="h-[70px] w-[70px] bg-slate-100 border-[8px] sm:border-[12px] border-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
            <div className="h-9 w-9 bg-white border-[6px] border-white rounded-full"></div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home