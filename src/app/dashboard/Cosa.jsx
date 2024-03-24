import React from 'react';

// Componente de gráfico básico usando SVG
const XYChart = ({ data, width = 400, height = 200 }) => {
    // Calcular los límites del gráfico
    const maxX = Math.max(...data.map(d => d.x));
    const maxY = Math.max(...data.map(d => d.y));

    // Escalar los puntos de datos al tamaño del gráfico
    const scaleX = width / maxX;
    const scaleY = height / maxY;

    return (
        <svg width={width} height={height}>
            {/* Fondo para mejorar el contraste */}
            <rect width={width} height={height} fill="white" stroke="black" stroke-width="1" />

            {/* Dibujar el eje X */}
            <line x1="0" y1={height - 1} x2={width} y2={height - 1} stroke="black" stroke-width="2" />
            {/* Dibujar el eje Y */}
            <line x1="1" y1="0" x2="1" y2={height} stroke="black" stroke-width="2" />
            {/* Dibujar puntos de datos */}
            {data.map((point, index) => (
                <circle
                    key={index}
                    cx={point.x * scaleX}
                    cy={height - point.y * scaleY} // Invertir Y para el origen en la parte inferior izquierda
                    r="3"
                    fill="red"
                />
            ))}
        </svg>
    );
};


export default XYChart;
