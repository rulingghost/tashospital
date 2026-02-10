import classNames from 'classnames'
import React from 'react'

const PageButton = ({page, setActivePage, activePage}) => {
  
  return (
    <button
          onClick={() => page != "..." && setActivePage(page)}
          className={classNames(
            "relative z-10 inline-flex items-center border hover:bg-slate-100 border-gray-300 px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            {"bg-cyan-600 text-white hover:!bg-cyan-600" : activePage == page}
          )}
    >
          {page}
    </button>
  )
}

export default PageButton