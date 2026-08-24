import Link from "next/link";

interface ButtonProps {
  content: string;
  isDark: boolean;
}

export default function MainButton({content, isDark} : ButtonProps) {
      
return (
      <>
        
          <div className={`bg-(--primary-color) cursor-pointer w-full md:w-fit  hover:opacity-90 ${isDark ? "bg-(--secondary-color) text-(--primary-color)" : "text-(--secondary-color) border"} text-xs md:text-sm font-normal px-8 py-3 rounded-sm transition-all shadow-md group`}>
            <div className="relative overflow-hidden">
              <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                {content}
              </p>
              <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                {content}
              </p>
            </div>
          </div>
      </>
  )
}
