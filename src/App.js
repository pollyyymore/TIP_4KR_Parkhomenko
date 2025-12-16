import React, { useState, useEffect } from 'react';
import './Kalkulator-IMT.css';

const App = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  
  // Цветовые категории ИМТ
  const bmiCategories = [
    { name: 'Недостаточный вес', min: 0, max: 18.5, color: '#3498db', emoji: '😟' },
    { name: 'Нормальный вес', min: 18.5, max: 25, color: '#2ecc71', emoji: '😊' },
    { name: 'Избыточный вес', min: 25, max: 30, color: '#f1c40f', emoji: '😐' },
    { name: 'Ожирение I степени', min: 30, max: 35, color: '#e67e22', emoji: '😕' },
    { name: 'Ожирение II степени', min: 35, max: 40, color: '#d35400', emoji: '😟' },
    { name: 'Ожирение III степени', min: 40, max: 100, color: '#e74c3c', emoji: '😨' }
  ];

  // Расчет ИМТ
  const calculateBMI = () => {
    if (!weight || !height) {
      setBmi(null);
      setCategory('');
      return;
    }

    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100; // см в метры

    if (weightInKg <= 0 || heightInM <= 0) {
      alert('Пожалуйста, введите корректные значения веса и роста');
      return;
    }

    const bmiValue = weightInKg / (heightInM * heightInM);
    const roundedBmi = Math.round(bmiValue * 10) / 10;
    
    setBmi(roundedBmi);
    
    // Определение категории
    for (const cat of bmiCategories) {
      if (roundedBmi >= cat.min && roundedBmi < cat.max) {
        setCategory(cat.name);
        return;
      }
    }
    
    // Если ИМТ выше всех категорий
    setCategory(bmiCategories[bmiCategories.length - 1].name);
  };

  // Автоматический расчет при изменении данных
  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  // Получение цвета категории
  const getCategoryColor = () => {
    if (!bmi) return '#95a5a6';
    
    for (const cat of bmiCategories) {
      if (bmi >= cat.min && bmi < cat.max) {
        return cat.color;
      }
    }
    
    return bmiCategories[bmiCategories.length - 1].color;
  };

  // Получение emoji для категории
  const getCategoryEmoji = () => {
    if (!bmi) return '';
    
    for (const cat of bmiCategories) {
      if (bmi >= cat.min && bmi < cat.max) {
        return cat.emoji;
      }
    }
    
    return bmiCategories[bmiCategories.length - 1].emoji;
  };

  // Сброс формы
  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  // Форматирование ИМТ для отображения
  const formatBMI = () => {
    if (!bmi) return '';
    return bmi.toFixed(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Калькулятор ИМТ</h1>
        <p className="subtitle">Пархоменко Аркадий ЭФБО-14-24</p>
        <p className="subtitle">Контрольная работа 4</p>
      </header>

      <main className="app-content">
        <div className="calculator-container">
          <div className="input-section">
            <h2>Ваши данные</h2>
            
            <div className="input-group">
              <label htmlFor="weight">
                Вес (кг)
              </label>
              <div className="input-with-slider">
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Например, 70"
                  min="1"
                  max="300"
                  step="0.1"
                />
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={weight || 0}
                  onChange={(e) => setWeight(e.target.value)}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>30</span>
                  <span>200</span>
                </div>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="height">
                Рост (см)
              </label>
              <div className="input-with-slider">
                <input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Например, 175"
                  min="50"
                  max="250"
                  step="0.1"
                />
                <input
                  type="range"
                  min="100"
                  max="250"
                  value={height || 0}
                  onChange={(e) => setHeight(e.target.value)}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>100</span>
                  <span>250</span>
                </div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="reset-btn" onClick={resetForm}>
                Очистить
              </button>
            </div>
          </div>
          
          <div className="result-section">
            <h2>Результат</h2>
            
            {bmi ? (
              <>
                <div className="bmi-display" style={{ borderColor: getCategoryColor() }}>
                  <div className="bmi-value">{formatBMI()}</div>
                  <div className="bmi-label">ИНДЕКС МАССЫ ТЕЛА</div>
                </div>
                
                <div className="category-display" style={{ backgroundColor: getCategoryColor() }}>
                  <span className="category-emoji">{getCategoryEmoji()}</span>
                  <span className="category-text">{category}</span>
                </div>
                
                <div className="bmi-scale">
                  <div className="scale-visualization">
                    {bmiCategories.map((cat, index) => (
                      <div 
                        key={index}
                        className="scale-segment"
                        style={{
                          backgroundColor: cat.color,
                          width: `${100 / bmiCategories.length}%`
                        }}
                      >
                        <span className="scale-label">{cat.min}</span>
                        {index === bmiCategories.length - 1 && (
                          <span className="scale-max-label">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="scale-labels">
                    {bmiCategories.map((cat, index) => (
                      <div key={index} className="scale-category">
                        <div 
                          className="scale-color-indicator" 
                          style={{ backgroundColor: cat.color }}
                        ></div>
                        <div className="scale-category-name">{cat.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="no-data-message">
                <p>Введите вес и рост</p>
                <div className="placeholder-icon">⚖️</div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Калькулятор ИМТ</p>
      </footer>
    </div>
  );
};

export default App;