import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/Auth'

import Home from './pages/Home'
import Docs from './pages/docs/Index'
import DocNew from './pages/docs/New'
import DocShow from './pages/docs/Show'
import AuthGuard from './components/AuthGuard'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<AuthGuard />}>
                        <Route exact path="/doc" element={<Docs />} />
                        <Route exact path="/doc/new" element={<DocNew />} />
                        <Route exact path="/doc/new" element={<DocNew />} />
                        <Route exact path="/doc/:id" element={<DocShow />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
