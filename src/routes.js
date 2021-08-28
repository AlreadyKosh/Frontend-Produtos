import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Principal from './pages/principal/entrada';

import MainCategoria from './pages/categoria/main';
import CriarCategoria from './pages/categoria/criar';
import EditarCategoria from './pages/categoria/editar';
import DeletarCategoria from './pages/categoria/deletar';
import DetalhesCategoria from './pages/categoria/detalhes';

import MainProdutos from './pages/produto/main';
import DetalhesProduto from './pages/produto/detalhes';
import CriarProduto from './pages/produto/criar';
import EditarProduto from './pages/produto/editar';
import DeletarProduto from './pages/produto/deletar';



const Routes = () => (
    
 
    <BrowserRouter>
         <Switch>
        </Switch>

        <Switch>
            <Route exact path="/" component={Principal} />

            <Route exact path="/categorias" component={MainCategoria} />
            <Route path="/criarCategoria" component={CriarCategoria} />
            <Route path="/editarCategoria/:id_categoria" component={EditarCategoria} />
            <Route path="/deletarCategoria/:id_categoria" component={DeletarCategoria} />
            <Route path="/categorias/:id_categoria" component={DetalhesCategoria} />



            <Route exact path="/produtos" component={MainProdutos} />
            <Route path="/produtos/:id" component={DetalhesProduto} />
            <Route path="/criarProduto/" component={CriarProduto} />
            <Route path="/editarProduto/:id" component={EditarProduto} />
            <Route path="/deletarProduto/:id" component={DeletarProduto} />
        </Switch>
    </BrowserRouter>
)
 
export default Routes;