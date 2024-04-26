<script lang="ts">
	import Search from '$icons/shapes/search.svelte';
	import Home from '$icons/shapes/home.svelte';
	import Explore from '$icons/shapes/explore.svelte';
	import Misc from '$icons/shapes/misc.svelte';
	import List from '$icons/shapes/list.svelte';
	import Schedule from '$icons/shapes/schedule.svelte';
	import Settings from '$icons/shapes/settings.svelte';
	import Forum from '$icons/shapes/forum.svelte';
	import AnimeCoreIcon from '$icons/logos/anime_core.svelte';
	import Register from '$icons/shapes/register.svelte';
	import Login from '$icons/shapes/login.svelte';
	import User from '$icons/shapes/user.svelte';
	import Preference from '$icons/shapes/preference.svelte';
	import CoreProjectLogo from '$icons/shapes/logo.svelte';
	import VercelHover from '$components/vercel_hover.svelte';

	// Local
	const icon_mapping: {
		// Top,middle,bottom
		[key in 'top' | 'middle' | 'bottom' | 'profile']: {
			// Icon name
			[key in string]: {
				name?: string;
				icon: {
					component: any;
					class: string;
				};
				url?: string;
				show_on_mobile?: boolean | undefined;
			};
		};
	} = {
		top: {
			search: {
				icon: {
					component: Search,
					class: 'w-[1.25vw] text-black'
				}
			}
		},
		middle: {
			home: {
				icon: {
					component: Home,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime',
				show_on_mobile: true
			},

			explore: {
				icon: {
					component: Explore,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime/explore',
				show_on_mobile: true
			},
			list: {
				icon: {
					component: List,
					class: 'w-[1.7vw] text-white'
				},
				url: '/anime/list',
				show_on_mobile: false
			},
			schedule: {
				icon: {
					component: Schedule,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime/shedule',
				show_on_mobile: false
			},
			forum: {
				icon: {
					component: Forum,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime/forum',
				show_on_mobile: true
			}
		},
		bottom: {
			settings: {
				icon: {
					component: Settings,
					class: 'w-[1.25vw] text-white'
				},
				url: undefined
			},
			'misc.': {
				icon: {
					component: Misc,
					class: 'w-[1.25vw] text-white'
				},
				url: undefined
			}
		},
		profile: {
			profile: {
				url: '/profile',
				icon: {
					component: User,
					class: 'w-4 md:w-[1vw]'
				}
			},
			'my list': {
				url: '/my-list',
				icon: {
					component: List,
					class: 'w-4 md:w-[1vw]'
				}
			},
			prefernce: {
				url: '/prefernce',
				icon: {
					component: Preference,
					class: 'w-4 md:w-[1vw]'
				}
			}
		}
	};
</script>

<div class="relative h-dvh bg-secondary">
	<div class="flex h-full w-full flex-col overflow-hidden">
		<header class="z-10 flex-none">
			<div
				class="absolute top-0 flex h-[4.5rem] w-full items-center justify-between bg-secondary/95 px-4 backdrop-blur-3xl md:static md:h-[10vh] md:bg-secondary md:py-[0.9375vw] md:pl-[2.1vw] md:pr-[3.75vw]"
			>
				<a href="/">
					<CoreProjectLogo class="w-9 md:w-[2.25vw] md:pt-[0.75vw]" />
				</a>
				<div class="relative flex items-center md:static">
					<div class="absolute left-1/2 -translate-x-1/2">
						<a href="/anime" class="hidden md:flex">
							<AnimeCoreIcon class="w-[10vw]"></AnimeCoreIcon>
						</a>
						<div>
							<form class="relative flex h-12 w-[65vw] items-center md:hidden">
								<button
									class="btn absolute left-4 border-none !bg-transparent p-0"
									aria-label="Search"
								>
									<Search class="w-5" />
								</button>
								<input
									type="text"
									placeholder="Search for animes, mangas..."
									class="placeholder:text-surface-200 h-full w-full rounded-lg border-none bg-neutral pl-12 text-base font-semibold text-accent shadow-lg !ring-0 placeholder:font-medium"
								/>
							</form>
						</div>
					</div>
				</div>

				<!-- {is_authenticated ? (
					<div class="dropdown dropdown-end flex">
						<div
							tabIndex={0}
							role="button"
							class="avatar btn border-none !bg-transparent p-0"
						>
							<div class="w-12 rounded-lg md:w-[3vw] md:rounded-[0.5vw]">
								<img
									alt=""
									src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
								/>
							</div>
						</div>
						<div
							role="button"
							tabIndex={0}
							class="menu dropdown-content top-14 z-20 min-w-48 rounded-lg bg-base-100 p-4 md:top-[4vw] md:min-w-[12vw] md:rounded-[0.75vw] md:p-[0.5vw] md:text-[0.9vw]"
						>
							<div class="flex flex-col items-start gap-2 leading-none md:gap-[0.35vw] md:p-[0.75vw] md:py-[0.5vw]">
								{/* <span class="font-bold capitalize md:text-[1vw]">{username}</span> */}
								{/* <span class="md:text-[0.75vw]">{email}</span> */}
							</div>
							<div class="divider mb-0 mt-1 md:mb-[0.1vw]"></div>
							{/** THERE IS A MAJOR BUG HERE */}
							<VercelHover
								glider_container_class="flex flex-col"
								active_element_class="rounded-[0.5vw] bg-primary"
								direction="vertical"
								GLIDER_TRANSITION_DURATION={200}
							>
								{({ handle_mouse_enter, handle_mouse_leave }) => {
									return (
										<>
											{Object.entries(icon_mapping.profile).map((item, index) => {
												const item_name = item[0];
												const item_icon = item[1].icon;
												const item_href = item[1].url!;

												const Component = item_icon.component;

												return (
													<li
														onMouseEnter={(event) => {
															event.preventDefault();
															handle_mouse_enter(event);
														}}
														onMouseLeave={(event) => {
															event.preventDefault();
															handle_mouse_leave();
														}}
														key={index}
													>
														<a
															href={item_href}
															class="flex items-center gap-3 !bg-transparent px-0 capitalize leading-none !text-white md:gap-[0.5vw] md:p-[0.75vw]"
														>
															<Component class={item_icon.class} />
															{item_name}
														</a>
													</li>
												);
											})}
										</>
									);
								}}
							</VercelHover>
						</div>
					</div>
				) : (
					<>
						<div class="hidden md:flex md:gap-[0.75vw]">
							<a
								href="/user/register"
								class="btn btn-neutral h-max min-h-max leading-none md:rounded-[0.5vw] md:p-[0.9vw] md:text-[1vw]"
							>
								Register
							</a>
							<a
								href="/user/login"
								class="btn btn-primary h-max min-h-max leading-none text-accent md:rounded-[0.5vw] md:p-[0.9vw] md:text-[1vw]"
							>
								Log in
							</a>
						</div>

						<div class="dropdown dropdown-end flex md:hidden">
							<div
								role="button"
								class="avatar btn border-none !bg-transparent p-0"
							>
								<div class="w-12 rounded-lg md:w-[3vw] md:rounded-[0.5vw]">
									<img
										alt=""
										src="https://i.pinimg.com/1200x/a8/2d/aa/a82daa4b726d8f02d8ce28f3e3b3677a.jpg"
									/>
								</div>
							</div>
							<div
								role="button"
								class="z-1 menu dropdown-content top-14 flex min-w-36 flex-col gap-3 rounded-lg bg-base-100 p-4"
							>
								<li>
									<a
										href="/user/login"
										class="flex items-center gap-3 !bg-transparent p-0 leading-none !text-white"
									>
										<Login class="w-4 md:w-[1vw]" />
										Log in
									</a>
								</li>
								<li>
									<a
										href="/user/register"
										class="flex items-center gap-3 !bg-transparent p-0 leading-none !text-white"
									>
										<Register class="w-4 md:w-[1vw]" />
										Register
									</a>
								</li>
							</div>
						</div>
					</>
				)} -->
			</div>
		</header>
		<div class="flex h-full w-full flex-auto overflow-hidden">
			<aside class="w-auto flex-none overflow-y-auto overflow-x-hidden">
				<div class="hidden h-full w-[6.25vw] flex-col justify-between py-[2vw] md:flex">
					<div>
						<div class="flex flex-col items-center">
							<button class="btn btn-warning size-[3vw] min-h-full rounded-[0.5vw] p-0">
								<Search class="w-[1.25vw] text-black" />
							</button>
						</div>
						<!-- {/* <coreproject-specific-search-modal></coreproject-specific-search-modal> */} -->

						<VercelHover
							direction="vertical"
							glider_container_class="mt-[2.8125vw] flex flex-col items-center gap-[0.75vw]"
							active_element_class="rounded-[0.75vw] bg-white/10"
						>
							<!-- {Object.entries(icon_mapping.middle).map((item, index) => {
											const item_name = item[0];
											const item_icon = item[1].icon;
											const item_href = item[1].url!;

											const is_active = ((item_href: string) => {
												const regex = new RegExp(`^${item_href}\/?$`);
												if (regex.test(pathname)) {
													return true;
												} else {
													return false;
												}
											})(item_href);

											const Component = item_icon.component;

											return (
												<CSSTransition
													key={index}
													in={is_active}
													timeout={150}
													classNames={{
														enter: "blur-md",
														enterActive: "blur-sm",
														enterDone: "blur-none",
														exit: "blur-md",
														exitActive: "blur-sm",
														exitDone: "blur-none"
													}}
												>
													<a
														onMouseEnter={handle_mouse_enter}
														onMouseLeave={handle_mouse_leave}
														href={item_href}
														prefetch={true}
														type="button"
														class={cn("btn btn-square relative z-0 h-[4vw]  w-[4vw] rounded-[0.75vw] border-none p-0 duration-200", is_active ? "relative !bg-accent before:absolute before:-left-[0.15vw] before:z-10 before:h-[1.25vw] before:w-[0.25vw] before:rounded-full before:bg-primary" : "!bg-transparent")}
													>
														<div class="inline-grid">
															{is_active ? (
																<div class="absolute inset-0 flex items-center justify-center">
																	<Component class={cn(item_icon.class, "!text-black")} />
																</div>
															) : (
																<div class="absolute inset-0 flex flex-col items-center justify-center gap-[0.35vw]">
																	<Component class={cn(item_icon.class)} />
																	<span class="text-[0.75vw] font-semibold capitalize leading-[1.05vw]">{item_name}</span>
																</div>
															)}
														</div>
													</a>
												</CSSTransition>
											);
										})} -->
						</VercelHover>
					</div>
					<div class="flex flex-col items-center">
						<!-- {Object.entries(icon_mapping.bottom).map((item, index) => {
							const item_icon = item[1].icon;
							const item_name = item[0];
							const Component = item_icon.component;

							return (
								<button
									key={index}
									type="button"
									class="btn h-[4vw] w-[4vw] flex-col justify-center gap-[0.45vw] border-none !bg-transparent p-0 text-sm"
								>
									<Component class={cn(item_icon.class)} />
									<span class="!m-0 text-[0.75vw] font-semibold capitalize leading-[1.05vw]">
										{item_name}
									</span>
								</button>
							);
						})} -->
					</div>
				</div>
			</aside>
			<div id="page" class="flex flex-1 flex-col overflow-x-hidden" style="scrollbar-gutter:auto">
				<slot />
			</div>
		</div>

		<!-- {/* <coreproject-specific-bottom-navigation></coreproject-specific-bottom-navigation> */} -->
	</div>
</div>
