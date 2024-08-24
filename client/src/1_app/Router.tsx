import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../3_pages/Login'
import Game from '../3_pages/Game'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </BrowserRouter>
    )
}