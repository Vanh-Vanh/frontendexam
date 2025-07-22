import dayjs from "dayjs"
import { useState } from "react"
import range from "lodash-es/range"
import clsx from "clsx"

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const Calendar = () => {
  const [dayObj, setDayObj] = useState(dayjs())
  const todayObj = dayjs()

  const thisYear = dayObj.year()
  const thisMonth = dayObj.month()
  const daysInMonth = dayObj.daysInMonth()

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day()

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast = dayObjOfLast.day()

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [confirmedDate, setConfirmedDate] = useState<dayjs.Dayjs>(todayObj)

  const [showYearPicker, setShowYearPicker] = useState(false)
  const [highlightedYear, setHighlightedYear] = useState<number | null>(null)
  const [showCalendar, setShowCalendar] = useState(true)
  const [startYear, setStartYear] = useState(2021)

  const [inputValue, setInputValue] = useState(
  confirmedDate ? confirmedDate.format("MM/DD/YYYY"):""
  )
  const years = Array.from({ length: 20 }, (_, i) => startYear + i)

  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"))
  }

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
  }

  const handleConfirm = () => {
    if (showYearPicker && highlightedYear !== null) {
      const newDate = dayObj.year(highlightedYear)
      setDayObj(newDate)
      setSelectedDate(newDate)
      setShowYearPicker(false)
      setHighlightedYear(null)
    } else if (selectedDate) {
      setConfirmedDate(selectedDate)
    }
    if (selectedDate) {
      setConfirmedDate(selectedDate)
      setInputValue(selectedDate.format("MM/DD/YYYY"))
    }
  }

  const handleCancel = () => {
    setSelectedDate(null)
    setShowCalendar(false)
    setShowYearPicker(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[400px] bg-gray-950 p-6 rounded-xl shadow-md text-white">
        <div className="relative mb-2">
          <label className="absolute left-3 -top-2 text-xs px-1 bg-black text-white">
            Birthday
          </label>
          <input
            type="text"
            className="w-full bg-black border border-gray-500 text-white p-2 rounded hover:border-2 hover:border-white"
            placeholder="mm/dd/yyyy"
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value
              setInputValue(value)

              const parsedDate = dayjs(value,"MM/DD/YYYY",true)
              if (parsedDate.isValid()){
                setSelectedDate(parsedDate)
                setDayObj(parsedDate)
              }           
            }}
            onClick={() => setShowCalendar(true)}
          />
        </div>

        {showCalendar && (
          <>
            {showYearPicker ? (
              <>
                <h3 className="flex">Text</h3>
                <h1 className="flex mb-4 text-4xl font-bold">
                  {dayObj.format("MMM, YYYY")}
                </h1>
                <div className="flex justify-between items-center mb-4">
                  <span
                    onClick={() => setStartYear(startYear - 20)}
                    className="text-white cursor-pointer hover:text-gray-400"
                  >
                    &lt;
                  </span>
                  <div className="cursor-default hover:text-blue-400">
                    {dayObj.format("YYYY")}
                  </div>
                  <span
                    onClick={() => setStartYear(startYear + 20)}
                    className="text-white cursor-pointer hover:text-gray-400"
                  >
                    &gt;
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-sm mb-2">
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={() => setHighlightedYear(year)}
                      onDoubleClick={() => {
                        const newDate = dayObj.year(year)
                        setDayObj(newDate)
                        setSelectedDate(newDate)
                        setShowYearPicker(false)
                        setStartYear(Math.floor(year / 20) * 20)
                      }}
                      className={clsx(
                        "w-16 h-10 flex items-center justify-center rounded-md cursor-pointer transition",
                        {
                          "bg-blue-500 text-white": year === todayObj.year(),
                          "bg-amber-50 text-black": year === highlightedYear && year !== dayObj.year(),
                          "text-gray-300": year !== highlightedYear && year !== dayObj.year(),
                        }
                      )}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="flex">Text</h3>
                <h1 className="flex mb-4 text-4xl font-bold">
                  {dayObj.format("MMM, YYYY")}
                </h1>
                <div className="flex justify-between items-center mb-4">
                  <span
                    onClick={handlePrev}
                    className="text-white cursor-pointer hover:text-gray-400"
                  >
                    &lt;
                  </span>
                  <div
                    onClick={() => setShowYearPicker(true)}
                    className="cursor-pointer hover:text-blue-400"
                  >
                    {dayObj.format("MMMM YYYY")}
                  </div>
                  <span
                    onClick={handleNext}
                    className="text-white cursor-pointer hover:text-gray-400"
                  >
                    &gt;
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-gray-400 mb-2">
                  {weekDays.map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {range(weekDayOf1).map((i) => (
                    <div
                      key={`prev-${i}`}
                      className="text-gray-500 p-2 rounded"
                    >
                      {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
                    </div>
                  ))}

                  {range(daysInMonth).map((i) => {
                    const date = i + 1
                    const currentDate = dayjs(
                      `${thisYear}-${thisMonth + 1}-${date}`
                    )

                    const isToday = currentDate.isSame(todayObj, "day")
                    const isSelected = selectedDate?.isSame(currentDate, "day")
                    const isConfirmed = confirmedDate ? confirmedDate.isSame(currentDate, "day") : currentDate.isSame(todayObj, "day")

                    return (
                      <div
                        key={`day-${i}`}
                        onClick={() => setSelectedDate(currentDate)}
                        onDoubleClick={() => {
                          setSelectedDate(currentDate)
                          setConfirmedDate(currentDate)
                        }}
                        className={clsx(
                          "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition",
                          {
                            "bg-white text-black shadow": isSelected && !isConfirmed,
                            "bg-blue-500 text-white": isConfirmed,
                            "border border-blue-500 text-white": isToday && !isConfirmed && (selectedDate || confirmedDate),
                          }
                        )}
                      >
                        {date}
                      </div>
                    )
                  })}

                  {range(6 - weekDayOfLast).map((i) => (
                    <div
                      key={`next-${i}`}
                      className="text-gray-500 p-2 rounded"
                    >
                      {dayObjOfLast.add(i + 1, "day").date()}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-end items-center pr-6 mt-2 gap-20">
              <button onClick={handleCancel} className="hover:text-gray-400">
                Cancel
              </button>
              <button onClick={handleConfirm} className="hover:text-gray-400">
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Calendar
