/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Card} from 'reactstrap';

const Jumbotron = ({ link = '#', data }) => {
  return (
    <div className=" mb-5">
        <div className="jumbotron ">
        <h1 className="display-4">Olá, {data.nome}.</h1>
            <p className="lead">Seja bem vindo ao Cabelus. <br/>
            Para agendar seu atendimento, clique em "Próximo".<br/>
            </p>
            <div className="my-4">
                <p>Caso precise de ajuda, fale com nosso suporte</p>
            </div>
        </div>
    </div>
  );
};

export default React.memo(Jumbotron);
