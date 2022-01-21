/* eslint-disable react-hooks/exhaustive-deps */
import { Canvas } from '@react-three/fiber'
import React from 'react'
import ReactDOM from 'react-dom'
import Scene from './components/Scene'
import './index.scss'

ReactDOM.render(
  <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas>
      <Scene />
    </Canvas>
  </div>,
  document.getElementById('root')
)