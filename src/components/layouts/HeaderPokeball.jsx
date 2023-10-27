import { Link } from "react-router-dom"

const HeaderPokeball = () => {
  return (
      <header className="">
          <div className="bg-red-600 h-16">
              <div className="h-full outline-none">
                <Link to={"/pokedex"}>
                  <img className="h-[36px] xsm:h-12 csm:h-16 w-auto translate-x-[5vw] md:translate-x-[60px] translate-y-4 relative z-10" src="/logo_pokedex.png" alt="" />
                </Link>
              </div>
          </div>
          <div className="bg-black h-12">
            <div className="h-[70px] w-[70px] bg-slate-100 border-[8px] sm:border-[12px] border-black rounded-full absolute right-0 -translate-x-1/2 -translate-y-[20%] grid place-content-center">
              <div className="h-9 w-9 bg-white border-[6px] border-white rounded-full"></div>
            </div>
          </div>
        </header>
    
  )
}

export default HeaderPokeball