import { Drawer } from '@mui/material'
import { ReactNode } from 'react'

interface PermanentProps {
    children:ReactNode
}

const Permanent = ({children}:PermanentProps) => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{
      display:{
        xs:'none',
        md:'block',
      }
    }}>
        {children}
    </Drawer>
  )
}



export default Permanent