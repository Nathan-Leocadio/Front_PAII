import styles from "../../pages/Garcom/ItensCardapioGarcom.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"

function ItensCardapioGarcom(){
    const [itens,setItem] = useState([])
    const [itens2,setItem2] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() =>{
        api.get('/item',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setItem(response.data.itens)
            setItem2(response.data.itens)
        })
    }, [token])

    function selecionarItens(s){
        let itensSelecionados = []
        for(let i in itens2){
            if(itens2[i].tipo == s){
                itensSelecionados.push(itens2[i])
            }
        }
        setItem(itensSelecionados)
    }

    function selecionarTodos(){
        setItem(itens2)
    }

    return(
        <section className={styles.ItensCardapioGarcom}>
            <h1>Cardapio</h1>
            <div>
                <button onClick={selecionarTodos} className={styles.btnOp}>Todos</button>
                <button onClick={()=> selecionarItens(1)} className={styles.btnOp}>Comidas</button>
                <button onClick={()=> selecionarItens(2)} className={styles.btnOp}>Bebidas</button>
                <button onClick={()=> selecionarItens(3)} className={styles.btnOp}>Sobremesas</button>
                <button onClick={()=> selecionarItens(4)} className={styles.btnOp}>Diversos</button>
            </div>

            <div className={styles.elementosPaginaItens}>
                {itens.length > 0 &&
                    itens.map((item) =>(
                        <div key={item.id} className={styles.PaginaItens}>
                            <p>Id: {item._id}</p>
                            <p>Nome: {item.nome}</p>
                            <p>Descrição: {item.descricao}</p>
                            <p>Preço: {item.preco}</p>
                            {item.tipo == 1 && <p>Comida</p>}
                            {item.tipo == 2 && <p>Bebida</p>}
                            {item.tipo == 3 && <p>Sobremesa</p>}
                            {item.tipo == 4 && <p>Diversos</p>}
                            <br/><br/>
                        </div>
                    ))
                }
                
                {itens.length === 0 && <p>não ha item cadastrado</p>}
            </div>
        </section>
    )

}

export default ItensCardapioGarcom