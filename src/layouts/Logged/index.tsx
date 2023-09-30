import { Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Logged = () => {
    return (
        <>
            <Typography variant="h2" color="secondary">Logged Layout</Typography>
            <Outlet/>
        </>
    )
}

export default Logged