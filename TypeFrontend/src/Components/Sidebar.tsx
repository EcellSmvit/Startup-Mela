import { Instagram,Youtube,Linkedin } from 'lucide-react';

function Sidebar() {
  return (
    <div className='w-10 h-40 bg-[#393E46] p-4 rounded-2xl absolute right-12 text-white flex flex-col items-center justify-center gap-8'>
        <Instagram />
        <Youtube />
        <Linkedin />
    </div>
  )
}

export default Sidebar