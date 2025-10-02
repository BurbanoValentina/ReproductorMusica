import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <h2
      className="w-full mb-2 text-center font-semibold"
      style={{
        background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)',
        color: '#241a22',
        textShadow: '0 1px 3px #e5a9bf',
        borderRadius: '0.3rem',
        padding: '0.2rem 0',
        boxShadow: '0 1px 3px #e5a9bf',
        fontSize: '1rem',
      }}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
