import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { SUSTAINSUTRA_THEME } from '../../utils/brsr/themeConfig';

const TabNavigation = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  orientation = 'horizontal',
  variant = 'default',
  className = ''
}) => {
  const tabColors = {
    overview: 'text-gold',
    environmental: 'text-blue-400',
    social: 'text-pink-400',
    governance: 'text-purple-400',
    concerns: 'text-orange-400',
    decarbonization: 'text-cyan-400',
    analytics: 'text-emerald-400',
  };

  const variantStyles = {
    default: {
      container: 'bg-navy-light/20 border border-white/10 rounded-2xl p-2',
      tab: 'px-6 py-3 rounded-xl text-sm font-medium transition-all',
      active: 'bg-gradient-to-r from-gold/20 to-amber-500/20 border border-gold/30 text-gold',
      inactive: 'text-dimmed hover:text-white hover:bg-white/5',
    },
    minimal: {
      container: 'border-b border-white/10',
      tab: 'px-4 py-3 text-sm font-medium transition-all border-b-2 border-transparent',
      active: 'text-gold border-gold',
      inactive: 'text-dimmed hover:text-white',
    },
    pills: {
      container: 'flex gap-2',
      tab: 'px-4 py-2 rounded-full text-sm font-medium transition-all',
      active: 'bg-gold text-navy',
      inactive: 'bg-navy-light/30 text-dimmed hover:text-white',
    },
  };

  const styles = variantStyles[variant];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} orientation={orientation}>
      <TabsList className={`
        ${styles.container}
        ${orientation === 'vertical' ? 'flex-col' : 'flex'}
        ${className}
      `}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={`
              ${styles.tab}
              ${activeTab === tab.id ? styles.active : styles.inactive}
              flex items-center gap-2
            `}
          >
            {tab.icon && (
              <span className={activeTab === tab.id ? 'text-gold' : 'text-dimmed'}>
                {React.createElement(tab.icon, { size: 18 })}
              </span>
            )}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${tab.badge > 0 ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-dimmed'}
              `}>
                {tab.badge}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

const TabPanel = ({ children, activeTab, tabId, className = '' }) => {
  return (
    <AnimatePresence mode="wait">
      {activeTab === tabId && (
        <motion.div
          key={tabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TabContent = ({ children, activeTab }) => {
  return (
    <div className="mt-6">
      {children}
    </div>
  );
};

export { TabNavigation, TabPanel, TabContent };
