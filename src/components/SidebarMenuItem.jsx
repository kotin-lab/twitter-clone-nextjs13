export default function SidebarMenuItem({text, Icon, active}) {
  return (
    <div className="hoverEffect w-auto flex items-center xl:justify-start xl:space-x-4 justify-center text-lg text-gray-700">
      <Icon className="h-7 w-7" />
      <span className={`${active && 'font-bold'} hidden xl:inline`}>{text}</span>
    </div>
  )
}
