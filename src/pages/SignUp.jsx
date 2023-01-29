import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import pb from "../lib/pocketbase";
import LinkRegular from "../components/LinkRegular";
import { useNavigate } from "react-router-dom";
import SignInMethod from "../components/SignInMethod";
import ErrorText from "../components/ErrorText";
import PromptDrawer from "../components/PromptDrawer";

function SignUp() {
    const [drawerOpen, toggleDrawer] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const signUpUser = async (data) => {
        setIsSubmitting(true);
        const newUser = {
            email: data.email,
            emailVisibility: true,
            password: data.password,
            passwordConfirm: data.password,
            name: data.fullName,
        };

        try {
            await pb.collection("users").create(newUser);

            await pb
                .collection("users")
                .authWithPassword(data.email, data.password);

            setIsSubmitting(false);
            toggleDrawer(false);

            navigate("/questions");
        } catch (error) {
            alert("This email is already being used, try another one");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto">
            <div className=" px-4 flex flex-col gap-6 mt-24 text-center">
                <h1 className=" text-3xl font-bold leading-10">
                    Get started with a new account
                </h1>
                <p className=" text-neutral-300">
                    Pick a preferred method to continue
                </p>
                <div className="flex flex-col gap-3">
                    <SignInMethod
                        handleClick={() => toggleDrawer(true)}
                        label="Email"
                    />
                </div>
                <p>
                    Already have an account?{" "}
                    <LinkRegular label="Log in" linkTo="/log-in" />
                </p>
                {drawerOpen && (
                    <PromptDrawer
                        handleClose={() => toggleDrawer(false)}
                        title="Sign up with email"
                        isSubmitting={isSubmitting}>
                        <SignUpForm
                            submitHandler={signUpUser}
                            isSubmitting={isSubmitting}
                        />
                    </PromptDrawer>
                )}
            </div>
        </div>
    );
}

function SignUpForm({ submitHandler, isSubmitting }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
            <div className="my-6">
                <fieldset className="flex flex-col items-start">
                    <label className=" text-neutral-300" htmlFor="">
                        Full Name
                    </label>
                    <input
                        className="w-full mt-2 p-2 bg-neutral-600 focus:bg-neutral-200 focus:text-neutral-900 rounded"
                        type="text"
                        {...register("fullName", { required: true })}
                    />
                    {errors.fullName?.type === "required" && (
                        <ErrorText error="Full name is required" />
                    )}
                </fieldset>
                <fieldset className="flex flex-col items-start mt-4">
                    <label className=" text-neutral-300" htmlFor="">
                        Email
                    </label>
                    <input
                        className="w-full mt-2 p-2 bg-neutral-600 focus:bg-neutral-200 focus:text-neutral-900 rounded"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email?.type === "required" && (
                        <ErrorText error="Valid email required" />
                    )}
                </fieldset>
                <fieldset className="flex flex-col items-start mt-4">
                    <label className=" text-neutral-300" htmlFor="">
                        Password
                    </label>
                    <input
                        className="w-full mt-2 p-2 bg-neutral-600 focus:bg-neutral-200 focus:text-neutral-900 rounded"
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <ErrorText error="Password required" />
                    )}
                    {errors.password?.type === "minLength" && (
                        <ErrorText error="Password must be 8 characters or more" />
                    )}
                </fieldset>
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    label={isSubmitting ? "Signing up..." : "Sign Up"}
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
}

export default SignUp;
