import Sidebar from "../../components/app/Sidebar"

export default function Layout({ children }:{children:any}) {
  return (
    <div>
      <Sidebar selectedButton={undefined}/>
      <div className="p-4 min-h-screen bg-zinc-800">
        {children}
      </div>
    </div>
  );
}
