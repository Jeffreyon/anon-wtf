import ButtonLink from "../components/ButtonLink";
import iphoneImage from "../assets/iphone.png";

function Home() {
    return (
        <div className="md:flex md:gap-12 mt-12 md:mt-16">
            <div className="bg-rose-100 w-100 md:w-1/2 h-96 overflow-hidden rounded-b-lg rounded-t-3xl border-2 border-red-100">
                <img src={iphoneImage} alt="iphone" className=" home-image" />
            </div>
            <div className="flex flex-col gap-6 mt-12 mx-auto md:mx-0 md:my-auto max-w-md text-center md:text-left md:items-start md:w-1/2">
                <h1 className=" text-3xl font-bold leading-10">
                    Know what people actually think
                </h1>
                <p className=" text-neutral-300">
                    Get anonymous replies from your friends and audience.
                    Perfect for feedback and trivia games.
                </p>
                <div className="mx-auto md:m-0">
                    <ButtonLink label="Ask a question" linkTo="/sign-up" />
                </div>
            </div>
        </div>
    );
}

export default Home;
