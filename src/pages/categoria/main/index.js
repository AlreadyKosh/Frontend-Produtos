import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            categoria: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`https://produtos-backened-p1.herokuapp.com/categorias`)
            .then(categoria =>
                categoria.json().then(categoria => this.setState({ categoria }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { categoria } = this.state;

        return (
            <div className="produto-list">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome da Categoria</th>
                            <th scope="col">Descrição da Categoria</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoria.map((categoria, index) => (
                            <tr>
                                <th scope="row">{categoria.id_categoria}</th>
                                <td>{categoria.nome_categoria}</td>
                                <td>{categoria.descricao_categoria}</td>
                                <td>{categoria.ativo_categoria ? "Sim" : "Não"}</td>
                                <td> <Link to={`/categorias/${categoria.id_categoria}`}> 
                                <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarCategoria/${categoria.id_categoria}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>                                
                                <td> <Link to={`/deletarCategoria/${categoria.id_categoria}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>                           
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}