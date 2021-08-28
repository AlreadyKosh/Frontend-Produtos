import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Principal extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`https://produtos-backened-p1.herokuapp.com/categorias`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {

        return (
            <div className="opcoes-list">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center mb-5">
                            <h4>Escolha uma das opções abaixo</h4>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex justify-content-center">
                            <Link to={`/categorias`}> <button type="button" class="btn btn-outline-primary">Ver Categorias</button> </Link>

                        </div>

                        <div className="col-3 d-flex justify-content-center">
                            <Link to={`/produtos`}> <button type="button" class="btn btn-outline-danger">Ver Produtos</button> </Link>
                        </div>

                        <div className="col-3 d-flex justify-content-center">
                            <Link to={`/criarProduto`}> <button type="button" class="btn btn-outline-success">Criar Novo Produto</button> </Link>
                        </div>

                        <div className="col-3 d-flex justify-content-center">
                            <Link to={`/criarCategoria`}><button type="button" class="btn btn-outline-info">Criar Nova Categoria</button></Link>
                        </div>
                    </div>
                </div>
 
                
            </div>
        )
    }
    
}
 
export default Principal;