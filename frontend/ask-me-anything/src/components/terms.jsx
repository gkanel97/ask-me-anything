function Terms(props) {
    return (
        <div className="card">
            <div className="card-header fw-bold fs-2">
                Terms &amp; Conditions
            </div>
            <div className="card-body p-5">
                <ol>
                    <li className="my-2 fs-5" style={{ textAlign: "justify" }}>
                        By registering and using this application to ask and answer questions you agree that the personal data you provided with your registration
                        (username, email, password and full name) will be stored and processed by this app. We will not use your data for any other purpose.
                        If for any reason you want your data removed from the app, request removal by email.
                    </li>
                    <li className="my-2 fs-5" style={{ textAlign: "justify" }}>This application does not use cookies.</li>
                    <li className="my-2 fs-5" style={{ textAlign: "justify" }}>The software is provided as is without any further guarantee.</li>
                    <li className="my-2 fs-5" style={{ textAlign: "justify" }}>We hold no responsibility for the content posted on this app.</li>
                </ol>
            </div>
        </div>
    );
}

export default Terms;