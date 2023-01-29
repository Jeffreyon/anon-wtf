function PromptDrawer({ handleClose, title, children }) {
    return (
        <div className="h-screen absolute bg-black bg-opacity-60 top-0 right-0 left-0 flex items-end animate__animated animate__fadeIn animate__faster">
            <div className=" w-full bg-neutral-800 border-t-4 border-lime-700 flex flex-col justify-between p-4 pb-8 animate__animated animate__slideInUp animate__faster">
                <div className="flex justify-between items-baseline">
                    <p className="uppercase text-neutral-300 tracking-wider">
                        {title}
                    </p>
                    <button onClick={handleClose}>Close</button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default PromptDrawer;
