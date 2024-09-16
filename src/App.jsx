import './App.css'
import tree from './assets/tree-removebg-preview.png'
import briefCase from './assets/briefCase.png'
import logo from './assets/logooooooo.png'
import { useState } from 'react'

export default function App() {
  const [inp, setInp] = useState(""); // Text input state
  const [items, setItems] = useState([]); // State to store the list of items
  const [itemNo, setItemNo] = useState("1"); // State to store the item number, default to "1"
  const [sortOption, setSortOption] = useState("1"); // State to store sorting option

  // Function to handle adding new item
  const addItem = () => {
    if (inp.trim()) {
      setItems([...items, { description: `${itemNo} ${inp}`, packed: false }]); // Combine itemNo and input when adding item
      setInp(""); // Clear input after adding
      setItemNo("1"); // Reset itemNo after adding to default "1"
    }
  };

  // Function to toggle packed status
  const togglePackedStatus = (index) => {
    const updatedItems = [...items];
    updatedItems[index].packed = !updatedItems[index].packed;
    setItems(updatedItems);
  };

  // Function to sort items based on selected option
  const sortItems = (option) => {
    let sortedItems = [...items];
    if (option === "2") {
      // Sort by description
      sortedItems.sort((a, b) => a.description.localeCompare(b.description));
    } else if (option === "3") {
      // Sort by packed status
      sortedItems.sort((a, b) => a.packed - b.packed); // Unpacked items come first
    }
    setItems(sortedItems);
  };

  // Handler for sorting option change
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    sortItems(option);
  };

  // Function to clear list
  const removeAllHandler = () => {
    setItems([]);
  };

  // Count the total number of items and packed items
  const totalItems = items.length;
  const packedItems = items.filter(item => item.packed).length;

  return (
    
      <div className="h-screen w-[100%] bg-green-600 flex flex-col shadow-2xl shadow-black">
                                                    {/* logo  */}
        <Logo logoImage={logo} />

                                                  {/* Form */}    
        <Form input={inp} setInput={setInp} addItem={addItem} itemNo={itemNo} setItemNo={setItemNo} />

                                                  {/* PackingList */}
        <Packinglist
          items={items}
          removeHandler={(index) => setItems(items.filter((_, i) => i !== index))}
          removeAllHandler={removeAllHandler}
          sortOption={sortOption}
          handleSortChange={handleSortChange}
          togglePackedStatus={togglePackedStatus}
        />
                                                  {/* Stats */}
        <Stats itemsLength={totalItems} packedQuantity={packedItems} />
      </div>
   
  )
}


                                           //  COMPONENTS DECLARATION 

  // logo Component
export function Logo({ logoImage }) {
  return (
    <div className="h-[20%] max-sm:h-[10%]  bg-[#f19720] w-full flex justify-center items-center gap-4 ">
      <div className='size-12 mb-5 max-sm:size-10 max-sm:mb-3'>
        <img src={tree} alt="tree" />
      </div>
      <img src={logoImage} alt="" className='w-[30%] max-sm:w-[50%]' />
      <div className='size-14 max-sm:size-12'>
        <img src={briefCase} alt="" />
      </div>
    </div>
  )
}

  // Form Component
export function Form({ input, setInput, addItem, itemNo, setItemNo }) {
  const valueHandler = (e) => setInput(e.target.value);

  return (
    <div className="h-[12%] max-sm:h-[20%] bg-[#df6b1b] text-[#4c3423] w-full flex justify-center items-center max-sm:text-sm gap-2 max-sm:py-3 max-sm:flex max-sm:flex-col max-sm:gap-y-1">
      <p className='font-bold'>What do you need for your 😍 trip?</p>

      <select
        name="itemNo"
        id="itemNo"
        value={itemNo}
        onChange={(e) => setItemNo(e.target.value)}
        className='w-20 h-8 text-center rounded-3xl bg-[#fde7aa] border-none'
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <input
        value={input}
        onChange={valueHandler}
        type="text"
        placeholder='Add item'
        className='w-50 font-semibold h-8 px-6 rounded-3xl bg-[#fde7aa] border-none'
      />

      <button
        className='bg-[#67c1a3] w-20 h-8 text-center rounded-3xl border-none font-bold'
        onClick={addItem}
      >
        Add
      </button>
    </div>
  )
}

  // PackingList Component
export function Packinglist({ items, removeHandler, removeAllHandler, sortOption, handleSortChange, togglePackedStatus }) {
  return (
    <div className="h-[60%] max-sm:h-[62%] bg-[#4c3423] w-full flex flex-col justify-between items-center">
      <div className='w-full flex items-start justify-start gap-x-[7.5rem] flex-wrap pl-[6rem] pr-[0rem] py-10 gap-y-4 text max-sm:flex max-sm:justify-start max-sm:pl-10 '>
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            index={index}
            removeHandler={removeHandler}
            togglePackedStatus={togglePackedStatus}
          />
        ))}
      </div>

      <div className='w-full h-10 max-sm:h-16 flex justify-center flex-row items-center gap-x-5 mb-5 font-semibold max-sm:flex max-sm:flex-col  gap-y-3'>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className='w-56 h-8 text-center rounded-3xl text-[#4c3423] bg-[#fde7aa] border-none text-sm'
        >
          <option value="1">Sort By Input order</option>
          <option value="2">Sort By Description</option>
          <option value="3">Sort By Packed Status</option>
        </select>
        <button
          onClick={removeAllHandler}
          className='bg-[#fde7aa] text-[#4c3423] w-28 h-8 text-center rounded-3xl border-none text-sm'
        >
          Clear List
        </button>
      </div>
    </div>
  )
}

  // Item Component
export function Item({ item, index, removeHandler, togglePackedStatus }) {
  return (
    <div className="flex items-center gap-x-3" style={{ flexBasis: "200px" }}>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => togglePackedStatus(index)}
      />
      <p className={`text-[#fde7aa] ml-2 ${item.packed ? 'line-through' : ''}`}>
        {item.description}
      </p>
      <button onClick={() => removeHandler(index)}>❌</button>
    </div>
  )
}

  // Stats Component
export function Stats({ itemsLength, packedQuantity }) {
  const packedFraction = itemsLength ? packedQuantity / itemsLength : 0; // Avoid division by zero
  const packedStatus = (packedFraction * 100); // Percentage of packed items

  return (
    <div className="h-[8%] max-sm:h-[8%] bg-[#67c1a3] text-center flex items-center justify-center font-bold max-sm:flex max-sm:flex-col max-sm:py-5 ">
      <img src={briefCase} alt="" className='size-4' />
      <i className='text-[#4c3423] max-sm:text-sm'>
        You have {itemsLength} items on your list, you already packed {packedQuantity} ({packedStatus}%)
      </i>
    </div>
  )
}
