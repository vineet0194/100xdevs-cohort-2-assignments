export default function OldCard(){
    return (
        <div className="card" style={{

            }}>
            <h2>Lokeshwar</h2>
            <p className="text">A TA in the 100xDevs Cohort 2.0 lorem100</p>
            <h3>Interests</h3>
            <div className="text">
                <ul style={{
                    "listStyleType": "none",
                    padding: "0px"
                }}>
                    <li>Ionic</li>
                    <li>OS</li>
                    <li>AppDev</li>
                </ul>
            </div>
            <div >
                <button className="btn">LinkedIn</button>
            </div>
        </div>
    )
}