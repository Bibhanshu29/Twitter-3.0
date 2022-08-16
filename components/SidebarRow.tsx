import React, { SVGProps } from 'react'

// two props we are going to expect is one icon
interface Props{
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
    onClick?: () => {}
}

//typescript was initally develop to check what type of data be can be a string or anything else but javascript does do this
function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    // max width fit container made the that grey hover to fit in the small container of icon
    <div onClick={()=>onClick?.()} className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-500ms ease-out hover:rotate-100 activate:scale-125 group">
        <Icon className="h-6 w-6" />
        <p className="group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl">{title}</p>
    </div>
  )
}

export default SidebarRow