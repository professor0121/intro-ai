"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormField from "@/components/FormField"
import { logo } from "@/utils/site.info"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/client"
import { signIn, signUp } from "../lib/actions/auth.action"


const authFormSchema = ({ type }: { type: FormType }) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6),
    })
}


const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema({ type });
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values;
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password
                })
                if (!result.success) {
                    toast.error(result.error)
                    return;
                }
                toast.success(result.message)
                router.push("/sign-in")
            } else {
                const { email, password } = values;
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredentials.user.getIdToken();
                if (!idToken) {
                    toast.error("Something went wrong. Please try again.")
                    return;
                }
                const result = await signIn({
                    email, idToken
                })
                if (!result.success) {
                    toast.error(result.error)
                    return;
                }
                toast.success(result.message)
                router.push("/")
            }

        } catch (error) {
            console.log(error)
            toast.error(`Something went wrong. Please try again.${error}`)
        }
    }
    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src={logo} alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>
                <h3>Practice job interviews with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn &&
                            (
                                <FormField
                                    control={form.control}
                                    name="name"
                                    label="Name"
                                    placeholder="John Doe"
                                    type="text"
                                />
                            )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="john@example.com"
                            type="email"
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        <Button className="btn" type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">{isSignIn ? "Don't have an account?" : "Already have an account?"}
                    <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="ml-2">{isSignIn ? "Create an account" : "Sign in"}</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm
