import React from "react";

function About() {
    return (
        <div className="mx-auto">
            <div className=" px-4 flex flex-col gap-6 mt-8">
                <h1 className=" text-3xl font-bold leading-10">About</h1>
                <p className=" text-neutral-300">
                    This is a product made at The Backyard. It is experimental
                    and will be improved as usage increases.
                </p>
            </div>
        </div>
    );
}

export default About;
