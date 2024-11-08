import React from 'react';

interface InfoBlockProps {
  className?: string;
  children?: React.ReactNode; 
}

const InfoBlock: React.FC<InfoBlockProps> = ({ className = '', children }) => {
  return (
    <div className={`shadow-2xl bg-white h-[120px] flex justify-center items-center text-black w-[300px] rounded-lg ${className}`}>
      {children} 
    </div>
  );
}

export default InfoBlock;
