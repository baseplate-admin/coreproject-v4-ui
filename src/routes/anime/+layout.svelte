<script lang="ts">
	import Search from "$icons/shapes/search.svelte";
	import Home from "$icons/shapes/home.svelte";
	import Explore from "$icons/shapes/explore.svelte";
	import Misc from "$icons/shapes/misc.svelte";
	import List from "$icons/shapes/list.svelte";
	import Schedule from "$icons/shapes/schedule.svelte";
	import Settings from "$icons/shapes/settings.svelte";
	import Forum from "$icons/shapes/forum.svelte";
	import AnimeCoreIcon from "$icons/logos/anime_core.svelte";
	import Register from "$icons/shapes/register.svelte";
	import Login from "$icons/shapes/login.svelte";
	import User from "$icons/shapes/user.svelte";
	import Preference from "$icons/shapes/preference.svelte";
	import CoreProjectLogo from "$icons/shapes/logo.svelte";

	import VercelHover from "$components/vercel_hover.svelte";
	import { is_authenticated } from "$stores/auth.svelte";
	import { page } from "$app/stores";
	import { cn } from "$functions/classnames";
	import { blur } from "svelte/transition";
	import { t } from "$lib/translations";
	import Modals from "$modals/index.svelte";
	import { createModalStore } from "$stores/modals.svelte";

	const modal_store = createModalStore();

	// Local
	const icon_mapping: {
		// Top,middle,bottom
		[key in "top" | "middle" | "bottom" | "profile"]: {
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
					class: "w-[1.25vw] text-black"
				}
			}
		},
		middle: {
			home: {
				icon: {
					component: Home,
					class: "w-[1.25vw]"
				},
				url: "/anime",
				show_on_mobile: true
			},

			explore: {
				icon: {
					component: Explore,
					class: "w-[1.25vw]"
				},
				url: "/anime/explore",
				show_on_mobile: true
			},
			list: {
				icon: {
					component: List,
					class: "w-[1.7vw]"
				},
				url: "/anime/list",
				show_on_mobile: false
			},
			schedule: {
				icon: {
					component: Schedule,
					class: "w-[1.25vw]"
				},
				url: "/anime/shedule",
				show_on_mobile: false
			},
			forum: {
				icon: {
					component: Forum,
					class: "w-[1.25vw]"
				},
				url: "/anime/forum",
				show_on_mobile: true
			}
		},
		bottom: {
			settings: {
				icon: {
					component: Settings,
					class: "w-[1.25vw]"
				},
				url: undefined
			},
			misc: {
				icon: {
					component: Misc,
					class: "w-[1.25vw]"
				},
				url: undefined
			}
		},
		profile: {
			profile: {
				url: "/profile",
				icon: {
					component: User,
					class: "w-4 md:w-[1vw]"
				}
			},
			"my list": {
				url: "/my-list",
				icon: {
					component: List,
					class: "w-4 md:w-[1vw]"
				}
			},
			prefernce: {
				url: "/prefernce",
				icon: {
					component: Preference,
					class: "w-4 md:w-[1vw]"
				}
			}
		}
	};
</script>

