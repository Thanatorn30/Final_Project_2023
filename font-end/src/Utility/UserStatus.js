function UserStatus(props){
    const {joinrate,sportmanship,moody,punctual,maxScore} = props
    return(
        <div className="d-flex flex-column align-items-center" style={{marginTop:'16px', marginBottom:'16px'}}>
            <p className="header-text"><span style={{ color:"rgba(204, 49, 17, 1)"}}>Status</span></p>
            <div>
            <p className="body-text">Join Rate : <span style={{marginLeft:'8px'}}>{joinrate}/{maxScore*3}</span></p>
            <p className="body-text">Sportsmanship : <span style={{marginLeft:'8px'}}>{sportmanship}/{maxScore*3}</span></p>
            <p className="body-text">Moody : <span style={{marginLeft:'8px'}}>{moody}/{maxScore*3}</span></p>
            <p className="body-text">Punctual : <span style={{marginLeft:'8px'}}>{punctual}/{maxScore*3}</span></p>
            </div>
            
        </div>
    )
}

export default UserStatus