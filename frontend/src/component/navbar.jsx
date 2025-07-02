const Navbar = ({onOpen, onSearch}) => {

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    }

    return(
        <div className="navbar bg-base-300 shadow-sm pl-[40px] pr-[60px] w-full">
            <div className="flex-1">
                <a className=" font-bold text-2xl">CRUDList</a>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" onChange={handleSearchChange} className="input input-bordered w-[400px]" />
                <div className="justify-items-center align-items-center place-content-center ml-[20px]">
                    <button className="btn btn-ghost" onClick={onOpen}><i class="fi fi-rr-plus"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;

