import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import Down from '../src/assets/down.png';
import Up from '../src/assets/up.png';

const App = () => {
    //primeiro fazer o json, depois as variaveis e logicas, filnalmente o html com formulario e exebição
    //fazer tudo junto depois separar em componentes, ajuda
    //IMC
    //type
    type level = {
        title: string;
        bg: string;
        icon: string;
        imc: number[];
    };

    const levels: level[] = [
        { title: 'Magreza', bg: 'secondary', icon: 'Down', imc: [0, 18.5] },
        { title: 'Normal', bg: 'success', icon: 'Up', imc: [18.6, 24.9] },
        { title: 'Sobrepeso', bg: 'warning', icon: 'Down', imc: [25, 29.9] },
        { title: 'Obesidade', bg: 'danger', icon: 'Down', imc: [30, 39.9] },
        { title: 'Obesidade Mórbida', bg: 'danger', icon: 'Down', imc: [40, 49.9] },
        { title: 'Obesidade Extrema', bg: 'danger', icon: 'Down', imc: [50, 59.9] },
    ];

    const [imc, setImc] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [level1, setLevel1] = useState<level | null>(null);
    const [show, setShow] = useState(false);

    //já use o type para o tipo da variável

    useEffect(() => {
        const calculateIMC = () => {
            const imc = weight / (height / 100) ** 2;
            setImc(imc);
            const level2: level | undefined = levels.find(
                (l) => l.imc[0] <= imc && imc <= l.imc[1],
            );
            if (level2) {
                setLevel1(level2);
            }
        };
        calculateIMC();
    }, [height, weight]);

    return (
        <>
            <style type='text/css'>
                {`
                    .btn-flat {
                    background-color: purple;
                    color: white;
                    }
                `}
            </style>

            <Container>
                <Row className='mt-3'>
                    <Col md={6}>
                        <Row>
                            <h1>Calculadora de IMC</h1>
                            <hr className='mb-lg-4 mb-md-2' />
                            <Form>
                                <Form.Group controlId='formHeight'>
                                    <Form.Label>Altura (cm)</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Digite sua altura em centímetros'
                                        //se for 0 o valor mostrar o placeholder
                                        value={height ? height : ''}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                    />
                                </Form.Group>
                                <Form.Group controlId='formWeight'>
                                    <Form.Label>Peso (kg)</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Digite seu peso em kg'
                                        value={weight ? weight : ''}
                                        onChange={(e) => setWeight(Number(e.target.value))}
                                    />
                                </Form.Group>
                                <Button
                                    variant='primary'
                                    onClick={() => setShow(!show)}
                                    //se tiver não tiver show dar uma margem para baixo
                                    className={show ? 'mt-3' : 'mt-3 mb-3'}
                                >
                                    Calcular
                                </Button>
                            </Form>
                        </Row>

                        {show && (
                            <Row>
                                {/* sempre que tiver uma row dentro de uma col, colocar uma Col se não ultrapassa o limite */}
                                <Col md={12}>
                                    {level1 && (
                                        <Card bg={level1.bg} text='white' className='mt-3 mb-3'>
                                            <Card.Img
                                                //reduzir o tamanho da imagem
                                                style={{ width: '15%' /* margin: 'auto' */ }}
                                                className={'mx-auto mt-3'}
                                                variant='top'
                                                src={level1.icon === 'Down' ? Down : Up}
                                            />
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    <h2>{level1.title}</h2>
                                                    {/* <img
                                                src={level1.icon === 'Down' ? Down : Up}
                                                alt={level1.title}
                                            /> */}
                                                </Card.Title>
                                                <h4>IMC: {imc.toFixed(2)}</h4>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </Col>
                            </Row>
                        )}
                    </Col>
                    <Col md={6} className={'text-white'}>
                        {/* utilize col-md-6 para cada card, alinhe no centro os itens, utilize o backgrond correto */}
                        <Row>
                            {levels.map((level: level, index) => (
                                <Col xs={6} md={12} lg={6} className={'text-white'} key={index}>
                                    <Card bg={level.bg} className={'mb-4'}>
                                        {/* colocar a imagem em cima com um whidth de 20 tudo centralizado */}
                                        <Card.Img
                                            //reduzir o tamanho da imagem
                                            style={{ width: '20%' /* margin: 'auto' */ }}
                                            className={'mx-auto mt-3'}
                                            variant='top'
                                            src={level.icon === 'Down' ? Down : Up}
                                        />
                                        <Card.Body className='text-center'>
                                            <Card.Title>{level.title}</Card.Title>
                                            <Card.Text>
                                                {level.imc[0]} - {level.imc[1]}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;
