import AnimateEnter from "./animate_enter"
import locale from "@/locale.json"

const ResourceContent = (props) => {
    return (
        <div className="flex flex-row-reverse justify-between">
            <div className="text-[22px] lg:text-[28px] ml-4 text-3 basis-1/3 text-nowrap" dir="rtl" >{props.title}</div>
			<div className="justify-center items-center basis-2/3 flex">
            <a className="hover:scale-125 transition text-[18px] text-center self-center dejavu rounded-2xl p-2 text-9 bg-5" target="_blank" href={props.link}>{props.linkTitle}</a>
		</div>
        </div>
    )
}

export default function Footer() {
    return (
        <div className="bg-6 w-full">
            <div className="flex flex-row-reverse bg-transparent h-max w-full text-[64px] text-right items-stretch justify-evenly justify-items-center align-center border-t-black border-t-[4px] border-solid relative z-10 grow shrink basis-[21%] flex-wrap pt-8 pb-8">
                <AnimateEnter>
                    <a target="_blank" href={locale.serverlink}>
                        <div className="bg-4 h-19/20 p-4 rounded-2xl border-solid border-t-1 border-l-1 border-r-1 m-4 shadow-1 shadow-xl">
                            <div className="koodak text-3 text-[44px] text-center">
                                {locale.discordembedtitle}
                            </div>
                            <div className="flex flex-row-reverse justify-center">
                                <div className="m-4">
                                    <div className="koodak text-3 text-center text-[24px] dejavu">
                                        touhou.ir
                                    </div>
                                    <div className="flex flex-col">
                                        <img className="rounded-[64px]" src="https://cdn.discordapp.com/icons/721026661990137947/a_01df922d2bf027cbbb3bc31c889685ef.gif" />
                                        <img src="/footer/remilia.gif" />
                                    </div>
                                </div>
                                <iframe className="hidden lg:block rounded-lg" src="https://discord.com/widget?id=721026661990137947&theme=dark" width="250" height="350" allowtransparency="true" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
                            </div>
                        </div>
                    </a>
                </AnimateEnter>
                <AnimateEnter>
                    <div className="bg-4 h-19/20 p-4 rounded-2xl border-solid border-t-1 border-l-1 border-r-1 m-4 shadow-1 shadow-xl justify-evenly flex-col pl-8 pr-8 flex" >
                        <div className="text-[32px] mt-2 mb-2 text-center lg:text-left lg:text-[90%] text-3 basis-1/3 items-center flex" dir="rtl">{locale.resourcesname}</div>
                        <div className="flex flex-col basis-2/3 gap-7.5" >
                            <ResourceContent title={locale.resource1name} link={locale.resource1link} linkTitle={locale.resource1linkname} />
                            <ResourceContent title={locale.resource2name} link={locale.resource2link} linkTitle={locale.resource2linkname} />
                            <ResourceContent title={locale.resource3name} link={locale.resource3link} linkTitle={locale.resource3linkname} />
                            <ResourceContent title="دنپا:" link="https://denpa.touhou.ir" linkTitle="denpa.ir" />
                        </div>
                    </div>
                </AnimateEnter>
            </div>
            <div className="m-4 text-xl text-center text-1 dejavu">Touhou Project is a series created by ZUN of Team Shanghai Alice. All rights to original content belong to their respective owners.</div>
        </div>
    )
}
