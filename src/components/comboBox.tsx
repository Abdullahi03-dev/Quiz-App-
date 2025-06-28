// import React from 'react'
import {
    Command,
    // CommandEmpty,
    CommandGroup,
    // CommandInput,
    CommandItem,
    CommandList,
  } from "./ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./ui/popover"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
type comboBoxProps={
  nameData:{name:string;}[];
    data:{label:string;value:string;}[];
    placeholder:string;
    className:string;
    onValueChange?:(value:string)=>void
}
const comboBox = ({nameData,data,placeholder,onValueChange}:comboBoxProps) => {
    const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")


  const handleSelect=(CurrentValue:string)=>{
    setValue(CurrentValue===value?"":CurrentValue);
    setOpen(false)
    if(onValueChange){
      onValueChange(CurrentValue)
    }
  }
  return (
    <>
    
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        {nameData.map((name)=>(
        <span className="mt-5 text-black font-semibold"><h3>{name.name}</h3></span>

        )

        )}
      <PopoverTrigger asChild className="mt-5 text-center flex items-center justify-center">
        
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border border-gray-700"
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      </div>

      <PopoverContent className="w-[200px] p-0 border-4">
        <Command>
          {/* <CommandInput className="h-9" /> */}
          <CommandList>
            {/* <CommandEmpty>No framework found.</CommandEmpty> */}
            <CommandGroup className="border-4">
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    </>
  )
}

export default comboBox