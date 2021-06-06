import React from "react";
import './App.css';
import CustomTable from "../Table/Table";
import SimpleModal from "../Modal/Modal";

function App() {

    const [open, setOpen] = React.useState(false);

    return (
        <div className="App">
            <header className="header">
                <h2>Test task</h2>
            </header>
            <main className="content">
                <CustomTable
                    open={open}
                    setOpen={setOpen}
                />
                <SimpleModal
                    open={open}
                    setOpen={setOpen}
                />
            </main>
            <footer className="footer">
            </footer>
        </div>
    );
}

export default App;
