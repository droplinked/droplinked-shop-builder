import { useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import FiltersPanel from './FilterPanel';

interface AnimatedFiltersPanelProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: any;
  handleFilterChange: (key: string, value: any) => void;
  categories: any[];
}

const AnimatedFiltersPanel: React.FC<AnimatedFiltersPanelProps> = ({ showFilters, setShowFilters, filters, handleFilterChange, categories }) => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      {showFilters && (
        <div
          style={{
            position: isSmallScreen ? 'absolute' : 'sticky',
            top: '0',
            bottom: '0',
            left: '0',
            width: '380px',
            backgroundColor: '#141414',
            boxShadow: 'lg',
            zIndex: 20,
            padding: '20px'
          }}
        >
          {/* <FiltersPanel filters={filters} handleFilterChange={handleFilterChange} categories={categories} /> */}

        </div>
      )}

      {showFilters && isSmallScreen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10
          }}
          onClick={() => setShowFilters(false)}
        />
      )}
    </>
  );
};

export default AnimatedFiltersPanel;