import React,{useState} from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem} from './components/GridItem';

import {levels, calculateImc, Level} from './helpers/imc';

function App() {
  //Minhas variáveis
  const [heightField, SetHeightField] = useState<number>(0);
  const [weightField, SetWeightField] = useState<number>(0);
  const [toShow, SetToShow] = useState<Level | null>(null);

  //Funções
  function handleCalculateButton(){
    if(heightField && weightField){
      SetToShow(calculateImc(heightField, weightField));
    }else{
      alert("Digite os bagulhos.")
    }
  }

  function handleBackButton(){
    SetToShow(null);
    SetHeightField(0);
    SetHeightField(0);
  }

  //HTML
  return (
    <div className={styles.main}>
      {/* ////// */}
      {/* ////// */}
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>

      <div className={styles.container}>
        {/* ////// */}
        {/* ////// */}
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC, é um cálculo simples que permite medir se alguém está ou não com o peso ideal. Ele aponta se o peso está adequado ou se está abaixo ou acima do peso.</p>

          <input type="number" placeholder='Digite sua altura. Ex: 1.4m' 
          value={heightField>0?heightField:""} 
          onChange={evento => SetHeightField(parseFloat(evento.target.value))}
          disabled={toShow? true: false}
          />

          <input type="number" placeholder='Digite seu peso. Ex: 78.4kg' 
          value={weightField>0?weightField:""} 
          onChange={evento => SetWeightField(parseFloat(evento.target.value))}
          disabled={toShow? true: false}
          />

          <button onClick={handleCalculateButton} disabled={toShow? true: false} >Calcular IMC</button>
        </div>
        {/* ////// */}
        {/* ////// */}
        {/* ////// */}
        <div className={styles.rightSide}>
          {/* ////// */}
          {/* ////// */}
          {!toShow &&                        //quando nao tiver o resultado mostra o grid
            <div className={styles.grid}>
              {levels.map((item,key)=>(
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          { toShow &&                        //quanto tiver algo para mostrar como resultado faça abaixo
            <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt="" width={25}/>
                </div>
              <GridItem item={toShow} />     {/* vai passar com o YOUR IMC para dentro do gridItem */}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
