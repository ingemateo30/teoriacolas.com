import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface ConceptCardProps {
  title: string;
  description: string;
  formula?: string;
  example?: string;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  description,
  formula,
  example
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <Card className="concept-card">
      <div className="concept-header" onClick={toggleExpand}>
        <h3>{title}</h3>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? '−' : '+'}
        </span>
      </div>
      
      <div className={`concept-content ${isExpanded ? 'expanded' : ''}`}>
        <p className="concept-description">{description}</p>
        
        {formula && (
          <div className="concept-formula">
            <h4>Fórmula:</h4>
            <div className="formula-container">
              {formula}
            </div>
          </div>
        )}
        
        {example && (
          <div className="concept-example">
            <h4>Ejemplo:</h4>
            <p>{example}</p>
          </div>
        )}
      </div>
    </Card>
  );
};