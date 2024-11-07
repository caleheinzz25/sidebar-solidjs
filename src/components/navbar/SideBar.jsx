import { ChevronFirst, ChevronLast, CircleUserRound, EllipsisVertical, House, Boxes, Store, BookHeart, Apple, SearchSlash, Settings, CircleHelp, Bell } from "lucide-solid";
import { createSignal, For, Show, createContext, useContext, onMount } from "solid-js";

const SidebarContext = createContext();

export default function Sidebar({ hide }) {
  const [expanded, setExpanded] = createSignal(true);
  const [activeIndex, setActiveIndex] = createSignal(null);

  onMount(()=>{
    setActiveIndex(0);
  })

  const sideBarText = ["Home", "Collections", "Store", "Favorites", "Foods", "About", "Settings", "Help Center", "Notifications"];
  const navIcons = [House, Boxes, Store, BookHeart, Apple, SearchSlash, Settings, CircleHelp, Bell];

  return (
    <SidebarContext.Provider value={{ expanded, activeIndex, setActiveIndex }}>
      <aside class={`h-screen fixed ${hide ? 'hidden' : ''} ${expanded() ? 'max-w-64': 'max-w-20'}`}>
        <nav class="h-full flex flex-col bg-nav border-r shadow-md">
            <div class="p-4 pb-2 flex justify-between items-center">
                <img src="/logo1.png" alt="Logo" class={`overflow-hidden transition-all ${expanded() ? `w-32` : `w-0`}`} />
                <button class="p-3 rounded-full hover:bg-navHover" onClick={() => setExpanded(!expanded())}>
                {expanded() ? <ChevronFirst /> : <ChevronLast />}
                </button>
            </div>

            <ul class="flex-1 px-4">
                <For each={navIcons}>{(Icon, index) => {
                    const isDivider = index() === sideBarText.length - 3;
                    return (
                    <>
                        {isDivider && <hr class="my-3" />}
                        <Show when={activeIndex() === index()}>
                        <SideBarItem
                            id={index()}
                            icon={<Icon strokeWidth={1.5} size={30} />}
                            text={sideBarText[index()]}
                            alert={sideBarText[index()] === "Notifications"}
                            active={true}
                            onClick={() => setActiveIndex(index())}
                        />
                        </Show>
                        <Show when={activeIndex() !== index()}>
                        <SideBarItem
                            id={index()}
                            icon={<Icon strokeWidth={1.5} size={30} />}
                            text={sideBarText[index()]}
                            alert={sideBarText[index()] === "Notifications"}
                            active={false}
                            onClick={() => setActiveIndex(index())}
                        />
                        </Show>
                    </>
                    );
                }}</For>
            </ul>


            <div class="flex p-2">
            <div class="rounded-2xl hover:bg-navHover hover:text-slate-700 p-2 cursor-pointer">
              <CircleUserRound strokeWidth={1.5} class="w-10 h-10 rounded-lg" />
            </div>
            <Show when={expanded()}>
              <div class="flex items-center justify-between w-40 ml-3">
                <div class="leading-4">
                  <h4 class="font-semibold">CaleHeinzz</h4>
                  <span class="text-xs text-slate-800">Cale@gmail.com</span>
                </div>
                <EllipsisVertical class="hover:text-textHover cursor-pointer" />
              </div>
            </Show>
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

function SideBarItem(props) {
  const { expanded } = useContext(SidebarContext);
  const { icon, text, active, alert, onClick } = props;

  return (
    <li
      class={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-gradient-to-r  from-slate-200 opacity-80 to-cyan-200 text-textHover" : "hover:bg-indigo-50 text-gray-600"
      }`}
      onClick={onClick}
    >
      {icon}
      <span class={`overflow-hidden transition-all ${expanded() ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </span>
      {alert && (
        <div class={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded() ? "" : "top-2"}`} />
      )}

      {!expanded() && (
        <div
          class={`absolute left-full rounded-md px-2 py-1 ml-6 bg-navHover text-textHover text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
