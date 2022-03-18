import React from 'react';
import "./App.less";
import { useRoutes } from './routing/routes';

function App() {
    const routes = useRoutes(false, "guest");
    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;
