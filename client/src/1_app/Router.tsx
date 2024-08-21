import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../3_pages/Login'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}