<Modals />
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
				{#if is_authenticated}
					<div class="dropdown dropdown-end">
						<div tabIndex={0} role="button" class="btn border-none !bg-transparent p-0">
							<img
								alt=""
								src="https://github.com/AKindWorld.png"
								class="size-12 rounded-lg md:size-[3vw] md:rounded-[0.5vw]"
							/>
						</div>
						<div
							role="button"
							tabIndex={0}
							class="menu dropdown-content top-14 z-20 min-w-48 rounded-lg bg-neutral p-4 md:top-[4vw] md:min-w-[12vw] md:rounded-[0.75vw] md:p-[0.5vw] md:text-[0.9vw]"
						>
							<!-- profile dropdown card -->
						</div>
					</div>
				{:else}
					<div class="hidden md:flex md:gap-[0.75vw]">
						<a
							href="/user/register"
							class="btn btn-neutral h-max min-h-max leading-none md:rounded-[0.5vw] md:p-[0.9vw] md:text-[1vw]"
						>
							{$t("home.navbar.register")}
						</a>
						<a
							href="/user/login"
							class="btn btn-primary h-max min-h-max leading-none text-accent md:rounded-[0.5vw] md:p-[0.9vw] md:text-[1vw]"
						>
							{$t("home.navbar.login")}
						</a>
					</div>

					<div class="dropdown dropdown-end flex md:hidden">
						<div role="button" class="avatar btn border-none !bg-transparent p-0">
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
									{$t("home.navbar.login")}
								</a>
							</li>
							<li>
								<a
									href="/user/register"
									class="flex items-center gap-3 !bg-transparent p-0 leading-none !text-white"
								>
									<Register class="w-4 md:w-[1vw]" />
									{$t("home.navbar.register")}
								</a>
							</li>
						</div>
					</div>
				{/if}
			</div>
		</header>
		<div class="flex h-full w-full flex-auto overflow-hidden">
			<aside class="w-auto flex-none overflow-y-auto overflow-x-hidden">
				<div class="hidden h-full w-[6.25vw] flex-col justify-between py-[2vw] md:flex">
					<div>
						<div class="flex flex-col items-center">
							<button
								class="btn btn-warning size-[3vw] min-h-full rounded-[0.5vw] p-0"
								onclick={() => {
									modal_store.open_modal("search");
								}}
							>
								<Search class="w-[1.25vw] text-black" />
							</button>
						</div>

						<VercelHover
							glider_container_class="mt-[2.8125vw] flex flex-col items-center gap-[0.75vw]"
							active_element_class="rounded-[0.75vw] bg-white/10"
							direction="vertical"
							GLIDER_TRANSITION_DURATION={200}
						>
							{#snippet children(handle_mouse_enter, handle_mouse_leave)}
								{#each Object.entries(icon_mapping.middle) as item}
									{@const item_name = item[0]}
									{@const item_icon = item[1].icon}
									{@const item_href = item[1].url}

									{@const is_active = ((item_href) => {
										const regex = new RegExp(`${item_href}\/?$`);
										if (regex.test($page.url.pathname)) {
											return true;
										} else {
											return false;
										}
									})(item_href)}

									<a
										onmouseenter={handle_mouse_enter}
										onmouseleave={handle_mouse_leave}
										href={item_href}
										class="{cn(
											'btn relative size-[4vw] min-h-max rounded-[0.75vw] border-none p-0',
											is_active
												? 'relative !bg-accent before:absolute before:-left-[0.15vw] before:z-10 before:h-[1.25vw] before:w-[0.25vw] before:rounded-full before:bg-primary'
												: '!bg-transparent'
										)} "
									>
										<div class="inline-grid">
											{#if is_active}
												<div
													transition:blur
													class="absolute inset-0 flex flex-col items-center justify-center gap-[0.5vw]"
												>
													<icon class="!text-secondary">
														<svelte:component this={item_icon.component} class={item_icon.class} />
													</icon>
												</div>
											{:else}
												<div
													transition:blur
													class="absolute inset-0 flex flex-col items-center justify-center gap-[0.5vw]"
												>
													<icon class={cn("!text-white")}>
														<svelte:component this={item_icon.component} class={item_icon.class} />
													</icon>

													<span class="text-[0.75vw] font-semibold capitalize leading-[1.05vw]">
														{$t(`home.sidebar.${item_name}`)}
													</span>
												</div>
											{/if}
										</div>
									</a>
								{/each}
							{/snippet}
						</VercelHover>
					</div>
					<div class="flex flex-col items-center">
						{#each Object.entries(icon_mapping.bottom) as item}
							{@const item_icon = item[1].icon}
							{@const item_name = item[0]}

							<button
								type="button"
								class="btn h-[4vw] w-[4vw] flex-col justify-center gap-[0.45vw] border-none !bg-transparent p-0 text-sm"
							>
								<svelte:component this={item_icon.component} class={item_icon.class} />
								<span class="!m-0 text-[0.75vw] font-semibold capitalize leading-[1.05vw]">
									{$t(`home.sidebar.${item_name}`)}
								</span>
							</button>
						{/each}
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
