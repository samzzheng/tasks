import React from "react";
import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";

function App(): React.JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <h1>Samuel Zheng</h1>
            <header>This is my header</header>
            <img
                src="images/kekwait.jpg"
                alt="Zoomed in picture of a mans face"
            />

            <ol>
                <li>Thing 1</li>
                <li>Thing 2</li>
                <li>Thing 3</li>
            </ol>

            <Button
                onClick={() => {
                    console.log("Hello World!");
                }}
            >
                Log Hello World
            </Button>

            <div style={{ background: "red", width: 100, height: 200 }}>
                <Container>
                    <Row>
                        <Col></Col>
                    </Row>
                    <Col></Col>
                </Container>
            </div>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
        </div>
    );
}

export default App;
