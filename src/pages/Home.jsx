import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import Button from "../components/Button";

function Home() {
    return (
        <div className="mx-auto">
            <div className=" px-4 flex flex-col gap-6 mt-24 text-center">
                <div className="mx-auto">
                    <img
                        src={simpleSvgPlaceholder({
                            width: 250,
                            height: 250,
                        })}
                        alt=""
                    />
                </div>
                <h1 className=" text-3xl font-bold leading-10">
                    Know what people actually think
                </h1>
                <p className=" text-neutral-300">
                    Get anonymous replies from your friends and audience.
                    Perfect for feedback and trivia games.
                </p>
                <Button label="Ask a question" />
            </div>
        </div>
    );
}

export default Home;
