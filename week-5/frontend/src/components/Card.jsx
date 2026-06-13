import '../index.css'

// export default function Card({ userName, userDescription, userInterests, userSocials }){
export default function Card( {user} ){
    return (
        <div className='card' style={{

            }}>
            <h2 className='headings'>{user.name}</h2>
            <p className='text'>{user.description}</p>
            <div>
                <h3 className='headings'>Interests</h3>
                <div className='text'>
                    <ul style={{
                        'listStyleType': 'none',
                        padding: '0px'
                    }}>
                        {
                            user.interests.map((interest, index)=>{
                                return <li key={index}>{interest}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='text'>
                {
                    Object.entries(user.socials).map((socialItem, index)=>{
                        return <a key={index} target='_blank' className='btn' href={socialItem[1]}>{socialItem[0]}</a>
                    })
                }
            </div>
        </div>
    )
}