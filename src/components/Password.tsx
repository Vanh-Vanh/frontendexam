
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck as faCircleCheckSolid } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck as faCircleCheckRegular } from "@fortawesome/free-regular-svg-icons"

interface Rule {
  id: number
  text: string
  regax?: RegExp
  validate?: (v: string) => boolean
}

const rules: Rule[] = [
  { id: 1, text: "Have at least one uppercase letter", regax: /[A-Z]/ },
  { id: 2, text: "Have at least one lowercase letter", regax: /[a-z]/ },
  { id: 3, text: "Have at least one number", regax: /[0-9]/ },
  { id: 4, text: "Have at least one special character(!@#$...etc)", regax: /[^A-Za-z0-9]/ },
  { id: 5, text: "Longer than 8 characters", validate: (v: string) => v.length > 8 },
]

const Password = () => {
  const [value, setValue] = useState<string>("")

  const checkValid = (rule: Rule): boolean => {
    if (rule.regax) return rule.regax.test(value)
    if (rule.validate) return rule.validate(value)
    return false
  }

  return (
    <div className="space-y-8 text-white mx-auto">
      <h1 className="text-4xl font-bold mb-20">Password Input</h1>

      {/* Enabled Block */}
      <div className="flex items-center gap-20">
        <label className="w-26 text-sm pt-2 text-gray-500">Enabled</label>
        <div className="w-full relative">
          <label className="absolute left-2 -top-2 text-xs px-1 bg-black text-white">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 pt-4 border border-gray-500 rounded"
            placeholder="Password"
          />
        </div>
      </div>

      {/* Hover */}
      <div className="flex items-center gap-20 mb-20">
        <label className="w-24 text-sm pt-2 text-gray-500">Hover</label>
        <div className="w-full relative">
          <label className="absolute left-2 -top-2 text-xs bg-black text-white">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 pt-4 border-2 border-gray-500 rounded hover:border-white transition"
            placeholder="Password"
          />
        </div>
      </div>

      {/* Active(Typing) */}
      <div className="flex items-start gap-14">
        <label className="w-24 text-sm pt-2 text-gray-500">Active(Typing)</label>
        <div className="w-full relative">
          <label className="absolute left-2 -top-2 text-xs px-2 bg-black text-white">
            Password
          </label>
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 pt-4 border-2 border-amber-50 rounded hover:border-blue-500"
            placeholder="Password"
          />
          <div className="mt-2 bg-neutral-900 text-sm shadow space-y-2 p-4 border-amber-50">
            {rules.map((rule) => {
              const valid = checkValid(rule)
              return (
                <div key={rule.id} className="flex gap-2 items-start">
                  <FontAwesomeIcon
                    icon={valid ? faCircleCheckSolid : faCircleCheckRegular}
                    className={valid ? "text-cyan-400" : "text-gray-500"}
                  />
                  <span className="text-white">{rule.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Password
