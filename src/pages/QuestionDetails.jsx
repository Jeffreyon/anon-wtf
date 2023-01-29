import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from "../lib/pocketbase";
import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import Button from "../components/Button";

function QuestionDetails() {
    // get parameters from react router
    let { qid } = useParams();
    let user_id = pb.authStore.model.id;

    const [q, setQ] = useState(null);
    const [replies, setReplies] = useState([]);

    // fetch question and replies from database
    useEffect(() => {
        try {
            (async () => {
                let question = await pb
                    .collection("questions")
                    .getFirstListItem(`user='${user_id}' && id='${qid}'`);

                setQ(question.text);

                // fetch replies
                let replies = await pb.collection("replies").getFullList(200, {
                    filter: `question='${qid}'`,
                });

                replies = replies.map((reply) => {
                    return {
                        text: reply.text,
                    };
                });
                setReplies(replies);
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    // fetch replies

    return (
        <div className="mx-auto">
            <div className="px-4 mt-16">
                <h1 className=" text-3xl font-bold leading-10">{q}</h1>
                <div className="mt-8 flex justify-between">
                    <p className="uppercase text-neutral-300 tracking-wider">
                        Share
                    </p>
                    <div>Share buttons</div>
                </div>
                <div className="mt-10">
                    {replies.length ? (
                        <>
                            <h3 className=" text-xl font-semibold text-neutral-300">
                                Replies
                            </h3>

                            {replies.map((reply, ii) => (
                                <ReplyCard reply={reply.text} key={ii} />
                            ))}
                        </>
                    ) : (
                        <>
                            <div className=" px-4 pt-6 flex flex-col mt-10 text-center border-t border-neutral-700">
                                <div className="mx-auto">
                                    <img
                                        src={simpleSvgPlaceholder({
                                            width: 200,
                                            height: 200,
                                        })}
                                        alt=""
                                    />
                                </div>
                                <h1 className=" text-xl mt-4 font-bold leading-10">
                                    No replies yet
                                </h1>
                                <p className=" text-neutral-500">
                                    Share this question to your audience to get
                                    anonymous replies from them
                                </p>
                                <div className="mt-3">
                                    <Button label="Copy link" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ReplyCard({ reply }) {
    return (
        <div className="border-b-2 border-neutral-800 py-4 ">
            <h2 className="text-lg">{reply}</h2>
        </div>
    );
}

export default QuestionDetails;
