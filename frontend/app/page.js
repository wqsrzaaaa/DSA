"use client"
import { useEffect, useState } from 'react';
import { Plus, Trash2, Check, Calendar, Sparkles, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const TodoApp = () => {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [patchinp, setpatchinp] = useState("")
  const [ispatch, setispatch] = useState(false)
  const [patchid, setpatchid] = useState(null)

  const addTask = async () => {
    try {
      if (inputValue.trim().length > 0) {
        const res = await fetch('http://localhost:3001/todo', {
          method: 'POST',
          body: JSON.stringify({
            todo: inputValue
          }),
          headers: {
            "Content-Type": "application/json",
          }
        })
    
        const data = await res.json();
        setTodos([...todos, data?.data])
        setInputValue('')
      }else{
        console.log("type anything ");
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  const patchtask = async () => {
    const res = await fetch(`http://localhost:3001/todo/${patchid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: patchinp
      })
    })
    const data = await res.json()

    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === patchid ? data.patch : todo
      )
    );
    setpatchinp('')
    setpatchid(null)

  }

  const fetchtodos = async () => {
    const res = await fetch('http://localhost:3001/todo')
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchtodos()
  }, [])

  console.log(todos);



  const deleteTask = async (_id) => {
    const res = await fetch(`http://localhost:3001/todo/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    setTodos(todos.filter((todo) => todo._id !== _id))
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;


  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex items-center justify-center p-4 relative overflow-hidden selection:bg-violet-500/30">

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-lg z-10">

        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 p-8 overflow-hidden relative">

          <header className="mb-8 relative z-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h1 className="text-4xl font-bold  tracking-tight mb-1 bg-linear-to-r from-white  to-zinc-800 bg-clip-text text-transparent">
                  Focus
                </h1>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                  <Calendar size={14} />
                  <span>Monday, Feb 2</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-violet-400">{completedCount}</span>
                <span className="text-slate-500 text-lg">/{totalCount}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                  backgroundPosition: ["0% -50%", "-200% -50%"]
                }}
                transition={{
                  width: { duration: 0.5, ease: "circOut" },
                  backgroundPosition: {
                    duration: 5, 
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #8b5cf6, #d946ef, #06b6d4, #8b5cf6)",
                  backgroundSize: "200% 100%"
                }}
                className="h-full rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)] brightness-110"
              />
            </div>
          </header>

          {/* Input Area */}
          <div className="relative mb-8 group z-10">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 pl-5 pr-14 text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-slate-800 transition-all outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTask}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-gradient-to-tr from-violet-600 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow"
            >
              <Plus size={20} strokeWidth={3} />
            </motion.button>
          </div>

          {/* Todo List */}
          <motion.div layout className="space-y-3 relative z-10 min-h-[150px]">
            <AnimatePresence mode='popLayout'>
              {todos.map((todo) => (
                <motion.div
                  layout
                  key={todo._id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${todo.completed
                    ? 'bg-slate-800/30 border-transparent opacity-60'
                    : 'bg-slate-800/60 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                >
                  <div
                    onClick={() => toggleComplete(todo._id)}
                    className="flex items-center gap-4 cursor-pointer flex-1"
                  >
                    {/* Custom Checkbox */}
                    <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors duration-300 ${todo.completed
                      ? 'bg-violet-500 border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                      : 'border-slate-500 group-hover:border-violet-400'
                      }`}>
                      <motion.div
                        initial={false}
                        animate={{ scale: todo.completed ? 1 : 0 }}
                      >
                        <Check size={14} strokeWidth={3} className="text-white" />
                      </motion.div>
                    </div>

                    <span className={`font-medium text-lg transition-all duration-300 ${todo.completed
                      ? 'text-slate-500 line-through'
                      : 'text-slate-200'
                      }`}>
                      {patchid === todo._id ? (<input
                        type="text"
                        value={patchinp}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setpatchinp(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && patchtask()}
                        placeholder="Edit a task..."
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-2 pl-5 pr-14 text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-slate-800 transition-all outline-none"
                      />) : todo.todo}
                    </span>
                  </div>

                  <div className='flex items-center gap-4'>
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#3f5cad" }}
                      whileTap={{ scale: 0.9 }}
                      className='opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:bg-blue-500/10 rounded-lg transition-all'

                    >
                      {patchid !== todo._id ? <Pencil size={18}
                        onClick={() => {
                          setpatchinp(todo.todo), setpatchid(todo._id), setispatch(true)
                        }}
                      /> : <Check size={18}
                        onClick={() => ( patchtask(),
                          setpatchinp(""), setpatchid(null), setispatch(false)
                        )}
                      />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTask(todo._id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:bg-rose-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {todos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-yellow-400/80" />
                </div>
                <p className="text-slate-400 font-medium">All tasks completed!</p>
                <p className="text-slate-600 text-sm mt-1">Time to relax.</p>
              </motion.div>
            )}
          </motion.div>

        </div>

        <div className="absolute -bottom-6 left-0 right-0 h-12 bg-violet-500/10 blur-xl rounded-[50%]" />
      </div>
    </div>


  );
}
export default TodoApp;