import Header from "../../components/Header";
import useUser from "../../hooks/useUser";

export default function Profile() {
    const { user, loading } = useUser() 
    return (
        <>
            <Header />
            {
                loading ?
                    <h1>Cargando</h1> :
                    <img src={`images/fotoUser/${user?.avatar}`}></img>
            }
        </>
    )
}