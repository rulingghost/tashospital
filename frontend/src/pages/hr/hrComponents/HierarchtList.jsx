
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function HierarchtList({ data }) {
    //console.log(data)
    
  return (
    <Popover>
      <PopoverButton className="flex items-center gap-x-2 text-sm/6 font-semibold text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        <GiHamburgerMenu />Listele
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="divide-y divide-white/5 mt-2 rounded-xl bg-white border-2 border-cyan-600 shadow-lg text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div className="p-3 min-w-[250px] max-h-[300px] overflow-y-auto">
            {  data.people.map((item, index)=> (
                    <a key={index} className="flex items-center gap-x-3 rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                        <img className='rounded-full w-14' 
                            src={item.image} alt=""
                        />
                        <div>
                            <p className="font-semibold text-black">{item.name}</p>   
                            <p className="text-black/50">Detay</p> 
                        </div>        
                    </a>
                ))
            }
        </div>
        {/* <div className="p-3">
          <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
            <p className="font-semibold text-black">Documentation</p>
            <p className="text-black/50">Start integrating products and tools</p>
          </a>
        </div> */}
      </PopoverPanel>
    </Popover>
  )
}