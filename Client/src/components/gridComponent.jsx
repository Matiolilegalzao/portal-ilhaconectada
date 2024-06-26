import React, { useEffect, useState } from "react";
import styles from "./gridComponent.module.css";
function GridComponent() {
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        fetchProjetos();
    }, []);

    const limitarDescricao = (descricao, limite) => {
        if (descricao.length > limite) {
            return descricao.slice(0, limite) + '...';
        } else {
            return descricao;
        }
    };

    const fetchProjetos = async () => {
        try {
            const response = await fetch("http://localhost:4000/projetos");
            const data = await response.json();
            console.log("Projetos buscados")
            setProjetos(data);
        } catch (error) {
            console.error("Erro ao obter os projetos:", error);
        }
    }; 
    return(
        <>
        <div className={styles.gridContainer}>
            {
                projetos.slice(0, 4).map(projeto => { 
                    return (
                    <div className={styles.gridItem}>
                        <h2>{projeto.title}</h2>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.gridDescription}>{limitarDescricao(projeto.description, 150)}</p>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        </>
    )

}

export default GridComponent;

