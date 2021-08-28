import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Categoria extends Component {
    state = {
        categoria: {},
    };
 
    componentDidMount() {
        const { id_categoria } = this.props.match.params;
 
        fetch(`https://produtos-backened-p1.herokuapp.com/categorias/${id_categoria}`)
            .then(categoria =>
                categoria.json().then(categoria => this.setState({ categoria }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { categoria, index } = this.state;
 
        if (categoria.ativo_categoria) {
            categoria.ativo_categoria = "Categoria Ativa";
        } else {
            categoria.ativo_categoria = "Categoria Inativa";
        }
 
        return (
            <div className="categoria-info">
                <h1><label htmlFor="nome_categoria"> Nome do Categoria: </label> {categoria.nome_categoria} </h1>
                <h1> {categoria.ativo_categoria} </h1>
                <h1> <label htmlFor="descricao_categoria">  Descrição do Categoria: </label>{categoria.descricao_categoria} </h1>
                <br />
                <Link to={`/categorias`}> Voltar </Link> <br />
                <Link to={`/editarCategoria/${categoria.id_categoria}`}> Editar </Link> <br />
                <Link to={`/deletarCategoria/${categoria.id_categoria}`}> Deletar </Link> <br />
            </div >
        );
    }
}
