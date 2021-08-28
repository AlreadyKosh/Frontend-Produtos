import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarCategoria extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            categoria: {
                nome_categoria: "",
                descricao_categoria: "",
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
 
    componentDidMount() {
        const { id_categoria } = this.props.match.params;
 
        fetch(`https://produtos-backened-p1.herokuapp.com/categorias/${id_categoria}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produto: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/categorias" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Atualizar Categoria</legend>
                        <div className="produto-update">
                            <label htmlFor="nome_categoria">Nome </label>
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
                        <div className="produto-update">
                            <label htmlFor="descricao_categoria">Descricao da Categoria </label>
                            <br />
                            <input
                                type="text"
                                id="descricao_categoria"
                                name="descricao_categoria"
                                placeholder="Descrição da Categoria"
                                required
                                value={this.state.categoria.descricao_categoria}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produto-update">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo_categoria"
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
                                    name="ativo_categoria"
                                    checked={this.state.categoria.ativo_categoria === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
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
    };
 
    handleSubmit = event => {
        const { id_categoria } = this.state.categoria;
 
        fetch(`https://produtos-backened-p1.herokuapp.com/categorias/${id_categoria}`, {
            method: "put",
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
 
export default EditarCategoria;