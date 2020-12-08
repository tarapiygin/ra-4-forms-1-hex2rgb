import { React, useState } from 'react';
import './Converter.css';


export default function Converter() {
  const [state, setInput] = useState({
    valueRGB: null,
    error: null,
  });

  const hex2rgb = (hex) => {
    const checkValiduty = (/^#[a-f\d]{6}$/i).test(hex);
    if (!checkValiduty) {
      return null;
    }
    const bigint = parseInt(hex.split('#')[1], 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${(r)}, ${(g)}, ${(b)})`;
  }

  const onChangeHex = (e) => {
    e.preventDefault();
    if (e.target.value.length > 6) {
      const rgb = hex2rgb(e.target.value);
      if (rgb !== null) {
        setInput((prevState) => ({ ...prevState, valueRGB: rgb, error: null }));
        return;
      }
      setInput((prevState) => ({ ...prevState, error: 'неправильный ввод' }));
    }
  }
  const containerStyle = {
    backgroundColor: state.valueRGB,
  }

  return (
    <div className='Converter' style={containerStyle}>
      <input className='Converter_hex-input' onChange={onChangeHex} id="hex" name="hex" />
      <div className='Converter_rgb-output'>{state.error || state.valueRGB}</div>
    </div >
  )
}