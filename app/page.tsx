"use client"
import {useState, useRef}from "react"
import Image from "next/image"
import { GrLocationPin } from "react-icons/gr";



const DragItem:React.FC<any> = ({item,handleDragStart,handleOnDrop,isActive})=>{
      const [hoveredOver,setHoveredOver] = useState(false);
      const dragImgRef = useRef<any>();

  const dragStart = (e:any,item:any)=>{
      console.log('dragStart!');
      handleDragStart(e,item);
      e.dataTransfer.setData("cardId",item.id);
      e.dataTransfer.setDragImage(dragImgRef.current,10,10);

          // e.dataTransfer.dropEffect = 'none'     tried eliminating the default green-circle but
          // e.dataTransfer.effectAllowed = 'none'  nukes the API functionality.
  }

  const dragOver = (e:any)=>{
    e.preventDefault()
    setHoveredOver(true)
  }

  const dragLeave=(e:any)=>{
    e.preventDefault();
    setHoveredOver(false);

  }

  const onDrop=(e:any,item:any)=>{
    let dragCardId = e.dataTransfer.getData("cardId");
    handleOnDrop(dragCardId,item)
    setHoveredOver(false);


  }


  return (
    <li className={`${isActive ? 'opacity-40 bg-muted' : 'opacity-100 bg-white'} cursor-pointer py-2 px-4 flex items-center gap-5  ${hoveredOver ? `border-b-4 border-hovered` : '' }`} key={item.id} draggable={true} onDragStart={(e)=>dragStart(e,item)}  onDragOver={(e)=>dragOver(e)} onDragLeave={(e)=>dragLeave(e)} onDrop={(e)=>onDrop(e,item)}>
      <div>
        <Image src={item.img} width={96} height={96} alt="img" className="rounded-lg"/>
      </div>
      <div>
        <h3 className="custom-bold-font text-dark">{item.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <div className="relative">
            <GrLocationPin color="#a8a9ae" />
            <div className="absolute w-[50%] left-[25%] h-[1px] bg-gray-400 -translate-y-[2px]"></div>
          </div>
          <h5 className="custom-thin-font text-muted">{item.location}</h5>
        </div>
      </div>
      <div ref={dragImgRef} id={`customDragImage-${item.id}`} className={`absolute  transition duration-[.0001s] ${isActive ? 'opacity-100 translate-x-[2000px]' : 'opacity-0' } flex items-center gap-2 bg-white p-2 rounded-md shadow-md min-w-[288px]`}>
        <div>
          <Image src={item.img} width={32} height={32} alt="img" className="rounded-lg"/>
        </div>
        <h5 className="text-dark custom-bold-font">{item.title}</h5>

      </div>
    </li>

  )
}




export default function Home() {
  const [data,setData]=useState([
    {id:1,title:"Scotland Island",location:"Sydney, Australia",img:"/assets/scotlandisland.png"},
    {id:2,title:"The Charles Grand Brassserie & Bar",location:"Lorem ipsum, Dolor",img:"/assets/charlesgrandbar.png"},
    {id:3,title:"Bridge Climb",location:"Dolor, Sit amet",img:"/assets/bridgeclimb.png"},
    {id:4,title:"Scotland Island",location:"Sydney, Australia",img:"/assets/scotlandisland2.png"},
    {id:5,title:"Clamb Bar",location:"Etcetera veni, Vidi vici",img:"/assets/clambar.png"},
    {id:6,title:"Vivid Festival",location:"Sydney, Australia",img:"/assets/vividfestival.png"}
  ])
  const [active,setActive] = useState<any>(null);


  const handleDragStart=(e:any,card:any)=>{
    setActive(card)
  }

  const handleOnDrop=(dragCardId:any,destination:any)=>{
    // e.dataTransfer.setData("cardId",card.id);
    // console.lo
    let dragCard = data.filter(d=>d.id == dragCardId)[0];
    console.log(dragCard,destination);
    setData((data)=>data = data.map((d:any)=>d.id == dragCard.id ? destination : d.id == destination.id ? dragCard : d))
    setActive(null);
  }


  return (
    <main className={`py-10 px-2 flex min-h-screen flex-col items-center justify-between md:p-20 bg-gray-100`}>
      <ul className="w-[90%] md:w-[560px] bg-white py-2" id="draglist">
        {data.map(item=>(
          <DragItem key={item.id} isActive={active?.id == item.id} item={item} handleDragStart={handleDragStart} handleOnDrop={handleOnDrop}/>
        ))}
      </ul>
    </main>
  );
}
