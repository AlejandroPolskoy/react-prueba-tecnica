import React, { useContext, useState } from 'react';

export const NotesContext = React.createContext( "client" );

export function Notas() {
    const {products, setProducts} = useContext( NotesContext );
    
    return <div className="gallery">
        { products.map((data)=> <Nota key={data.id} item={data}/>) }
        <div className="gallery_item"><button onClick={addProduct}>ADD NEW</button></div>
    </div>

    function addProduct() {
        const pName = prompt("Introdusca el nombre");
        const pAmount = prompt("Introdusca la cantidad");
        
        const newProducts = [...products];
        newProducts.push(
            {
                id: products.length + 1,
                name: pName,
                cantidad: pAmount
            }
        );
        setProducts(newProducts)
    }
}

export function Nota( {item} ) {
    const {products, setProducts, commentsData, setComments, users} = useContext( NotesContext );

    return <div className="gallery_item">
        { users.role == "admin" && <div className="gallery_item__buttons"><button onClick={()=> editProduct(item.id)}>EDIT</button><button onClick={()=>deleteProduct(item.id)}>DELETE</button></div> }
        <p>{item.name}</p>
        <p>Cantidad: {item.cantidad}</p>
        <button onClick={()=>viewComments(item.id)}>Comments</button>
    </div>

    function editProduct( id ) {
        const pName = prompt("Introdusca el nombre");
        const pAmount = prompt("Introdusca la cantidad");
        
        const newProducts = [...products];
        const toEdit = newProducts.find((item)=> item.id === id)
        toEdit.name = pName;
        toEdit.cantidad = pAmount;

        setProducts(newProducts)
    }

    function deleteProduct( id ) {
        setProducts( products.filter(item => item.id !== id) );
    }

    function viewComments( id ) {
        setComments({...commentsData, isShown: true, selectedID: id})
    }
}

export function Comments( {productID} ) {
    const {commentsData, setComments, users} = useContext( NotesContext );
    let text = "";

    return <div className={ commentsData.isShown ? "" : "--hidden" }>
        <ul> 
            { commentsData.comments.map( (data, index)=> commentsData.selectedID == data.idProduct && data.idUser == users.id ? <li key={index}>{data.text}<button onClick={()=>deleteComment(data.id)}>X</button></li> : "" ) } 
        </ul>
        <div><input type="text" name="newCommentText" onChange={(e)=> text = e.target.value} /></div>
        <div><input type="button" onClick={addComment} value="Enviar"/></div>
        <button onClick={cerrar}>Cerrar</button>
    </div>

    function addComment() {
        commentsData.comments.push({id: parseInt( commentsData.comments[commentsData.comments.length-1].id ) + 1, idUser : users.id, idProduct: commentsData.selectedID, text : text})
        setComments({...commentsData})
    }

    function deleteComment( id ) {
        setComments({ ...commentsData, comments : commentsData.comments.filter(item => item.id !== id ) });
    }

    function cerrar() {
        setComments({...commentsData, isShown: false})
    }
}