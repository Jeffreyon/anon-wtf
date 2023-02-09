import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import ButtonLink from "../components/ButtonLink";
import iphoneImage from "../assets/iphone.png";

function Home() {
    return (
        <div className="mx-auto">
            <div className=" px-4 flex flex-col gap-6 mt-12 text-center">
                <div className="mx-auto bg-rose-100 w-100 h-96 scale-95  overflow-hidden rounded-lg">
                    <img
                        src={iphoneImage}
                        alt="iphone"
                        className=" home-image"
                    />
                </div>
                <h1 className=" text-3xl font-bold leading-10">
                    Know what people actually think
                </h1>
                <p className=" text-neutral-300">
                    Get anonymous replies from your friends and audience.
                    Perfect for feedback and trivia games.
                </p>
                <ButtonLink label="Ask a question" linkTo="/sign-up" />
            </div>
        </div>
    );
}

export default Home;
