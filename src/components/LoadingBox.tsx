import { Spinner } from "react-bootstrap";

export default function LoadingBox() {
    return (
        <div style={{ width: '100vw', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>

    )
}