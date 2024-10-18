import React from 'react'


const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Legal</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

LegalLayout.displayName = 'LegalLayout'

export default LegalLayout
