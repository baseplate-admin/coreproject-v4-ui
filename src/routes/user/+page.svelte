<coreproject-specific-login-form
	><svelte-retag
		><form class="flex h-full flex-col justify-between">
			<div>
				<span
					class="flex items-center text-lg font-bold uppercase leading-none tracking-widest text-warning md:text-[1.25vw]"
					>hey there! let's login</span
				>
				<button class="btn btn-link p-0 h-max min-h-full md:text-[1.25vw] md:gap-[0.5vw]"
					><svg
						class="md:size-[1.25vw] -rotate-90"
						style=""
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 256 256"
						><path
							fill="currentColor"
							d="M231.39 123.06A8 8 0 0 1 224 128h-40v80a16 16 0 0 1-16 16H88a16 16 0 0 1-16-16v-80H32a8 8 0 0 1-5.66-13.66l96-96a8 8 0 0 1 11.32 0l96 96a8 8 0 0 1 1.73 8.72Z"
						></path></svg
					><!--<Index>-->
					Go Back</button
				>
			</div>
			<div class="flex flex-col gap-5 md:block">
				<div class="flex flex-col gap-2 md:gap-[0.5vw]">
					<label for="username" class="text-base font-semibold leading-none md:text-[1.1vw]"
						>Email address / Username:</label
					>
					<input
						placeholder="sora_amamiya@coreproject.moe / soraamamiya#0001"
						class="border-neutral focus:border-primary w-full rounded-xl border-2 bg-transparent px-5 text-base font-medium outline-none !ring-0 transition-colors duration-300 placeholder:text-white/50 md:rounded-[0.75vw] md:border-[0.2vw] p-3.5 md:px-[1.1vw] md:py-[0.8vw] leading-none md:text-[1.1vw]"
					/>
					<div
						class="flex items-center gap-2 text-[0.7rem] leading-none md:gap-[0.5vw] md:text-[0.8vw]"
					>
						<svg
							class="w-3 opacity-70 md:w-[0.9vw]"
							style=""
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
								stroke="white"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path><path
								d="M15 20V15"
								stroke="white"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path><path
								d="M15 10H15.0125"
								stroke="white"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path></svg
						><!--<Index>-->
						<span>we’ll send you a verification email, so please ensure it’s active</span>
					</div>
				</div>
				<div class="flex flex-col gap-[0.3rem] md:mt-[1.5vw] md:gap-[0.5vw]">
					<label for="username" class="text-base font-semibold leading-none md:text-[1.1vw]"
						>Password:</label
					>
					<div class="relative flex flex-col">
						<input
							placeholder="enter your existing password"
							class="border-neutral focus:border-primary w-full rounded-xl border-2 bg-transparent px-5 text-base font-medium outline-none !ring-0 transition-colors duration-300 placeholder:text-white/50 md:rounded-[0.75vw] md:border-[0.2vw] p-3.5 md:px-[1.1vw] md:py-[0.8vw] leading-none md:text-[1.1vw]"
						/>
					</div>
					<div
						class="text-surface-300 flex items-center gap-2 text-[0.7rem] leading-none md:gap-[0.5vw] md:text-[0.8vw]"
					>
						<svg
							class="w-3 opacity-70 md:w-[0.9vw]"
							style=""
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
								stroke="white"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path><path
								d="M15 20V15"
								stroke="white"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path><path
								d="M15 10H15.0125"
								stroke="white"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path></svg
						><!--<Index>--> <span>enter password of your account</span>
					</div>
				</div>
				<button
					class="btn btn-secondary flex h-max min-h-max flex-col items-start p-0 text-start text-base font-semibold leading-none text-primary underline md:mt-[2vw] md:text-[1vw]"
					>&lt; forgot password? &gt;</button
				>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex flex-col gap-1 md:gap-[0.5vw]">
					<span class="text-surface-100 text-xs leading-none md:text-[0.75vw]"
						>Don't have a core account?</span
					>
					<a
						href="/user/register/"
						class="btn btn-link p-0 size-max min-h-full text-base leading-none md:text-[1.1vw]"
						>Register</a
					>
				</div>
				<button
					type="submit"
					class="btn-disabled btn btn-primary h-max min-h-max rounded-lg p-4 text-base font-semibold leading-none text-accent md:rounded-[0.75vw] md:py-[1vw] md:px-[1.25vw] md:text-[0.95vw]"
					><span>Continue</span>
					<svg
						class="w-4 rotate-45 md:w-[1vw]"
						style=""
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M4.66699 11.3333L11.3337 4.66666"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path><path
							d="M4.66699 4.66666H11.3337V11.3333"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path></svg
					><!--<Index>--></button
				>
			</div>
		</form>
		<!--<Index>--></svelte-retag
	></coreproject-specific-login-form
>
