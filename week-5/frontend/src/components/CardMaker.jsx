import Card from './Card'

export default function CardMaker( {userData} ){
    return(
        userData.map((user, index)=>{
            return <Card key={index} user={user}/>
        })
    )
}