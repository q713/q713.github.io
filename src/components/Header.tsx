import {NavLink} from "react-router-dom";

export const Header = (): JSX.Element => {
    return <header>
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded fixed w-full z-20 top-0 left-0 border-b">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap">
                        Jakob Görgen
                    </span>
                </div>
                <div className="hidden w-full md:block md:w-auto">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row
                            md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                        <li>
                            <NavLink to="/" className={({isActive, isPending}) => {
                                return `block py-2 pr-4 pl-3 text-white rounded md:bg-transparent text-stone-600 md:p-0
                                    ${isActive ? "active" : ""}`}} >
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>;
}