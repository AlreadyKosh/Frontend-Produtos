import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

 
class CriarCategoria extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            categoria: {
                nome_categoria: "",
                descricao_categoria: "",
                ativo_categoria: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/categorias" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset >
                        <legend>Criar uma nova Categoria</legend>
                        <div className="categoria-insert">
                            <label htmlFor="nome">Nome da Categoria</label>
                            <br />
                            <input
                                type="text"
                                id="nome_categoria"
                                name="nome_categoria"
                                placeholder="Nome da Categoria"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.categoria.nome_categoria}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="categoria-insert">
                            <label htmlFor="descricao">Descrição do Categoria</label>
                            <br />
                            <input
                                type="text"
                                id="descricao_categoria"
                                name="descricao_categoria"
                                placeholder="Descrição do Categoria"
                                required
                                value={this.state.categoria.descricao_categoria}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="categoria-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.categoria.ativo_categoria === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.categoria.ativo_categoria === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            categoria: { ...prevState.categoria, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`https://produtos-backened-p1.herokuapp.com/categorias`, {
            method: "post",
            body: JSON.stringify(this.state.categoria),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default CriarCategoria;