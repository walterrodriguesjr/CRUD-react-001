import React from "react";

/* Componentes do Bootstrap */
import { Table, Button, Form, Modal } from 'react-bootstrap';


class Alunos extends React.Component {

    constructor(props) {
        super(props)


        this.state = {
            id: 0,
            nome: '',
            email: '',
            /* array vazio que no final do método componentDidMount() recebe os dados de 'dados' */
            alunos: [],
            modalAberta: false
        }
    }

    /* método que executa quando o componente em questão é montado */
    componentDidMount() {
        /* executa a função buscarAluno() que contém o fetch GET */
        this.buscarAluno();
    }

    /* método que executa quando o componente em questão é desmontado */
    componentWillUnmount() {

    }

    /* método que faz o GET dos dados de alunos da API */
    buscarAluno() {
        /* fazendo a requisição GET desta API */
        fetch("http://localhost:8989/api/alunos")
            /* então retorna os dados no primeiro parâmetro 'resposta' e em seguida os dados contidos 
            em 'resposta' são convertidos para json */
            .then(resposta => resposta.json())
            /* então os dados de 'resposta' já em json, vão para 'dados' */
            .then(dados => {
                /* os dados contidos em 'dados' são setados em 'alunos', que até então está como array 
                vazio */
                this.setState({ alunos: dados })
            })
    }

    /* método que faz o POST dos dados de alunos da API */
    /* o parâmetro 'aluno', contém os dados do state dos inputs do form */
    cadastraAluno = (aluno) => {
        fetch("http://localhost:8989/api/alunos", {
            method: 'POST',
            /* informa o tipo de dado que está sendo enviado pelo POST */
            headers: { 'Content-type': 'application/json' },
            /* coverte os dados enviados no corpo da requisição em JSON */
            body: JSON.stringify(aluno)
        })
            /* então retorna a resposta(resultado) da requisição, o status */
            .then(resposta => {
                /* se o POST der certo e retorna 'ok', executa o método buscarAluno() novamente */
                if (resposta.ok) {
                    console.log(resposta);
                    alert("Aluno cadastrado com sucesso!");
                    this.fecharModal();
                    this.reset();
                    this.buscarAluno();
                } else {
                    /* caso ocorra algum erro na requisição com a API */
                    alert('Não foi possível adicionar o aluno.');
                }
            })
    }

    /* método que faz o GET(show) dos dados de alunos da API */
    carregarAluno = (id) => {
        /* fazendo a requisição GET desta API usando o id do aluno como parâmetro */
        fetch("http://localhost:8989/api/alunos/" + id,
            { method: 'GET' })
            /* então retorna a resposta da requisição convertendo em JSON*/
            .then(resposta => resposta.json())
            .then(dados => {
                /* dados contém o objeto do id selecionado */
                /* passando os dados do objeto que veio da requisição para o state, que envia para o input */
                this.setState({
                    id: dados.id,
                    nome: dados.nome,
                    email: dados.email
                })
                this.abrirModal();
            })
    }

    /* método que faz o UPDATE dos dados de alunos da API */
    /* o parâmetro 'aluno', contém os dados do state dos inputs do form */
    atualizarAluno = (aluno) => {
        fetch("http://localhost:8989/api/alunos/" + aluno.id, {
            method: 'PUT',
            /* informa o tipo de dado que está sendo enviado pelo PUT */
            headers: { 'Content-type': 'application/json' },
            /* coverte os dados enviados no corpo da requisição em JSON */
            body: JSON.stringify(aluno)
        })
            /* então retorna a resposta(resultado) da requisição, o status */
            .then(resposta => {
                /* se o PUT der certo e retorna 'ok', executa o método buscarAluno() novamente */
                if (resposta.ok) {
                    console.log(resposta);
                    alert("Aluno atualizado com sucesso!");
                    this.fecharModal();
                    this.reset();
                    this.buscarAluno();
                } else {
                    /* caso ocorra algum erro na requisição com a API */
                    alert('Não foi possível atualizar o aluno.');
                }
            })
    }

    /* método que faz o DELETE dos dados de alunos da API */
    deletarAluno = (id) => {
        /* fazendo a requisição DELETE desta API */
        fetch("http://localhost:8989/api/alunos/" + id,
            { method: 'DELETE' })
            /* então retorna a resposta(resultado) da requisição, o status */
            .then(resposta => {
                /* se a deleção der certo e retorna 'ok', executa o método buscarAluno() novamente */
                if (resposta.ok) {
                    alert("Aluno deletado com sucesso!");
                    this.buscarAluno();
                } else {
                    /* caso ocorra algum erro na requisição com a API */
                    alert('Não foi possível deletar o aluno.');
                }
            })
    }

    /* método que renderiza a tabela com lista de alunos */
    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {/* trazendo os dados em loop para dentro da tabela usando o método map(), dados vindo 
            do state que contém os dados */}
                    {
                        this.state.alunos.map((aluno) =>
                            <tr>
                                {/*   <td key={aluno.id}></td> */}
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td><Button variant="success" onClick={() => this.carregarAluno(aluno.id)}>Atualizar</Button>
                                    <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    /* função que captura e mantém atualizado no state os dados digitados no input nome */
    atualizaNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

    /* função que captura e mantém atualizado no state os dados digitados no input email */
    atualizaEmail = (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    /* função acionada pelo button submit do form, que cria um objeto (const aluno) e insere dentro, 
    os dados contidos nos state de nome e email */
    submit = () => {
        /* se o id contido no state do aluno for igual a 0, o botão será para cadastrar */
        if (this.state.id === 0) {
            /* aluno será enviado como parâmetro na requisição cadastraAluno(aluno) como parâmetro */
            const aluno = {
                nome: this.state.nome,
                email: this.state.email,
            }
            /* executa a função  cadastraAluno() com a const aluno já contendo os dados do state dos inputs*/
            this.cadastraAluno(aluno);
        } else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email,
            }
            this.atualizarAluno(aluno);
        }
    }

    /* função que reseta (limpa) os campos de inputs do formulário */
    reset = () => {
        this.setState(
            {
                id: 0,
                nome: '',
                email: '',
            }
        )
    }

        /* método que fecha o modal */
    fecharModal = () => {
        this.setState(
            {
                modalAberta: false
            }
        )
        this.reset();
    }

    /* método que abre o modal */
    abrirModal = () => {
        this.setState(
            {
                modalAberta: true
            }
        )
    }

        /* método que renderiza o form com modal dentro com campos de inputs */
    render() {
        return (
            <div>

                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dados do Aluno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>

                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly={true} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.atualizaNome} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Digite o e-mail do aluno" value={this.state.email} onChange={this.atualizaEmail} />
                                <Form.Text className="text-muted">
                                    utilize o melhor e-mail do aluno.
                                </Form.Text>
                            </Form.Group>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={this.submit}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="secondary" onClick={this.abrirModal}>
                    Novo
                </Button>

                {this.renderTabela()}
            </div>
        )
    }
}

export default Alunos;