import React from "react";

const CheckBox = ({isCompleted, onClick = ()=>{}}) => {
  return (
    <span onClick={onClick} style={{
    width: '40px',
    height: '40px',
    border: '2px solid teal',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
  }}>
    {isCompleted ? (
    // Галочка
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="cornflowerblue" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    // Крестик
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="cornflowerblue" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )}
  </span>
  )
}
export default CheckBox