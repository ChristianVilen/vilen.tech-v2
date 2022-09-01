import type {NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";
import {trpc} from "../utils/trpc";
import LoginButton from "../components/login-btn";

type TechnologyCardProps = {
	name: string;
	description: string;
	documentation: string;
};

const AuthShowcase: React.FC = () => {
	const {data: secretMessage, isLoading} = trpc.useQuery([
		"auth.getSecretMessage",
	]);

	const {data: sessionData} = useSession();

	return (
		<div>
			{sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
			{secretMessage && <p>{secretMessage}</p>}
			<button
				className="px-4 py-2 border-2 border-blue-500 rounded-md"
				onClick={sessionData ? () => signOut() : () => signIn()}
			>
				{sessionData ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
};

const Home: NextPage = () => {
	const hello = trpc.useQuery(["example.hello", {text: "from tRPC"}]);

	return (
		<>
			<div className="flex flex-col justify-end">
				<LoginButton/>
			</div>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
				<h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
					Create <span className="text-purple-300">T3</span> App
				</h1>
				<p className="text-2xl text-gray-700">This stack uses:</p>
				<div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3">
					<TechnologyCard
						name="NextJS"
						description="The React framework for production"
						documentation="https://nextjs.org/"
					/>
					<TechnologyCard
						name="TypeScript"
						description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
						documentation="https://www.typescriptlang.org/"
					/>
					<TechnologyCard
						name="TailwindCSS"
						description="Rapidly build modern websites without ever leaving your HTML"
						documentation="https://tailwindcss.com/"
					/>
					<TechnologyCard
						name="tRPC"
						description="End-to-end typesafe APIs made easy"
						documentation="https://trpc.io/"
					/>
					<TechnologyCard
						name="Next-Auth"
						description="Authentication for Next.js"
						documentation="https://next-auth.js.org/"
					/>
					<TechnologyCard
						name="Prisma"
						description="Build data-driven JavaScript & TypeScript apps in less time"
						documentation="https://www.prisma.io/docs/"
					/>
				</div>
				<div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
					{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
				</div>
			</main>
		</>
	);
};

const TechnologyCard = ({
													name,
													description,
													documentation,
												}: TechnologyCardProps) => {
	return (
		<section
			className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
			<h2 className="text-lg text-gray-700">{name}</h2>
			<p className="text-sm text-gray-600">{description}</p>
			<a
				className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
				href={documentation}
				target="_blank"
				rel="noreferrer"
			>
				Documentation
			</a>
		</section>
	);
};

export default Home;
